import React, { useEffect, useState } from "react";
import {
  getPriceLists,
  addPriceList,
  updatePriceList,
  deletePriceList,
} from "../services/priceListService";
import { getProducts } from "../services/productService";
import { getUoms } from "../services/uomServices";
import PriceListTable from "../components/PriceListTable";
import AddPriceListModal from "../components/AddPriceListModal";
import UpdatePriceListModal from "../components/UpdatePriceListModal";
import SearchBar from "../components/SearchBar";

interface PriceList {
  price_list_id: number;
  product_id: number;
  uom_id: number;
  price: string;
  product: {
    id: number;
    product_name: string;
    description: string;
  };
  uom: {
    id: number;
    name: string;
    rate_conversion: string;
  };
}

const PriceListPage: React.FC = () => {
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);
  const [filteredPriceLists, setFilteredPriceLists] = useState<PriceList[]>([]);
  const [products, setProducts] = useState<
    { id: number; product_name: string }[]
  >([]);
  const [uoms, setUoms] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedPriceList, setSelectedPriceList] = useState<PriceList | null>(
    null
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPriceLists(priceLists);
  }, [priceLists]);

  const fetchData = async () => {
    setLoading(true);
    const [priceListData, productData, uomData] = await Promise.all([
      getPriceLists(),
      getProducts(),
      getUoms(),
    ]);
    setPriceLists(priceListData);
    setProducts(productData);
    setUoms(uomData);
    setLoading(false);
  };

  const handleAddPriceList = async (newPriceList: {
    product_id: number;
    uom_id: number;
    price: string;
  }) => {
    await addPriceList(newPriceList);
    fetchData();
  };

  const handleEditPriceList = (priceList: PriceList) => {
    setSelectedPriceList(priceList);
    setUpdateModalOpen(true);
  };

  const handleUpdatePriceList = async (
    id: number,
    updatedPriceList: { product_id: number; uom_id: number; price: string }
  ) => {
    await updatePriceList(id, updatedPriceList);
    fetchData();
  };

  const handleDeletePriceList = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this price list?")) {
      await deletePriceList(id);
      fetchData();
    }
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = priceLists.filter(
      (pl) =>
        pl.product.product_name.toLowerCase().includes(lowerCaseQuery) ||
        pl.uom.name.toLowerCase().includes(lowerCaseQuery) ||
        pl.price.includes(lowerCaseQuery)
    );
    setFilteredPriceLists(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Price List</h1>
        <button
          className="btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          + Add Price
        </button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Price List..." />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <PriceListTable
          priceLists={filteredPriceLists}
          onEdit={handleEditPriceList}
          onDelete={handleDeletePriceList}
        />
      )}

      <AddPriceListModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddPriceList}
        products={products}
        uoms={uoms}
      />

      <UpdatePriceListModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdatePriceList}
        priceList={selectedPriceList || undefined}
      />
    </div>
  );
};

export default PriceListPage;
