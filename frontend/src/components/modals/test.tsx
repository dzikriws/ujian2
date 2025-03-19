import React, { useState, useEffect } from "react";
import InputField from "../commons/InputField";
import { getDoctors } from "../../services/doctorService";
import { getServices } from "../../services/serviceService";
import { useSnackbar } from "notistack";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: any) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [doctors, setDoctors] = useState<
    { doctor_name: string; doctor_id: number }[]
  >([]);
  const [services, setServices] = useState<
    {
      service_id: number;
      service_name: string;
      service_group: string;
      categories: {
        category_id: number;
        category_name: string;
        price: number;
      }[];
    }[]
  >([]);
  const [doctorId, setDoctorId] = useState<number>(0);
  const [patientName, setPatientName] = useState("");
  const [serviceGroup, setServiceGroup] = useState("");
  const [serviceId, setServiceId] = useState<number>(0);
  const [date, setDate] = useState("");
  const [taxRate, setTaxRate] = useState(0.15);
  const [username, setUsername] = useState("");
  const [details, setDetails] = useState<
    { category_id: number; qty: number }[]
  >([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setDoctors(await getDoctors());
      setServices(await getServices());
    };
    fetchData();
  }, []);

  const filteredServices = serviceGroup
    ? services.filter((s) => s.service_group === serviceGroup)
    : [];

  const selectedService = services.find((s) => s.service_id === serviceId);

  const handleAddDetail = () =>
    setDetails([...details, { category_id: 0, qty: 1 }]);

  
  const handleRemoveDetail = (index: number) =>
    setDetails(details.filter((_, i) => i !== index));
  const handleDetailChange = (index: number, field: string, value: any) => {
    setDetails((prevDetails) =>
      prevDetails.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId || !patientName || !date || !details.length) {
      enqueueSnackbar("Please fill all fields.", { variant: "error" });
      return;
    }

    const formattedTransaction = {
      doctor_id: doctorId,
      patient_name: patientName,
      date: new Date(date),
      tax_rate: taxRate,
      username,
      details: details.map((detail) => ({
        service_id: serviceId,
        category_id: detail.category_id,
        qty: detail.qty,
      })),
    };

    onSubmit(formattedTransaction);

    setDoctorId(0);
    setPatientName("");
    setServiceGroup("");
    setServiceId(0);
    setDate("");
    setTaxRate(0);
    setDetails([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-base-200 p-6 rounded shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4 text-white">Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          {/* Doctor Name */}
          <select
            className="select select-bordered w-full mb-2"
            value={doctorId}
            onChange={(e) => setDoctorId(Number(e.target.value))}
          >
            <option value={0} disabled>
              Select Doctor
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.doctor_name}
              </option>
            ))}
          </select>

          {/* Patient */}
          <InputField
            label="Patient Name"
            name="patient_name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />

          {/* Service Group */}
          <select
            className="select select-bordered w-full mb-2"
            value={serviceGroup}
            onChange={(e) => setServiceGroup(e.target.value)}
            disabled={!doctors.length}
          >
            <option value="" disabled>
              Select Service Group
            </option>
            {[...new Set(services.map((s) => s.service_group))].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          {/* Date */}

          <InputField
            label="Transaction Date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Details Transactions */}

          {selectedService && (
            <div>
              <h3 className="text-white mt-4 mb-2">Categories</h3>
              {details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  {/* Service Name */}

                  <select
                    className="select select-bordered w-full mb-2"
                    value={serviceId}
                    onChange={(e) => setServiceId(Number(e.target.value))}
                  >
                    <option value={0} disabled>
                      Select Service
                    </option>
                    {filteredServices.map((service) => (
                      <option
                        key={service.service_id}
                        value={service.service_id}
                      >
                        {service.service_name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="select select-bordered flex-1"
                    value={detail.category_id}
                    onChange={(e) =>
                      handleDetailChange(
                        index,
                        "category_id",
                        Number(e.target.value)
                      )
                    }
                  >
                    <option value={0} disabled>
                      Select Category
                    </option>
                    {selectedService.categories.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    className="input input-bordered w-20"
                    value={detail.qty}
                    onChange={(e) =>
                      handleDetailChange(index, "qty", Number(e.target.value))
                    }
                  />
                  <span className="text-white">
                    Rp{" "}
                    {(selectedService.categories.find(
                      (c: { category_id: number; price: number }) =>
                        c.category_id === detail.category_id
                    )?.price || 0) * detail.qty}
                  </span>
                  <button
                    type="button"
                    className="btn btn-error"
                    onClick={() => handleRemoveDetail(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-success w-full"
                onClick={handleAddDetail}
              >
                + Add Category
              </button>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
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

export default AddTransactionModal;
