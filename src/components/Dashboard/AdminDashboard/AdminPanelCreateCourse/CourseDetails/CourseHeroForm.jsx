import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import PreNextButtonSection from '../PreNextButtonSection';
import { nextStep, updateFormData } from '../../../../../redux/courseWizard/courseWizardSlice';

export default function CourseHeroForm({ title = 'Course Hero Section' }) {
  // Assuming the key in your redux store for this section is 'hero'
  const { coursedetails } = useSelector((state) => state.courseWizard.formData);

  const defaultValues = {
    course: coursedetails?.course || '', // You might want to pre-fill this from URL params or parent state
    hero_text: coursedetails?.hero_text || '',
    hero_description: coursedetails?.hero_description || '',
    hero_button: coursedetails?.hero_button || '',
    is_active: coursedetails?.is_active ?? true, // Default to true based on your JSON
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // Convert string 'true'/'false' back to boolean if select input returns strings
    const formattedData = {
      ...data,
      is_active: data.is_active === 'true' || data.is_active === true,
    };

    // Dispatch to redux store with a unique key (e.g., 'coursedetails')
    dispatch(updateFormData({ key: 'coursedetails', data: formattedData }));
    dispatch(nextStep());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        {/* Navigation Buttons */}
        <PreNextButtonSection className="col-span-2" />
      </div>
    </form>
  );
}
