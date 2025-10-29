import SwalUtils from '@/utils/sweetAlert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTables from '../../common/DataTables';
import { fetchHeros, updateHero } from '@/redux/hero/heroAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import Modal from '@/components/common/Modal';
import EditHeroForm from './EditHeroForm';
import { clearError, clearMessage } from '@/redux/hero/heroSlice';
import BannerDetails from './BannerDetails';

export default function AllHeros() {
  const { message, error, heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [hero, setHero] = useState({});

  // handle edit modal
  const handleEditModal = async (id) => {
    setHero(heros.find((item) => item.id == id));
    setModal(true);
    setModalType('edit');
  };

  // handle edit
  const handleEdit = async (value, id) => {
    dispatch(updateHero({ id, value }));
  };
  // handle edit
  const handleView = async (id) => {
    setHero(heros.find((item) => item.id == id));
    setModal(true);
    setModalType('view');
  };

  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearMessage());
      setModal(false);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);

  const columns = [
    { key: 'sl', label: 'SL' },
    { key: 'page_name', label: 'Page' },
    { key: 'title', label: 'Title' },
    // { key: 'description', label: 'Description' },
    { key: 'banner_image', label: 'Banner' },
    { key: 'button1_text', label: 'Button 1' },
    { key: 'button2_text', label: 'Button 2' },
  ];

  if (!heros?.length) return null;

  const handleStatusChange = (id, key, value) => {
    dispatch(updateHero({ id, value: { [key]: value } }));
  };

  return (
    <>
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType == 'edit' && (
              <EditHeroForm
                onSubmit={handleEdit}
                onCancel={() => setModal(false)}
                defaultValues={hero}
              />
            )}
            {modalType == 'view' && <BannerDetails data={hero} />}
          </div>
        </Modal>
      )}
      <DataTables
        paginationShow={false}
        data={enhancedHeros(heros)}
        columns={columns}
        error={error || null}
        deleteButton={false}
        statusChange={handleStatusChange}
        handelEdit={handleEditModal}
        handleView={handleView}
      />
    </>
  );
}

const enhancedHeros = (heros) => {
  return heros.map((hero, index) => ({
    ...hero,
    sl: index + 1,
    description: (
      <p className="max-w-[400px] whitespace-normal break-words">
        {hero?.description.slice(0, 30)}
        {hero?.description.slice(31) && '...'}
      </p>
    ),
    banner_image: (
      <img
        src={hero.banner_image}
        alt="Banner"
        className="h-12 w-20 rounded-md object-cover shadow"
      />
    ),
    button1_text: hero.button1_text && (
      <PrimaryButton
        target="_blank"
        href={hero.button1_url}
        text={hero.button1_text}
      ></PrimaryButton>
    ),
    button1_url: hero.button1_url && (
      <a
        href={hero.button1_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-light underline"
      >
        {hero.button1_url}
      </a>
    ),
    button2_text: hero.button2_text && (
      <SecondaryButton
        target="_blank"
        href={hero.button2_url}
        className="border-primary text-primary hover:text-white"
        text={hero.button2_text}
      ></SecondaryButton>
    ),
    button2_url: hero.button2_url && (
      <a
        href={hero.button2_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-light underline"
      >
        {hero.button2_url}
      </a>
    ),
  }));
};
