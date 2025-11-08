import SwalUtils from '@/utils/sweetAlert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTables from '../../common/DataTables';
import { updateHero } from '@/redux/hero/heroAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import Modal from '@/components/common/Modal';
import EditHeroForm from './EditHeroForm';
import { clearError, clearMessage } from '@/redux/hero/heroSlice';
import HeroDetailsView from './HeroDetailsView';
import { Link } from 'react-router-dom';
import { fetchHerosAdmin } from '../../../../redux/hero/heroAction';

export default function AllHeros() {
  const { message, error, adminPanelHeros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [hero, setHero] = useState({});

  // handle edit modal
  const handleEditModal = async (id) => {
    setHero(adminPanelHeros.find((item) => item.id == id));
    setModal(true);
    setModalType('edit');
  };

  // handle edit
  const handleEdit = async (value, id) => {
    dispatch(updateHero({ id, value }));
  };
  // handle edit
  const handleView = async (id) => {
    setHero(adminPanelHeros.find((item) => item.id == id));
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
    dispatch(fetchHerosAdmin());
  }, []);

  const columns = [
    { key: 'sl', label: 'SL' },
    { key: 'page_name', label: 'Page' },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'banner_image', label: 'Banner' },
    { key: 'button1_text', label: 'Button 1' },
    { key: 'button2_text', label: 'Button 2' },
  ];

  if (!adminPanelHeros?.length) return null;

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
            {modalType == 'view' && <HeroDetailsView data={hero} />}
          </div>
        </Modal>
      )}
      <DataTables
        paginationShow={false}
        data={enhancedHeros(adminPanelHeros)}
        columns={columns}
        error={error || null}
        deleteButton={false}
        handelEdit={handleEditModal}
        handleView={handleView}
        statusShow={false}
      />
    </>
  );
}

const enhancedHeros = (heros) => {
  return heros.map((hero, index) => ({
    ...hero,
    sl: index + 1,
    description: (
      <p className="max-w-[300px] whitespace-normal break-words line-clamp-2">
        {hero?.description}
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
      <Link
        to={hero.button1_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-light underline"
      >
        {hero.button1_url}
      </Link>
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
      <Link
        to={hero.button2_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-light underline"
      >
        {hero.button2_url}
      </Link>
    ),
  }));
};
