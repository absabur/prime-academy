import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SecondaryButton from '../../../../common/SecondaryButton';
import PrimaryButton from '../../../../common/PrimaryButton';

const defaultCourseValues = {
  title: '',
  short_description: '',
  order: 0,
  is_active: 'true', // select field-এর জন্য string ব্যবহার
};

export default function ModuleAddEditFrom({
  title = 'Add New Course',
  onSubmit,
  onCancel,
  defaultValues = defaultCourseValues,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  // 🧠 যখন defaultValues পরিবর্তন হবে (Edit এর সময়), তখন ফর্ম আপডেট করো
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formattedValues = {
        ...defaultValues,
        // Boolean is_active কে string ('true'/'false') এ রূপান্তর করা হয়েছে select field এর জন্য
        is_active: defaultValues.is_active ? 'true' : 'false',
      };
      reset(formattedValues);
    }
  }, [defaultValues, reset]);

  // 🧾 Form submit handler
  const handleFormSubmit = (data) => {
    // order ফিল্ডের মান string হিসেবে আসে, তাই এটিকে number-এ রূপান্তর করা
    const numericOrder = parseInt(data.order, 10);
    // is_active string ('true'/'false') কে boolean-এ রূপান্তর করা
    const isActiveBool = data.is_active === 'true';

    const finalData = {
      ...data,
      order: isNaN(numericOrder) ? 0 : numericOrder,
      is_active: isActiveBool,
    };
    onSubmit(finalData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-lg space-y-4 "
    >
      <div className="grid grid-cols-1 gap-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } px-4 py-2 rounded-md focus:outline-none `}
            placeholder="Enter course title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Short Description</label>
          <textarea
            {...register('short_description', { required: 'Short Description is required' })}
            rows="3"
            className={`w-full border ${
              errors.short_description ? 'border-red-500' : 'border-gray-300'
            } px-4 py-2 rounded-md focus:outline-none `}
            placeholder="Enter a brief description"
          ></textarea>
          {errors.short_description && (
            <p className="text-red-500 text-sm mt-1">{errors.short_description.message}</p>
          )}
        </div>

        {/* Order (Number) */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Display Order</label>
          <input
            type="number"
            {...register('order', {
              required: 'Order is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Order must be non-negative' },
            })}
            className={`w-full border ${
              errors.order ? 'border-red-500' : 'border-gray-300'
            } px-4 py-2 rounded-md focus:outline-none `}
            placeholder="Enter display order"
          />
          {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>}
        </div>

        {/* Active Status (Select) */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Active Status</label>
          <select
            {...register('is_active', { required: 'Select active status' })}
            className={`w-full border ${
              errors.is_active ? 'border-red-500' : 'border-gray-300'
            } px-4 py-2 rounded-md focus:outline-none `}
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
        <div className="flex justify-end gap-2 mt-4">
          <SecondaryButton
            onClick={onCancel}
            type="button"
            text={'Cancel'}
            className="border-2 border-primary text-primary hover:bg-secondary hover:text-white hover:border-secondary"
          />

          <PrimaryButton
            type="submit"
            text={title.includes('Edit') ? 'Update Module' : 'Add Module'}
          />
        </div>
      </div>
    </form>
  );
}
