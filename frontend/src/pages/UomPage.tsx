import React, { useEffect, useState } from "react";
import { getUoms, addUom, updateUom, deleteUom } from "../services/uomServices";
import AddUomModal from "../components/AddUomModal";
import UpdateUomModal from "../components/UpdateUomModal";
import UomTable from "../components/UomTable";

const UomPage: React.FC = () => {
  const [uoms, setUoms] = useState<
    { id: number; name: string; rate_conversion: number; created_at: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUom, setSelectedUom] = useState<{
    id: number;
    name: string;
    rate_conversion: number;
  } | null>(null);

  useEffect(() => {
    fetchUoms();
  }, []);

  const fetchUoms = async () => {
    setLoading(true);
    const data = await getUoms();
    setUoms(data);
    setLoading(false);
  };

  const handleAddUom = async (newUom: {
    name: string;
    rate_conversion: number;
  }) => {
    await addUom(newUom);
    fetchUoms();
  };

  const handleEditUom = (uom: {
    id: number;
    name: string;
    rate_conversion: number;
  }) => {
    setSelectedUom(uom);
    setUpdateModalOpen(true);
  };

  const handleUpdateUom = async (
    id: number,
    updatedUom: { name: string; rate_conversion: number }
  ) => {
    await updateUom(id, updatedUom);
    fetchUoms();
  };

  const handleDeleteUom = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this UOM?")) {
      await deleteUom(id);
      fetchUoms();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">UOM List</h1>
        <button
          className="btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          + Add UOM
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <UomTable
          uoms={uoms}
          onEdit={handleEditUom}
          onDelete={handleDeleteUom}
        />
      )}

      <AddUomModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddUom}
      />

      <UpdateUomModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateUom}
        uom={selectedUom || undefined}
      />
    </div>
  );
};

export default UomPage;
