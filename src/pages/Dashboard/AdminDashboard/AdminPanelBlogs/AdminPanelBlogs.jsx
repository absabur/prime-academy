import Modal from '@/components/common/Modal';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import DataTables from '@/components/Dashboard/common/DataTables';
import { fetchBlogCategories, fetchBlogs, fetchSingleBlog } from '@/redux/blogs/blogAction';
import { clearError, clearMessage } from '@/redux/blogs/blogSlice';
import SwalUtils from '@/utils/sweetAlert';
import { dateConvertionBlogsPageBlogCard } from '@/utils/timeFormat';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const AdminPanelBlogs = () => {
  const { blogs, loadingBlogs, pageSize, blogPagination, error, message, blog, categories } =
    useSelector((state) => state.blog);

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';

  // addBlog Function
  const handleAddBlog = async (data) => {
    // dispatch(createBlog(data)).then((res) => {
    //   if (res.type === 'blog/createBlog/fulfilled') {
    //     setModal(false);
    //   }
    // });
  };

  // editBlog Function
  const singleBlog = async (id) => {
    dispatch(fetchSingleBlog(id));
    setModal(true);
    setModalType('edit');
  };

  const handelEditBlog = async (data) => {
    const formData = new FormData();

    // 🔹 object কে সহজে FormData তে যোগ করা
    Object.entries({
      first_name: data.first_name,
      last_name: data.last_name,
      'profile.title': data.profile?.title,
      'profile.education': data.profile?.education,
      'profile.bio': data.profile?.bio,
    }).forEach(([key, value]) => {
      formData.append(key, value || '');
    });

    // 🔹 ফাইল থাকলে যুক্ত করা
    const file = data.profile?.image?.[0];
    if (file instanceof File) {
      formData.append('profile.image', file);
    }

    // 🔹 Redux dispatch
    // dispatch(updateBlog({ id: data.id, blogData: formData })).then((res) => {
    //   if (res.type.endsWith('/fulfilled')) {
    //     setModal(false);
    //   }
    // });
  };

  const dataWithFormated = blogs.map((blog) => {
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
    { key: 'title', label: 'Blog Title' },
    { key: 'category', label: 'Category' },
    { key: 'published_at', label: 'Published On' },
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
        fetchBlogs({
          page: currentPage,
          page_size: pageSize,
          search,
          order: !order ? 'published_at' : order,
        })
      );
      dispatch(fetchBlogCategories());
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [search, category, currentPage, dispatch, order]);

  return (
    <div>
      {modal && (
        <Modal setModal={setModal} noClose={true}>
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            {modalType === 'add' && (
              <BlogForm
                onCancel={() => setModal(false)}
                title="Add New Blog"
                onSubmit={handleAddBlog}
              />
            )}
            {modalType === 'edit' && (
              <EditBlogForm onCancel={() => setModal(false)} onSubmit={handelEditBlog} />
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
      <DataTables
        data={dataWithFormated}
        columns={columns}
        paginationType={blogPagination}
        pageSize={pageSize}
        error={error || null}
        deleteButton={false}
        handelEdit={singleBlog}
      />
    </div>
  );
};

export default AdminPanelBlogs;
