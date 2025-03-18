import React, { useState, useEffect } from "react";

interface UpdatePriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    id: number,
    updatedPriceList: { product_id: number; uom_id: number; price: string }
  ) => void;
  priceList?: {
    price_list_id: number;
    product_id: number;
    uom_id: number;
    price: string;
    product: { id: number; product_name: string };
    uom: { id: number; name: string };
  };
}

const UpdatePriceListModal: React.FC<UpdatePriceListModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  priceList,
}) => {
  const [productId, setProductId] = useState<number | "">("");
  const [uomId, setUomId] = useState<number | "">("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    if (priceList) {
      setProductId(priceList.product.id);
      setUomId(priceList.uom.id);
      setPrice(priceList.price);
    }
  }, [priceList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (priceList) {
      onSubmit(priceList.price_list_id, {
        product_id: Number(productId),
        uom_id: Number(uomId),
        price,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Update Price List</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block font-semibold text-white">Product</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={priceList?.product.product_name || ""}
              disabled
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold text-white">UOM</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={priceList?.uom.name || ""}
              disabled
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold text-white">Price</label>
            <input
              type="number"
              step="0.01"
              className="input input-bordered w-full"
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePriceListModal;
