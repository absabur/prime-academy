import { useForm } from 'react-hook-form';
import PrimaryButton from '../../../../common/PrimaryButton';
import SecondaryButton from '../../../../common/SecondaryButton';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const defaultValuesSchema = {
  tab_name: '',
  order: 0,
  is_active: true,
};

export default function TabAddUpdateForm({
  formTitle = 'Add Tab',
  onSubmit = (data) => console.log(data), // Default handler for demo
  onCancel = () => console.log('Cancelled'), // Default handler for demo
  defaultValues = defaultValuesSchema,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValuesSchema,
  });
  const { courseWizardLoading } = useSelector((state) => state.courseWizard);
  // Edit মোড এর জন্য ডেটা রিসেট করা
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    // Order কে number এ কনভার্ট করে পাঠানো ভালো
    const formattedData = {
      ...data,
      order: Number(data.order),
    };

    // id থাকলে (Update এর ক্ষেত্রে) সেটা সহ পাঠানো
    if (onSubmit) {
      onSubmit(formattedData, data.id);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-sm space-y-6  mx-auto border border-gray-100"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-gray-800 py-2">{formTitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tab Name */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Tab Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('tab_name', { required: 'Tab Name is required' })}
            className={`w-full border ${
              errors.tab_name ? 'border-red-500' : 'border-black/10'
            } px-4 py-2 rounded-md focus:outline-none focus:shadow-lg transition-shadow`}
            placeholder="e.g. Curriculum / Instructor"
          />
          {errors.tab_name && (
            <p className="text-red-500 text-sm mt-1">{errors.tab_name.message}</p>
          )}
        </div>

        {/* Order */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Order <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            {...register('order', {
              required: 'Order is required',
              valueAsNumber: true, // ইনপুট ভ্যালু অটোমেটিক নাম্বারে কনভার্ট হবে
            })}
            className={`w-full border ${
              errors.order ? 'border-red-500' : 'border-black/10'
            } px-4 py-2 rounded-md focus:outline-none focus:shadow-lg transition-shadow`}
            placeholder="e.g. 1"
          />
          {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
          <SecondaryButton
            onClick={onCancel}
            text="Cancel"
            className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
          />
          <PrimaryButton
            type="submit"
            disabled={courseWizardLoading}
            text={
              courseWizardLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {formTitle.includes('Update') ? 'Updating...' : 'Creating...'}
                </span>
              ) : formTitle.includes('Update') ? (
                'Update '
              ) : (
                'Add '
              )
            }
          />
        </div>
      </div>
    </form>
  );
}
