import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { capitalizeFirst } from '@/utils/capitalizeFirst';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditHeroForm({
  onSubmit,
  onCancel,
  defaultValues = {},
  title = `Update ${capitalizeFirst(defaultValues.page_name)} Hero`,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const [preview, setPreview] = useState(defaultValues.banner_image || null);

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formattedValues = {
        ...defaultValues,
        is_active: defaultValues.is_active ? 'true' : 'false',
      };
      reset(formattedValues);
      setPreview(defaultValues.banner_image || null);
    }
  }, [defaultValues, reset]);

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = (data) => {
    const id = data.id || null;
    const formData = new FormData();

    const isFileSelected = data.banner_image && data.banner_image[0] instanceof File;

    if (isFileSelected) {
      for (const [key, value] of Object.entries(data)) {
        if (key !== 'banner_image' || key !== 'page_name') formData.append(key, value);
      }
      formData.append('banner_image', data.banner_image[0]);
      onSubmit(formData, id);
    } else {
      const jsonData = { ...data };
      delete jsonData.banner_image;
      delete jsonData.page_name;
      onSubmit(jsonData, id);
    }

    reset();
    setPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Title */}
        <div>
          <label className="block mb-sm font-medium">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows="4"
            className={`w-full border ${
              errors.description ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter short description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Button 1 */}
        <div>
          <label className="block mb-sm font-medium">Button 1 Text</label>
          <input
            type="text"
            {...register('button1_text')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
          />
        </div>

        <div>
          <label className="block mb-sm font-medium">Button 1 URL</label>
          <input
            type="text"
            {...register('button1_url')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
            placeholder="/courses"
          />
        </div>

        {/* Button 2 */}
        <div>
          <label className="block mb-sm font-medium">Button 2 Text</label>
          <input
            type="text"
            {...register('button2_text')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
          />
        </div>

        <div>
          <label className="block mb-sm font-medium">Button 2 URL</label>
          <input
            type="text"
            {...register('button2_url')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
            placeholder="/faqs"
          />
        </div>

        {/* Banner Image */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('banner_image')}
            onChange={handleImageChange}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
          />

          {preview && (
            <img
              src={preview}
              className="w-44 h-28 object-cover rounded-md mt-sm border"
              alt="Preview"
            />
          )}
        </div>

        {/* Active Status */}
        <div>
          <label className="block mb-sm font-medium">Active Status</label>
          <select
            {...register('is_active')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <SecondaryButton
            className="border-primary text-primary hover:text-white"
            onClick={onCancel}
            text="Cancel"
          />
          <PrimaryButton type="submit" text={`${title}`} />
        </div>
      </div>
    </form>
  );
}
