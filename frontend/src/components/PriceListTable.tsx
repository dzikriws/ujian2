import React, { useState } from "react";
import Pagination from "./Pagination";
import ItemsPerPageSelector from "./ItemsPerPageSelector";

interface PriceList {
  price_list_id: number;
  product_id: number;
  uom_id: number;
  price: string;
  product: {
    id: number;
    product_name: string;
    description: string;
  };
  uom: {
    id: number;
    name: string;
    rate_conversion: string;
  };
}

interface PriceListTableProps {
  priceLists: PriceList[];
  onEdit: (priceList: PriceList) => void;
  onDelete: (id: number) => void;
}

const PriceListTable: React.FC<PriceListTableProps> = ({
  priceLists,
  onEdit,
  onDelete,
}) => {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(price));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedPriceLists = priceLists.slice(startIndex, endIndex);

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
            <th>#</th>
            <th>Product</th>
            <th>UOM</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedPriceLists.length > 0 ? (
            displayedPriceLists.map((pl, index) => (
              <tr key={pl.price_list_id}>
                <td>{startIndex + index + 1}</td>
                <td>{pl.product.product_name}</td>
                <td>{pl.uom.name}</td>
                <td>{formatPrice(pl.price)}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => onEdit(pl)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(pl.price_list_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No price lists available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        totalItems={priceLists.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PriceListTable;
