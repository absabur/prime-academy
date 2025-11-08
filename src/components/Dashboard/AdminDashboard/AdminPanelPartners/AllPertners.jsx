import { deleteBrand, fetchBrandsAdmin, updateBrand } from '@/redux/brands/brandsAction';
import SwalUtils from '@/utils/sweetAlert';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BrandCard from './BrandCard';

export default function AllBrands({ setModal, setModalType, setSinglePartner }) {
  const { adminPanelBrands } = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  const onEdit = (brand) => {
    setModal(true);
    setModalType('edit');
    setSinglePartner(brand);
  };

  const onDelete = (id) => {
    SwalUtils.confirm(() => dispatch(deleteBrand({ id })), 'Delete Brand');
  };

  useEffect(() => {
    dispatch(fetchBrandsAdmin());
  }, []);

  const statusChange = (id, skey, value) => {
    SwalUtils.confirm(() => dispatch(updateBrand({ id, data: { [skey]: value } })), 'Update');
  };

  if (!adminPanelBrands || adminPanelBrands.length === 0) {
    return (
      <div className="flex items-center justify-center py-xl bg-white rounded-lg shadow-sm border border-black/50">
        <p className="text-gray-500">No brands found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-lg">
      {[...adminPanelBrands]
        .sort((a, b) => b.is_active - a.is_active)
        .map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            onStatusChange={statusChange}
            onEdit={() => onEdit(brand)}
            onDelete={() => onDelete(brand.id)}
          />
        ))}
    </div>
  );
}
