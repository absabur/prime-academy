import { UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCourseCategories,
  fetchCourseCategories,
} from '../../../../../redux/courses/courseAction';
import PrimaryButton from '../../../../common/PrimaryButton';
import SecondaryButton from '../../../../common/SecondaryButton';
import CKEDITOR from '../../../common/CKEDITOR';
import PreNextButtonSection from '../PreNextButtonSection';
import SwalUtils from '../../../../../utils/sweetAlert';

const defaultValuesSchema = {
  category: '',
  batch: null,
  show_in_megamenu: false,
  show_in_home_tab: false,
  title: '',
  short_description: '',
  full_description: '',
  header_image: '',
  status: '',
  is_active: true,
};

export default function MainCourseAddEditFrom({
  title = 'Course Details',
  onSubmit,
  defaultValues = defaultValuesSchema,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm({ defaultValues });

  const [preview, setPreview] = useState(defaultValues.header_image || null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.course);
  const headerImage = watch('header_image');
  const [departmentDropDown, setdepartmentDropDown] = useState(false);
  const [departmentName, setDepartmentName] = useState('');

  // 🧠 Edit এর জন্য ফর্ম আপডেট
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formattedValues = {
        ...defaultValues,
        category: defaultValues.category?.id || '',
      };
      reset(formattedValues);

      if (typeof defaultValues.header_image === 'string' && defaultValues.header_image) {
        setPreview(defaultValues.header_image);
      } else {
        setPreview(null);
      }
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    dispatch(fetchCourseCategories()); // Fetch categories if needed
  }, [dispatch]);

  // 🧠 2. Handle New File Selection for Preview
  useEffect(() => {
    if (headerImage && headerImage.length > 0 && headerImage[0] instanceof File) {
      const file = headerImage[0];
      const url = URL.createObjectURL(file);
      setPreview(url);

      // Cleanup memory
      return () => URL.revokeObjectURL(url);
    }
  }, [headerImage]);

  // 🧾 Handle submit with FormData (for file upload)
  const handleFormSubmit = (data) => {
    // 🔹 Boolean values (which come as strings from form) need to be converted
    const submitData = {
      ...data,
      is_active: true,
    };

    // 🔹 check if user selected a new file (Safari-compatible check)
    const file = submitData.header_image && submitData.header_image[0];
    const isFileSelected = !!(file && (file instanceof File || file.name));

    // Determine the data type for submission (FormData for new file, JSON for text/existing image)
    if (isFileSelected) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(submitData)) {
        if (key === 'header_image' && value[0] && (value[0] instanceof File || value[0].name)) {
          // Include filename for Safari compatibility
          formData.append(key, value[0], value[0].name || 'header.jpg');
        } else if (key !== 'header_image') {
          formData.append(key, value);
        }
      }
      onSubmit(formData, defaultValues.id || null);
    } else {
      delete submitData.header_image; // remove file field if no new file is selected
      onSubmit(submitData, defaultValues.id || null);
    }
    if (!defaultValues?.id) {
      reset();
      setPreview(null);
    }
  };

  const handleAddDepartment = async () => {
    try {
      await dispatch(createCourseCategories({ name: departmentName })).unwrap();
      SwalUtils.success('Course Category Create Done');
      setdepartmentDropDown(false);
      setDepartmentName('');
      dispatch(fetchCourseCategories());
    } catch (error) {
      console.log(error);
      SwalUtils.error(error?.message || error?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* 1. Title */}
        <div>
          <label className="block mb-sm font-medium">Course Title</label>
          <input
            type="text"
            {...register('title', { required: 'Course title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter course title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* 2. Category */}
        <div>
          <label className="block mb-sm font-medium">Category</label>
          <div className="relative flex gap-sm ">
            <select
              {...register('category', { required: 'Category is required' })}
              className={`w-full border ${
                errors.category ? 'border-red-500' : 'border-black/10'
              } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            >
              <option value="">Select Category</option>
              {/* Replace with your actual category list mapping */}
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setdepartmentDropDown(true)}
              type="button"
              className="self-end text-4xl mb-xs "
              title="Add Department"
            >
              <FaPlus />
            </button>
            {/* Department small form */}
            {departmentDropDown && (
              <div className="absolute right-0 bg-white shadow-xl rounded-md p-md top-12 z-50 border space-y-sm border-black/10 w-56">
                <input
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  type="text"
                  placeholder="Department name"
                  className="w-full border border-black/20 px-sm py-xs rounded-md focus:outline-none"
                />
                <div className="flex justify-end gap-xs">
                  <SecondaryButton
                    className="text-black  border-primary hover:bg-secondary hover:text-white hover:border-secondary"
                    onClick={() => setdepartmentDropDown(false)}
                    type="button"
                    text={`Cancel`}
                    minWidth="fit"
                  />
                  <PrimaryButton
                    type="button"
                    onClick={handleAddDepartment}
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

        {/* 3. Short Description (Full Width) */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Short Description</label>
          <textarea
            {...register('short_description', { required: 'Short description is required' })}
            rows="2"
            className={`w-full border ${
              errors.short_description ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg resize-y`}
            placeholder="Enter a brief course description (max 100-200 chars)"
          />
          {errors.short_description && (
            <p className="text-red-500 text-sm mt-1">{errors.short_description.message}</p>
          )}
        </div>

        {/* 4. Full Description (Full Width) */}
        {/* ✅ CKEditor */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Full Description</label>
          <Controller
            name="full_description"
            control={control}
            rules={{ required: 'Full Description is required' }}
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
          {errors.full_description && (
            <p className="text-red-500 text-sm mt-1">{errors.full_description.message}</p>
          )}
        </div>

        {/* 5. Header Image (File Upload) */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Header Image</label>

          <div className="flex items-start gap-4">
            {/* Preview Box */}
            <div className="w-20 h-20 border border-gray-300 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 relative">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400 text-center">No Img</span>
              )}
            </div>

            {/* Upload Input */}
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 hover:border-primary transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*,image/heic,image/heif"
                  {...register('header_image')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* 9. Batch*/}
        <div>
          <label className="block mb-sm font-medium">Batch</label>
          <input
            {...register('batch')}
            type="text"
            className={`w-full border ${
              errors.batch ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          ></input>
          {errors.batch && <p className="text-red-500 text-sm mt-1">{errors.batch.message}</p>}
        </div>

        {/* Buttons */}
        <PreNextButtonSection className="col-span-2" />
      </div>
    </form>
  );
}
