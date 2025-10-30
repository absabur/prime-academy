import api from '@/api/axios';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import ReactMarkdown from 'react-markdown';

import { dateConvertionHomePageBlogCard } from '@/utils/timeFormat';
import { useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useSearchParams } from 'react-router-dom';
import Modal from '@/components/common/Modal';
import MessageDetails from '../../../../components/Dashboard/AdminDashboard/AdminContactMessages/MessageDetails';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../../../redux/messages/messagesAction';

const AdminContactMessages = () => {
  const { messages, messagePagination, pageSize, loadingMessages } = useSelector(
    (state) => state.message
  );
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState({});
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const dispatch = useDispatch();

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'sl',
      label: 'SL',
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1), // index+1 দেখাবে
    },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    {
      key: 'message',
      label: 'Message',
      render: (r, c, i) => (
        <p className="line-clamp-2 max-w-[300px] whitespace-pre-line break-words text-heading text-base leading-lg">
          {r[c.key]}
        </p>
      ),
    },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'agree_to_policy',
      label: 'Policy',
      render: (r, c, i) =>
        r[c.key] ? (
          <MdVerified className="text-xl text-primary-light" />
        ) : (
          <RxCross2 className="text-xl text-red-700" />
        ),
    },
    {
      key: 'created_at',
      label: 'Message Date',
      render: (r, c, i) => dateConvertionHomePageBlogCard(r[c.key]),
    },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(fetchMessages({ search, currentPage, pageSize }));
    }, 600); // debounce delay 600ms

    return () => {
      clearTimeout(handler); // cleanup old timer before new one
    };
  }, [currentPage, pageSize, search]);

  const handleView = (id) => {
    setModal(true);
    setMessage(messages.find((m) => m.id == id));
  };

  return (
    <div>
      <LoadingDashboard loading={loadingMessages} />
      <DashBoardHeader title={'Messages'} />
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <MessageDetails data={message} />
          </div>
        </Modal>
      )}
      <DataTables
        data={messages}
        columns={columns}
        currentPage={currentPage}
        paginationType={messagePagination}
        pageSize={pageSize}
        error={null}
        paginationShow={true}
        deleteButton={false}
        statusShow={false}
        handleView={handleView}
      />
    </div>
  );
};

export default AdminContactMessages;
