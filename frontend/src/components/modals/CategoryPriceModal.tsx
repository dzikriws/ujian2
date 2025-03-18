import React from "react";
import he from "he";

interface Category {
  category_id: number;
  category_name: string;
  price: number;
}

interface CategoryPriceModalProps {
  categories: Category[];
  onClose: () => void;
  serviceName: string;
}

const CategoryPriceModal: React.FC<CategoryPriceModalProps> = ({
  categories,
  onClose,
  serviceName
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-100 p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-3">Category Prices</h2>
        <h3 className="text-lg font-semibold mb-2">{serviceName}</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.category_id} className="flex justify-between border-b pb-1">
              <span>{he.decode(category.category_name)}</span>
              <span className="font-bold">Rp. {category.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 btn btn-sm btn-secondary w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CategoryPriceModal;
