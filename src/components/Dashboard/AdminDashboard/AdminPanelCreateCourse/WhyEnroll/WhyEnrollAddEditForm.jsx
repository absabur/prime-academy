import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadCloud, X } from 'lucide-react';
import SecondaryButton from '../../../../common/SecondaryButton';
import PrimaryButton from '../../../../common/PrimaryButton';

const defaultValuesSchema = {
  title: '',
  text: '',
  icon: '',
  is_active: 'true', // String for select field compatibility
};

export default function WhyEnrollAddEditForm({
  title = 'Add Why Enroll Item',
  onSubmit,
  onCancel,
  defaultValues = defaultValuesSchema,
}) {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  // Watch the file input to update preview dynamically
  const watchedIcon = watch('icon');

  // 🧠 1. Handle Resetting Form & Previews when defaultValues change (Edit Mode)
  useEffect(() => {
    if (defaultValues) {
      const formattedValues = {
        ...defaultValues,
        // Convert boolean to string for the select input
        is_active: defaultValues.is_active ? 'true' : 'false',
      };
      reset(formattedValues);

      // Set existing image preview if available
      if (typeof defaultValues.icon === 'string' && defaultValues.icon) {
        setPreview(defaultValues.icon);
      } else {
        setPreview(null);
      }
    }
  }, [defaultValues, reset]);

  // 🧠 2. Handle New File Selection for Preview
  useEffect(() => {
    if (watchedIcon && watchedIcon.length > 0 && watchedIcon[0] instanceof File) {
      const file = watchedIcon[0];
      const url = URL.createObjectURL(file);
      setPreview(url);

      // Cleanup memory
      return () => URL.revokeObjectURL(url);
    }
  }, [watchedIcon]);

  // 🧾 Form submit handler
  const handleFormSubmit = (data) => {
    // Convert is_active string back to boolean
    const isActiveBool = data.is_active === 'true';

    // Handle Image Logic: Use new file if uploaded, otherwise keep existing
    let finalIcon = defaultValues?.icon;
    if (data.icon && data.icon.length > 0) {
      finalIcon = data.icon[0];
    }

    const finalData = {
      ...data,
      icon: finalIcon,
      is_active: isActiveBool,
    };

    onSubmit(finalData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Category Title */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Category Title</label>
          <input
            type="text"
            {...register('title', { required: 'Category title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="e.g. Web Development"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Description</label>
          <textarea
            rows="3"
            {...register('description')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
            placeholder="Enter a brief description for the category"
          ></textarea>
        </div>

        {/* Image Upload */}
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
                <input type="file" accept="image/*" {...register('icon')} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Active Status */}
        <div>
          <label className="block mb-sm font-medium">Active Status</label>
          <select
            {...register('is_active', { required: 'Active status is required' })}
            className={`w-full border ${
              errors.is_active ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
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
            text={title.toLocaleLowerCase().includes('add') ? 'Add' : 'Update '}
          />
        </div>
      </div>
    </form>
  );
}
