import React, { useState, useEffect } from "react";
import InputField from "./InputField";

interface UpdateUomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    id: number,
    uom: { name: string; rate_conversion: number }
  ) => void;
  uom?: { id: number; name: string; rate_conversion: number };
}

const UpdateUomModal: React.FC<UpdateUomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  uom,
}) => {
  const [name, setName] = useState("");
  const [rateConversion, setRateConversion] = useState("");

  useEffect(() => {
    if (uom) {
      setName(uom.name);
      setRateConversion(uom.rate_conversion.toString());
    }
  }, [uom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uom) {
      onSubmit(uom.id, { name, rate_conversion: Number(rateConversion) });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Update UOM</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Rate Conversion"
            name="rate_conversion"
            type="number"
            value={rateConversion}
            onChange={(e) => setRateConversion(e.target.value)}
          />
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

export default UpdateUomModal;
