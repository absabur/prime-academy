import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PreNextButtonSection from '../PreNextButtonSection';

export default function CourseHeroForm({
  title = 'Course Hero Section',
  defaultValues = {},
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const EMPTY_FROM_STATE = {
    hero_text: '',
    hero_description: '',
    hero_button: '',
    is_active: true,
  };

  useEffect(() => {
    // Reset form when defaultValues change
    if (!defaultValues || Object.keys(defaultValues).length === 0) {
      reset(EMPTY_FROM_STATE);
    } else {
      reset(defaultValues);
    }
  }, [JSON.stringify(defaultValues), reset]);

  const handelSubmit = (data) => {
    const formattedData = {
      ...data,
      // select value always returns string
      is_active: data.is_active === 'true' || data.is_active === true,
    };

    onSubmit(formattedData);
  };

  return (
    <form
      onSubmit={handleSubmit(handelSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Hero Text */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Hero Text / Headline</label>
          <input
            type="text"
            {...register('hero_text', { required: 'Hero text is required' })}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            placeholder="Enter the main headline"
          />
          {errors.hero_text && <p className="text-red-500 text-sm">{errors.hero_text.message}</p>}
        </div>

        {/* Hero Description */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Hero Description</label>
          <textarea
            rows={4}
            {...register('hero_description', { required: 'Description is required' })}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            placeholder="Enter a short description..."
          />
          {errors.hero_description && (
            <p className="text-red-500 text-sm">{errors.hero_description.message}</p>
          )}
        </div>

        {/* Hero Button Text */}
        <div>
          <label className="block mb-sm font-medium">Button Label</label>
          <input
            type="text"
            {...register('hero_button', { required: 'Button label is required' })}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            placeholder="e.g. Join Now"
          />
          {errors.hero_button && (
            <p className="text-red-500 text-sm">{errors.hero_button.message}</p>
          )}
        </div>

        {/* Is Active */}
        <div>
          <label className="block mb-sm font-medium">Is Active?</label>
          <select
            {...register('is_active')}
            className="w-full border border-black/10 px-md py-sm rounded-md"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Navigation Buttons */}
        <PreNextButtonSection className="col-span-2" />
      </div>
    </form>
  );
}
