import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaImage } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../redux/courses/courseAction';
import { nextStep, updateFormData } from '../../../../../redux/courseWizard/courseWizardSlice';
import PreNextButtonSection from '../PreNextButtonSection';
import { UploadCloud } from 'lucide-react';

export default function MainCourseAddEditFrom({
  title = 'Course Details',
  onSubmit,
  onCancel,
  defaultValues = {}, // Course object for edit
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues });

  const [preview, setPreview] = useState(defaultValues.header_image || null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.course);
  const headerImage = watch('header_image');

  // 🧠 Edit এর জন্য ফর্ম আপডেট
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formattedValues = {
        ...defaultValues,
        // Boolean values (show_in_megamenu, show_in_home_tab, is_active) to string for <select>
        show_in_megamenu: defaultValues.show_in_megamenu ? 'true' : 'false',
        show_in_home_tab: defaultValues.show_in_home_tab ? 'true' : 'false',
        is_active: defaultValues.is_active ? 'true' : 'false',
      };
      reset(formattedValues);

      if (defaultValues.header_image) {
        const file = defaultValues.header_image[0];
        console.log(defaultValues.header_image.url);
        console.log(defaultValues.header_image[0] instanceof File); // true/false
        // if (file) {
        //   setPreview(URL.createObjectURL(file));
        // }
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
      show_in_megamenu: data.show_in_megamenu === 'true',
      show_in_home_tab: data.show_in_home_tab === 'true',
      is_active: data.is_active === 'true',
    };

    console.log(submitData);

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

      // onSubmit(formData, defaultValues.id || null);
    } else {
      delete submitData.header_image; // remove file field if no new file is selected
      // onSubmit(submitData, defaultValues.id || null);
    }

    dispatch(updateFormData({ key: 'courseInfo', data: submitData }));
    dispatch(nextStep());

    // reset();
    // setPreview(null);
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
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Full Description</label>
          <textarea
            {...register('full_description')}
            rows="4"
            className={`w-full border ${
              errors.full_description ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg resize-y`}
            placeholder="Enter the complete course details"
          />
          {errors.full_description && (
            <p className="text-red-500 text-sm mt-1">{errors.full_description.message}</p>
          )}
        </div>

        {/* 5. Header Image (File Upload) */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Icon / Image</label>

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
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-colors">
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

        {/* 6. Status */}
        <div>
          <label className="block mb-sm font-medium">Publication Status</label>
          <select
            {...register('status', { required: 'Status is required' })}
            className={`w-full border ${
              errors.status ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        {/* 7. Show in Megamenu */}
        <div>
          <label className="block mb-sm font-medium">Show in Megamenu?</label>
          <select
            {...register('show_in_megamenu', { required: 'Megamenu status is required' })}
            className={`w-full border ${
              errors.show_in_megamenu ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value="">Select Option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.show_in_megamenu && (
            <p className="text-red-500 text-sm mt-1">{errors.show_in_megamenu.message}</p>
          )}
        </div>

        {/* 8. Show in Home Tab */}
        <div>
          <label className="block mb-sm font-medium">Show in Home Tab?</label>
          <select
            {...register('show_in_home_tab', { required: 'Home tab status is required' })}
            className={`w-full border ${
              errors.show_in_home_tab ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value="">Select Option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.show_in_home_tab && (
            <p className="text-red-500 text-sm mt-1">{errors.show_in_home_tab.message}</p>
          )}
        </div>

        {/* 9. Is Active */}
        <div>
          <label className="block mb-sm font-medium">Is Active?</label>
          <select
            {...register('is_active', { required: 'Active status is required' })}
            className={`w-full border ${
              errors.is_active ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value="">Select Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {errors.is_active && (
            <p className="text-red-500 text-sm mt-1">{errors.is_active.message}</p>
          )}
        </div>

        {/* Buttons */}
        <PreNextButtonSection className="col-span-2" />
      </div>
    </form>
  );
}

// Example usage:
// <AddProductForm
//   onSubmit={handleProductSubmission}
//   onCancel={closeModal}
//   defaultValues={productToEdit}
//   categories={[{id: 'uuid1', name: 'Electronics'}, {id: 'uuid2', name: 'Books'}]}
// />
