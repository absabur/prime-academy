import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsTypeH1 } from 'react-icons/bs';

export default function EditUserForm({
  title = 'Edit Student',
  onCancel,
  onSubmit,
  defaultValues,
  loading,
}) {
  const [preview, setPreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });

  // student ডেটা আসলে form reset করবে
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setPreview(defaultValues?.profile?.image || '');
    }
  }, [defaultValues, reset]);

  // Watch file input change
  const fileValue = watch('profile.image');
  useEffect(() => {
    const file = fileValue && fileValue[0];
    if (file && (file instanceof File || file.name)) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof fileValue === 'string') {
      setPreview(fileValue);
    }
  }, [fileValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
      >
        <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* First Name */}
          <div>
            <label className="block mb-sm font-medium">First Name</label>
            <input
              type="text"
              {...register('first_name', { required: 'First name is required' })}
              className={`w-full border ${
                errors.first_name ? 'border-red-500' : 'border-black/10'
              } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-sm font-medium">Last Name</label>
            <input
              type="text"
              {...register('last_name', { required: 'Last name is required' })}
              className={`w-full border ${
                errors.last_name ? 'border-red-500' : 'border-black/10'
              } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
              placeholder="Enter last name"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block mb-sm font-medium">Title</label>
            <input
              type="text"
              {...register('profile.title')}
              className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
              placeholder="Enter title"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block mb-sm font-medium">Education</label>
            <input
              type="text"
              {...register('profile.education')}
              className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
              placeholder="Enter education"
            />
          </div>

          {/* Image Upload */}

          <div className="md:col-span-2">
            {title.toLocaleLowerCase().includes('student') && (
              <>
                {' '}
                <label className="block mb-sm font-medium">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register('profile.image')}
                  className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
                />
              </>
            )}
            {/* ✅ Preview Section */}
            {preview && (
              <div className="mt-sm">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-24 h-24 object-cover rounded-full border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-sm mt-md">
            <SecondaryButton
              className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
              onClick={onCancel}
              text={`Cancel`}
            />
            <PrimaryButton
              type="submit"
              disabled={loading}
              text={`
              ${title.toLocaleLowerCase().includes('teacher') ? 'Update Teacher' : ""}
              ${title.toLocaleLowerCase().includes('student') ? 'Update Student' : ""}`}
            ></PrimaryButton>
          </div>
        </div>
      </form>
    </>
  );
}
