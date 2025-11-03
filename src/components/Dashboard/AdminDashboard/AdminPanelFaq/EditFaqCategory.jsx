import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function EditFaqCategory({
  title = 'Add New FAQ',
  onSubmit,
  onCancel,
  defaultValues = {},
  category,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    const json_data = { ...category, title: data.title, faq_nav: data.title };
    onSubmit(json_data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 gap-md">
        {/* Title */}
        <div>
          <label className="block mb-sm font-medium">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter Title"
          />
          {errors.Title && <p className="text-red-500 text-sm mt-1">{errors.Title.message}</p>}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <SecondaryButton
            className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
            onClick={onCancel}
            text="Cancel"
            type="button"
          />
          <PrimaryButton
            type="submit"
            text={title.includes('Update') ? 'Update Category' : 'Add FAQ'}
          />
        </div>
      </div>
    </form>
  );
}
