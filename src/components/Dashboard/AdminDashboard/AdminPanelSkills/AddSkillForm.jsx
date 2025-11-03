import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { fetchDepartments } from '@/redux/department/departmentAction';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function AddSkillForm({
  title = 'Add New Skill',
  onSubmit,
  onCancel,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  // 🧠 যখন defaultValues পরিবর্তন হবে (Edit এর সময়), তখন ফর্ম আপডেট করো
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formattedValues = {
        ...defaultValues,
        is_active: defaultValues.is_active ? 'true' : 'false', // select field string নেয়
      };

      reset(formattedValues);
    }
  }, [defaultValues, reset]);

  // get department
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartments());
  }, []);

  // 🧾 Handle submit with FormData (for file upload)
  const handleFormSubmit = (data) => {
    const id = data.id || null;
    onSubmit(data, id);
    // Reset form & preview
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Skill Name */}
        <div>
          <label className="block mb-sm font-medium">Skill Name</label>
          <input
            type="text"
            {...register('name', { required: 'Skill name is required' })}
            className={`w-full border ${
              errors.name ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter skill name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Active Status */}
        <div>
          <label className="block mb-sm font-medium">Active Status</label>
          <select
            {...register('is_active', { required: 'Select active status' })}
            className={`w-full border ${
              errors.is_active ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value="">Select Status</option>
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
            text={`Cancel`}
            type="button"
          />
          <PrimaryButton
            type="submit"
            text={`${title.includes('Edit') ? 'Update' : 'Add'} Skill`}
          ></PrimaryButton>
        </div>
      </div>
    </form>
  );
}
