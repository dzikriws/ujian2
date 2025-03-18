import React, { useState, useEffect } from "react";

interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    id: number,
    product: { product_name: string; description: string }
  ) => void;
  product?: any;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
}) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (product) {
      setProductName(product.product_name);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSubmit(product.id, {
        product_name: productName,
        description,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="floating-label">
              <span>Product Name</span>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="floating-label">
              <span>Description</span>
              <input
                className="input input-bordered w-full"
                placeholder=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
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

export default UpdateProductModal;
