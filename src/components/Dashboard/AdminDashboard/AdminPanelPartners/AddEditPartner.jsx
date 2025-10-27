import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function AddEditPartner({
  title = 'Add New',
  onSubmit,
  onCancel,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues });

  const [preview, setPreview] = useState(null);

  // When default image exists → show preview on load
  useEffect(() => {
    if (defaultValues?.logo) {
      setPreview(defaultValues.logo); // should be full image URL
    }
  }, [defaultValues]);

  // Watch new file input and show preview
  const imageFile = watch('image');
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);

      return () => URL.revokeObjectURL(fileURL); // cleanup
    }
  }, [imageFile]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">
        {title} Partner
      </h2>

      <div className="grid grid-cols-1 gap-md">
        {/* Image Preview */}
        {preview && (
          <div>
            <p className="mb-1 font-medium text-gray-600">Preview</p>
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 object-contain rounded-md border border-black/10"
            />
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block mb-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image', {
              required: !defaultValues?.logo ? 'Image is required' : false,
            })}
            className={`w-full border ${
              errors.image ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-sm mt-md">
          <button
            type="button"
            onClick={onCancel}
            className="px-md py-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-md py-sm bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {title} Partner
          </button>
        </div>
      </div>
    </form>
  );
}
