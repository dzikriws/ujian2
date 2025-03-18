import React, { useState, useEffect } from "react";
import InputField from "./InputField";

interface UpdateSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, supplier: any) => void;
  supplier?: any;
}

const UpdateSupplierModal: React.FC<UpdateSupplierModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  supplier,
}) => {
  const [formData, setFormData] = useState({
    suplier_name: "",
    address: "",
    city: "",
    country: "",
    payment_terms: "",
    bank_name: "",
    bank_account: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData(supplier);
    }
  }, [supplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supplier) {
      onSubmit(supplier.id, formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4 text-white">Update Supplier</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Supplier Name"
            name="suplier_name"
            value={formData.suplier_name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2">
            <div className="w-1/2">
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <InputField
            label="Payment Terms"
            name="payment_terms"
            value={formData.payment_terms}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2">
            <div className="w-1/2">
              <InputField
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <InputField
                label="Bank Account"
                name="bank_account"
                value={formData.bank_account}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <InputField
            label="Contact Name"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2">
            <div className="w-1/2">
              <InputField
                label="Contact Phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <InputField
                label="Contact Email"
                name="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
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

export default UpdateSupplierModal;
