import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { addBlogCategories, fetchBlogCategories } from '../../../../redux/blogs/blogAction';
import SwalUtils from '../../../../utils/sweetAlert';
import CKEDITOR from '../../common/CKEDITOR';

export default function BlogAddEditFrom({
  title = 'Add New Blog',
  onSubmit,
  onCancel,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ defaultValues });

  const [preview, setPreview] = useState(defaultValues.featured_image || null);
  const [categorieDropDown, setcategorieDropDown] = useState(false);
  const [categorieName, setCategoryName] = useState('');
  const { categories } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  // 🧠 যখন defaultValues পরিবর্তন হবে (Edit এর সময়), তখন ফর্ম আপডেট করো
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formattedValues = {
        ...defaultValues,
        category: defaultValues.category?.id || '',
        featured_image: defaultValues.featured_image || '',
        is_active: defaultValues.is_active ? 'true' : 'false', // select field string নেয়
      };

      reset(formattedValues);
      setPreview(defaultValues.featured_image || null);
    }
  }, [defaultValues, reset, categories]);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // get category
  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, []);

  // 🧾 Handle submit with FormData (for file upload)
  const handleFormSubmit = (data) => {
    const id = data.id || null;
    // 🔹 check if user selected a new file
    const isFileSelected = data.featured_image && data.featured_image[0] instanceof File;

    if (isFileSelected) {
      // FormData for new file
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        if (key !== 'featured_image') formData.append(key, value);
      }

      formData.append('featured_image', data.featured_image[0]);
      onSubmit(formData, id);
    } else {
      // JSON data for no new image
      const jsonData = { ...data };
      delete jsonData.featured_image; // remove featured_image
      onSubmit(jsonData, id);
    }

    // Reset form & preview
    reset();
    setPreview(null);
  };

  // Add New Category
  const handleAddCategory = () => {
    if (!categorieName) return SwalUtils.error('Enter Category Name');
    dispatch(addBlogCategories({ name: categorieName }));
    setcategorieDropDown(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Post Title</label>
          <input
            type="text"
            {...register('title', { required: 'Post title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter post title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Excerpt */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Excerpt</label>
          <textarea
            {...register('excerpt', { required: 'Excerpt is required' })}
            className={`w-full border ${
              errors.excerpt ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            rows="3"
            placeholder="Short summary of the post..."
          ></textarea>
          {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
        </div>
        {/* Status */}
        <div>
          <label className="block mb-sm font-medium">Status</label>
          <select
            {...register('status', { required: 'Status is required' })}
            className={`w-full border ${
              errors.status ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        {/* Category */}
        <div className=" ">
          <label className="block mb-sm font-medium">Category Name</label>
          <div className="flex justify-between items-center relative">
            <select
              name=""
              id=""
              className={`w-[90%] border ${
                errors.category ? 'border-red-500' : 'border-black/10'
              } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
              {...register('category', { required: 'Category name is required' })}
            >
              <option value="">Select Category</option>
              {categories.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setcategorieDropDown(true)}
              type="button"
              className="self-end text-4xl mb-xs "
              title="Add Category"
            >
              <FaPlus />
            </button>
            {/* Category small form */}
            {categorieDropDown && (
              <div className="absolute right-0 bg-white shadow-xl rounded-md p-md top-10 z-50 border space-y-sm border-black/10 w-56">
                <input
                  value={categorieName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  type="text"
                  placeholder="Category name"
                  className="w-full border border-black/20 px-sm py-xs rounded-md focus:outline-none"
                />
                <div className="flex justify-end gap-xs">
                  <SecondaryButton
                    className="text-black  border-primary hover:bg-secondary hover:text-white hover:border-secondary"
                    onClick={() => setcategorieDropDown(false)}
                    type="button"
                    text={`Cancel`}
                    minWidth="fit"
                  />
                  <PrimaryButton
                    type="button"
                    onClick={handleAddCategory}
                    text={`Add`}
                    minWidth="fit"
                  />
                </div>
              </div>
            )}
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Featured Image */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Feature Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('featured_image')}
            onChange={handleImageChange}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mt-2 border border-black/10"
            />
          )}
        </div>

        {/* ✅ CKEditor for content */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Content</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field: { onChange, value } }) => (
              <CKEDITOR
                value={value || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  onChange(data);
                }}
              />
            )}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <SecondaryButton
            className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
            onClick={onCancel}
            text="Cancel"
            type="button"
          />
          <PrimaryButton type="submit" text={title.includes('Edit') ? 'Update Post' : 'Add Post'} />
        </div>
      </div>
    </form>
  );
}
