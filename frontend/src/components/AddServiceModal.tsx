import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import { getServiceCategories } from "../services/categoryService";
import he from "he";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: {
    service_name: string;
    service_group: string;
    categories: { category_id: number; price: number }[];
  }) => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceGroup, setServiceGroup] = useState("");
  const [categories, setCategories] = useState<
    { category_id: number; category_name: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { category_id: number; price: number }[]
  >([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getServiceCategories();
      setCategories(data);

          // setLoading(true);
          // const data = await getServiceCategories();
          // setCategories(data);
      console.log("Categories:", categories);
    };
    fetchCategories();
    console.log("Categories after fetch:", categories);

  }, []);

  const handleCategoryChange = (categoryId: number, price: number) => {
    setSelectedCategories((prev) => {
      const existingIndex = prev.findIndex((c) => c.category_id === categoryId);
      if (existingIndex !== -1) {
        prev[existingIndex].price = price;
        return [...prev];
      }
      return [...prev, { category_id: categoryId, price }];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setError("At least one category must have a price.");
      return;
    }

    console.log("Selected Categories:", selectedCategories);
    console.log("Service Name:", serviceName);
    console.log("Service Group:", serviceGroup);
    setError("");
    onSubmit({
      service_name: serviceName,
      service_group: serviceGroup,
      categories: selectedCategories,
    });
    setServiceName("");
    setServiceGroup("");
    setSelectedCategories([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Add Service</h2>
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
          <div className="mt-4">
            <label className="block text-white mb-2">Categories & Prices</label>
            {categories.map((category) => (
              <div
                key={category.category_id}
                className="flex justify-between items-center mb-2"
              >
                <span className="text-white">{he.decode(category.category_name)}</span>
                <input
                  type="number"
                  className="input input-bordered w-24"
                  placeholder="Price"
                  min="0"
                  onChange={(e) =>
                    handleCategoryChange(
                      category.category_id,
                      Number(e.target.value)
                    )
                  }
                />
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={selectedCategories.length === 0}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
