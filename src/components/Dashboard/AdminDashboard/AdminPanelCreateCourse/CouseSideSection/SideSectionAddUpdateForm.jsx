import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UploadCloud } from 'lucide-react';
// Adjust these import paths based on your file structure
import SecondaryButton from '../../../../common/SecondaryButton';
import PrimaryButton from '../../../../common/PrimaryButton';
import CKEDITOR from '../../../common/CKEDITOR';

const defaultValuesSchema = {
  title: '',
  text: '',
  button_text: '',
  button_url: '',
  image: '',
  is_active: true,
};

export default function SideSectionAddUpdateForm({
  formTitle = 'Add Course Content', // Renamed prop to avoid conflict with data 'title'
  onSubmit,
  onCancel,
  course_detail_id,
  defaultValues = defaultValuesSchema,
}) {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  // Watch the file input to update preview dynamically
  const watchedImage = watch('image');

  // 🧠 1. Handle Resetting Form & Previews when defaultValues change (Edit Mode)
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);

      // Set existing image preview if available
      if (typeof defaultValues.image === 'string' && defaultValues.image) {
        setPreview(defaultValues.image);
      } else {
        setPreview(null);
      }
    }
  }, [defaultValues, reset]);

  // 🧠 2. Handle New File Selection for Preview
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0 && watchedImage[0] instanceof File) {
      const file = watchedImage[0];
      const url = URL.createObjectURL(file);
      setPreview(url);

      // Cleanup memory
      return () => URL.revokeObjectURL(url);
    }
  }, [watchedImage]);

  const handleFormSubmit = (data) => {
    // If new file uploaded -> Send FormData
    if (watchedImage && watchedImage[0] instanceof File) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('text', data.text);
      formData.append('button_text', data.button_text);
      formData.append('button_url', data.button_url);
      formData.append('image', data.image[0]); // Mapped to 'image'
      formData.append('is_active', data.is_active);
      formData.append('course_detail', course_detail_id);

      onSubmit(formData, data.id);
      return;
    }

    // If NO new file uploaded -> send JSON body
    const { image, ...finaldata } = data;

    // Ensure course_detail is included
    finaldata.course_detail = course_detail_id;

    onSubmit(finaldata, data.id);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{formTitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="e.g. Learn With Rahad Mondal"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Button Text */}
        <div>
          <label className="block mb-sm font-medium">Button Text</label>
          <input
            type="text"
            {...register('button_text')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
            placeholder="e.g. Join Now"
          />
        </div>

        {/* Button URL */}
        <div>
          <label className="block mb-sm font-medium">Button URL</label>
          <input
            type="text"
            {...register('button_url')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
            placeholder="e.g. https://..."
          />
        </div>

        {/* Text / Content (CKEditor) */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Content Text</label>
          <Controller
            name="text"
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
          {errors.text && <p className="text-red-500 text-sm mt-1">{errors?.text?.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Image</label>

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
                  {...register('image')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Is Active Status */}
        <div>
          <label className="block mb-sm font-medium">Active Status</label>
          <select
            {...register('is_active', { required: 'Active status is required' })}
            className={`w-full border ${
              errors.is_active ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
          {errors.is_active && (
            <p className="text-red-500 text-sm mt-1">{errors.is_active.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <SecondaryButton
            className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
            onClick={onCancel}
            text="Cancel"
          />
          <PrimaryButton
            type="submit"
            text={formTitle.toLocaleLowerCase().includes('add') ? 'Add' : 'Update '}
          />
        </div>
      </div>
    </form>
  );
}
