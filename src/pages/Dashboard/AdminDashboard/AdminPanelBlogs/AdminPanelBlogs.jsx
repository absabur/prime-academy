import Modal from '@/components/common/Modal';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import { fetchBlogCategories } from '@/redux/blogs/blogAction';
import { clearError, clearMessage } from '@/redux/blogs/blogSlice';
import SwalUtils from '@/utils/sweetAlert';
import { dateConvertionBlogsPageBlogCard } from '@/utils/timeFormat';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';
import BlogAddEditFrom from '../../../../components/Dashboard/AdminDashboard/AdminBlogs/BlogAddEditFrom';
import { addBlog, editBlog, fetchBlogsAdmin } from '../../../../redux/blogs/blogAction';
import TableFilter from '../../../../components/Dashboard/common/TableFilter';

const AdminPanelBlogs = () => {
  const {
    adminPanelBlogs,
    loadingBlogs,
    loadingActionBlogs,
    pageSize,
    blogPagination,
    error,
    message,
    categories,
  } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [blog, setBlog] = useState({});
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';

  // addBlog Function
  const handleAddBlog = (data) => {
    dispatch(addBlog(data)).then((res) => {
      if (res.type === 'blog/createBlog/fulfilled') {
        setModal(false);
      }
    });
  };

  // editBlog Function
  const singleBlog = (id) => {
    setBlog(adminPanelBlogs.find((b) => b.id === id));
    setModal(true);
    setModalType('edit');
  };

  const handelEditBlog = (formData, id) => {
    // 🔹 Redux dispatch
    dispatch(editBlog({ id, formData })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  const handelBlogStatusChange = (id, key, value) => {
    // 🔹 Redux dispatch
    dispatch(editBlog({ id, formData: { [key]: value } })).then((res) => {
      if (res.type.endsWith('/fulfilled')) {
        setModal(false);
      }
    });
  };

  const dataWithFormated = adminPanelBlogs.map((blog) => {
    const formateBlog = {
      ...blog,
      published_at: dateConvertionBlogsPageBlogCard(blog.published_at),
      category: blog?.category?.name,
    };
    return formateBlog;
  });

  // ✅ কলাম ডেফিনিশন
  const columns = [
    {
      key: 'sl',
      label: 'SL',
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1), // index+1 দেখাবে
    },
    { key: 'title', label: 'Blog Title', sort: true },
    { key: 'category', label: 'Category' },
    { key: 'published_at', label: 'Published On', sort: true },
  ];

  const blogsFilterFields = [
    {
      name: 'search',
      type: 'text',
      label: 'Blog Name',
      placeholder: 'Blog Name',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category Name',
      options: categories.map((category) => ({ value: category.slug, name: category.name })),
    },
  ];

  // show error  message
  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearError());
    }
  }, [error]);

  // show error  message
  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearMessage());
    }
  }, [message]);

  // ✅ Debounce সহ ডেটা ফেচ
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchBlogsAdmin({
          page: currentPage,
          page_size: pageSize,
          search,
          order: !order ? 'published_at' : order,
          category,
        })
      );
      dispatch(fetchBlogCategories());
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [search, category, currentPage, dispatch, order, message]);

  return (
    <div>
      <LoadingDashboard loading={loadingBlogs || loadingActionBlogs} />
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType === 'add' && (
              <BlogAddEditFrom
                onCancel={() => setModal(false)}
                title="Add New Blog"
                onSubmit={handleAddBlog}
              />
            )}
            {modalType === 'edit' && (
              <BlogAddEditFrom
                onCancel={() => setModal(false)}
                onSubmit={handelEditBlog}
                defaultValues={blog}
              />
            )}
          </div>
        </Modal>
      )}
      <DashBoardHeader
        buttonText={'Add Blog'}
        title={'Blogs'}
        prefixIcon={<FaPlus />}
        handeleAdd={() => {
          setModal(true);
          setModalType('add');
        }}
      />
      <TableFilter fields={blogsFilterFields} />
      <DataTables
        data={dataWithFormated}
        columns={columns}
        paginationType={blogPagination}
        pageSize={pageSize}
        error={error || null}
        deleteButton={false}
        handelEdit={singleBlog}
        statusKey={'status'}
        from={'blog'}
        statusChange={handelBlogStatusChange}
      />
    </div>
  );
};

export default AdminPanelBlogs;
