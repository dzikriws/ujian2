import React, { useState } from "react";
import Pagination from "./Pagination";
import ItemsPerPageSelector from "./ItemsPerPageSelector";
import he from "he";

interface Category {
  category_id: number;
  category_name: string;
  price: number;
}

interface Service {
  service_id: number;
  service_name: string;
  service_group: string;
  categories: Category[];
}

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = services.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Service Group</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedServices.map((service, index) => (
            <tr key={service.service_id}>
              <td>{service.service_id}</td>
              <td>{he.decode(service.service_name)}</td>
              <td>{he.decode(service.service_group)}</td>
              <td>
                <ul key={index}>
                  {service.categories.map((category) => (
                    <li key={category.category_id}>
                      {he.decode(category.category_name)}: Rp.{" "}
                      {category.price.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(service)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(service.service_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={services.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ServiceTable;
