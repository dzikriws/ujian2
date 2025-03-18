import React, { useState, useEffect } from "react";
import InputField from "../commons/InputField";

interface Category {
  category_id: number;
  category_name: string;
  price: number;
}

interface UpdateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    service_id: number,
    service: {
      service_name: string;
      service_group: string;
      categories: Category[];
    }
  ) => void;
  service?: {
    service_id: number;
    service_name: string;
    service_group: string;
    categories: Category[];
  };
}

const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  service,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceGroup, setServiceGroup] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (service) {
      setServiceName(service.service_name);
      setServiceGroup(service.service_group);
      setCategories(service.categories);
    }
  }, [service]);

  const handleCategoryChange = (id: number, price: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.category_id === id ? { ...cat, price } : cat
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    onSubmit(service.service_id, {
      service_name: serviceName,
      service_group: serviceGroup,
      categories,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Update Service</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Service Name"
            name="service_name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
          <InputField
            label="Service Group"
            name="service_group"
            value={serviceGroup}
            onChange={(e) => setServiceGroup(e.target.value)}
            required
          />

          <div className="mb-2">
            <h3 className="text-white mb-2">Categories</h3>
            {categories.map((category) => (
              <div key={category.category_id} className="mb-2">
                <label className="text-white">{category.category_name}</label>
                <input
                  type="number"
                  value={category.price}
                  onChange={(e) =>
                    handleCategoryChange(
                      category.category_id,
                      Number(e.target.value)
                    )
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
