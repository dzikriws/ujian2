import React, { useState } from "react";
import InputField from "./InputField";

interface AddUomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (uom: { name: string; rate_conversion: number }) => void;
}

const AddUomModal: React.FC<AddUomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [rateConversion, setRateConversion] = useState("");
  const [error, setError] = useState("");

  const isValidRate = (value: string) => {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && num <= 1;
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRateConversion(value);

    if (!isValidRate(value)) {
      setError("Rate Conversion must be a number between 0 and 1.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidRate(rateConversion)) return;

    onSubmit({ name, rate_conversion: Number(rateConversion) });
    setName("");
    setRateConversion("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Add UOM</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <InputField
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <InputField
              label="Rate Conversion"
              name="rate_conversion"
              value={rateConversion}
              onChange={handleRateChange}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!!error}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUomModal;
