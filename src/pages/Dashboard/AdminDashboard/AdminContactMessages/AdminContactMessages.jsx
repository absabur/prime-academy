import api from '@/api/axios';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import ReactMarkdown from 'react-markdown';

import { dateConvertionHomePageBlogCard } from '@/utils/timeFormat';
import { useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const AdminContactMessages = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [messages, setMessages] = useState({});
  const [pagination, setPagination] = useState({});
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const page_size = 10;

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'sl',
      label: 'SL',
      render: (_, __, index) => (currentPage - 1) * page_size + (index + 1), // index+1 দেখাবে
    },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    {
      key: 'message',
      label: 'Message',
      render: (r, c, i) => (
        <p className="line-clamp-3 max-w-[350px] whitespace-pre-line break-words text-heading text-base leading-lg">
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
          <MdVerified className="text-xl text-green-700" />
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
    const fetchMessages = async () => {
      try {
        const searchParams = search ? `&search=${search}` : '';
        const response = await api.get(
          `${import.meta.env.VITE_API_URL}/api/contact/?page=${currentPage}&page_size=${page_size}${searchParams}`
        );
        setMessages(response.data.results);
        setPagination({
          count: response?.data?.count,
          next: response?.data?.next,
          previous: response?.data?.previous,
        });
      } catch (error) {
        console.log(error);
      }
    };
    const handler = setTimeout(() => {
      fetchMessages();
    }, 600); // debounce delay 600ms

    return () => {
      clearTimeout(handler); // cleanup old timer before new one
    };
  }, [currentPage, page_size, search]);

  return (
    <div>
      <DashBoardHeader title={'Messages'} />
      <DataTables
        data={messages}
        columns={columns}
        currentPage={currentPage}
        paginationType={pagination}
        pageSize={page_size}
        error={null}
        paginationShow={true}
        deleteButton={false}
        statusShow={false}
      />
    </div>
  );
};

export default AdminContactMessages;
