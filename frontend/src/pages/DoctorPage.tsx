import React, { useEffect, useState } from "react";
import {
  getDoctors,
  addDoctor,
  deleteDoctor,
  updateDoctor,
} from "../services/doctorService";
import DoctorTable from "../components/tables/DoctorTable";
import AddDoctorModal from "../components/modals/AddDoctorModal";
import UpdateDoctorModal from "../components/modals/UpdateDoctorModal";
import SearchBar from "../components/commons/SearchBar";
import { useSnackbar } from "notistack";
import { categoryOptions, countryOptions } from "../option/doctor";
import FilterDropdown from "../components/commons/FilterDropdown";

interface Doctor {
  doctor_id: number;
  doctor_name: string;
  address: string;
  city: string;
  country: string;
  kategori: string;
  contact_phone: string;
}

const DoctorPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchDoctors();
  }, []);

  console.log(doctors);

  useEffect(() => {
    handleFilterChange();
  }, [doctors, selectedCategory, selectedCountry]);

  const fetchDoctors = async () => {
    setLoading(true);
    const data = await getDoctors();
    setDoctors(data);
    setLoading(false);
  };

  const handleFilterChange = () => {
    let filtered = doctors;

    if (selectedCategory) {
      filtered = filtered.filter(
        (doctor) => doctor.kategori === selectedCategory
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter(
        (doctor) => doctor.country === selectedCountry
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleAddDoctor = async (newDoctor: Omit<Doctor, "doctor_id">) => {
    try {
      const response = await addDoctor(newDoctor);
      fetchDoctors();
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add doctor";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setUpdateModalOpen(true);
  };

  const handleUpdateDoctor = async (
    id: number,
    updatedDoctor: Omit<Doctor, "doctor_id">
  ) => {
    try {
      const response = await updateDoctor(id, updatedDoctor);
      fetchDoctors();
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update doctor";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoctor(id);
        fetchDoctors();
        enqueueSnackbar("Doctor deleted successfully!", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Failed to delete doctor", { variant: "error" });
      }
    }
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = doctors.filter((doctor) =>
      doctor.doctor_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <button
          className="btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          + Add Doctor
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <FilterDropdown
          label="Categories"
          value={selectedCategory}
          options={categoryOptions.map((category) => ({
            label: category,
            value: category,
          }))}
          onChange={setSelectedCategory}
        />

        <FilterDropdown
          label="Countries"
          value={selectedCountry}
          options={countryOptions.map((country) => ({
            label: country.label,
            value: country.label,
          }))}
          onChange={setSelectedCountry}
        />
      </div>
      <SearchBar onSearch={handleSearch} placeholder="Search Doctors..." />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DoctorTable
          doctors={filteredDoctors}
          onEdit={handleEditDoctor}
          onDelete={handleDeleteDoctor}
        />
      )}

      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddDoctor}
      />

      <UpdateDoctorModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateDoctor}
        doctor={selectedDoctor || undefined}
      />
    </div>
  );
};

export default DoctorPage;
