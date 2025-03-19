import React, { useState, useEffect } from "react";
import InputField from "../commons/InputField";
import { getDoctors } from "../../services/doctorService";
import { getServices } from "../../services/serviceService";
import { useSnackbar } from "notistack";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: {
    doctor_id: number;
    patient_name: string;
    service_id: number;
    date: string;
    tax_rate: number;
    username: string;
  }) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [doctors, setDoctors] = useState<{ doctor_id: number; name: string }[]>(
    []
  );
  const [services, setServices] = useState<
    { service_id: number; service_name: string }[]
  >([]);
  const [doctorId, setDoctorId] = useState<number>(0);
  const [patientName, setPatientName] = useState("");
  const [serviceId, setServiceId] = useState<number>(0);
  const [date, setDate] = useState("");
  const [taxRate, setTaxRate] = useState(0.15);
  const [username, setUsername] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const doctorData = await getDoctors();
      setDoctors(doctorData);
      const serviceData = await getServices();
      setServices(serviceData);
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId || !serviceId || !patientName || !date || !username) {
      enqueueSnackbar("Please fill all fields.", { variant: "error" });
      return;
    }

    onSubmit({
      doctor_id: doctorId,
      patient_name: patientName,
      service_id: serviceId,
      date,
      tax_rate: taxRate,
      username,
    });

    setDoctorId(0);
    setPatientName("");
    setServiceId(0);
    setDate("");
    setUsername("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-6 rounded shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4 text-white">Add Transaction</h2>
        <form onSubmit={handleSubmit}>
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
                {doctor.name}
              </option>
            ))}
          </select>
          <InputField
            label="Patient Name"
            name="patient_name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
          <select
            className="select select-bordered w-full mb-2"
            value={serviceId}
            onChange={(e) => setServiceId(Number(e.target.value))}
          >
            <option value={0} disabled>
              Select Service
            </option>
            {services.map((service) => (
              <option key={service.service_id} value={service.service_id}>
                {service.service_name}
              </option>
            ))}
          </select>
          <InputField
            label="Transaction Date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <InputField
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
