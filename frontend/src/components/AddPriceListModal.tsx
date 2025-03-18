import React, { useState } from "react";
import InputField from "./InputField";

interface AddPriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPriceList: {
    product_id: number;
    uom_id: number;
    price: string;
  }) => void;
  products: { id: number; product_name: string }[];
  uoms: { id: number; name: string }[];
}

const AddPriceListModal: React.FC<AddPriceListModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  products,
  uoms,
}) => {
  const [productId, setProductId] = useState<number | "">("");
  const [uomId, setUomId] = useState<number | "">("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Product ID:", productId);
    console.log("UOM ID:", uomId);
    console.log("Price:", price);
    if (productId === "" || uomId === "") {
      alert("Please select a product and UOM.");
      return;
    }
    onSubmit({
      product_id: Number(productId),
      uom_id: Number(uomId),
      price,
    });
    setProductId("");
    setUomId("");
    setPrice("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Add Price List</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block font-semibold text-white">Product</label>
            <select
              className="select select-bordered w-full"
              value={productId}
              onChange={(e) => setProductId(Number(e.target.value))}
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block font-semibold text-white">UOM</label>
            <select
              className="select select-bordered w-full"
              value={uomId}
              onChange={(e) => setUomId(Number(e.target.value))}
              required
            >
              <option value="">Select UOM</option>
              {uoms.map((uom) => (
                <option key={uom.id} value={uom.id}>
                  {uom.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <InputField
              label="Price"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPriceListModal;
