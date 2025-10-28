import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';

export default function AddEditPartner({
  title = 'Add New',
  onSubmit,
  onCancel,
  defaultValues = {},
}) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues });

  const [preview, setPreview] = useState(defaultValues?.logo || null);

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setValue('image', acceptedFiles, { shouldValidate: true });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">
        {title} Partner
      </h2>

      {preview && (
        <div>
          <p className="mb-1 font-medium text-gray-600">Preview</p>
          <img src={preview} className="h-32 w-32 object-contain rounded-md border" />
        </div>
      )}

      <div>
        <label className="block mb-sm font-medium">Upload Image</label>
        <div
          {...getRootProps()}
          className={`flex justify-center rounded-lg border-2 px-6 pt-5 pb-6 cursor-pointer 
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'}
          ${errors.image ? 'border-red-500' : ''}`}
        >
          <input
            {...getInputProps({
              onChange: (e) => {
                const files = e.target.files;
                setValue('image', files, { shouldValidate: true });
              },
            })}
          />

          <div className="space-y-1 text-center">
            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <span className="font-medium text-primary">Upload a file</span> or drag and drop
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
      </div>

      <div className="flex justify-end gap-sm">
        <SecondaryButton
          className="border-primary text-primary hover:text-white"
          onClick={onCancel}
          text="Cancel"
        />
        <PrimaryButton type="submit" text={`${title} Partner`} />
      </div>
    </form>
  );
}
