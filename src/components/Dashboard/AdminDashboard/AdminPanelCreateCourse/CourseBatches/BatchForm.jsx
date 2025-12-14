import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PrimaryButton from '../../../../common/PrimaryButton';
import SecondaryButton from '../../../../common/SecondaryButton';

const defaultBatchSchema = {
  batch_name: '',
  batch_number: '',
  start_date: '',
  end_date: '',
  enrollment_start_date: '',
  enrollment_end_date: '',
  is_enrollment_open: true,
  max_seats: 50,
  available_seats: 50,
  status: 'upcoming',
};

export default function BatchForm({
  loading = false,
  onSubmit,
  onCancel,
  defaultValues = defaultBatchSchema,
  isEdit = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm({ defaultValues });

  const maxSeats = watch('max_seats');

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset({
        ...defaultValues,
        // Map API 'max_students' to Form 'max_seats'
        max_seats: defaultValues.max_students || defaultValues.max_seats,
        // Ensure is_enrollment_open is boolean, handling potentially different API response types
        is_enrollment_open:
          String(defaultValues.is_enrollment_open) === 'true' ||
          defaultValues.is_enrollment_open === true ||
          defaultValues.is_enrollment_open === 1,
      });
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    // Ensure available_seats doesn't exceed max_seats
    const submitData = {
      ...data,
      // Map Form 'max_seats' back to API 'max_students'
      max_students: parseInt(data.max_seats, 10),
      max_seats: parseInt(data.max_seats, 10), // Keep both just in case
      available_seats: parseInt(data.available_seats, 10),
      batch_number: parseInt(data.batch_number, 10),
    };
    onSubmit(submitData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">
        {isEdit ? 'Edit Batch' : 'Create New Batch'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Batch Name */}
        <div>
          <label className="block mb-sm font-medium">Batch Name *</label>
          <input
            type="text"
            {...register('batch_name', { required: 'Batch name is required' })}
            className={`w-full border ${
              errors.batch_name ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="e.g., Batch 15"
          />
          {errors.batch_name && (
            <p className="text-red-500 text-sm mt-1">{errors.batch_name.message}</p>
          )}
        </div>

        {/* Batch Number */}
        <div>
          <label className="block mb-sm font-medium">Batch Number *</label>
          <input
            type="number"
            {...register('batch_number', {
              required: 'Batch number is required',
              min: { value: 1, message: 'Batch number must be at least 1' },
            })}
            className={`w-full border ${
              errors.batch_number ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="15"
          />
          {errors.batch_number && (
            <p className="text-red-500 text-sm mt-1">{errors.batch_number.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-sm font-medium">Start Date *</label>
          <input
            type="date"
            {...register('start_date', { required: 'Start date is required' })}
            className={`w-full border ${
              errors.start_date ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-sm font-medium">End Date *</label>
          <input
            type="date"
            {...register('end_date', {
              required: 'End date is required',
              validate: (value) => {
                const startDate = watch('start_date');
                if (startDate && value && new Date(value) <= new Date(startDate)) {
                  return 'End date must be after start date';
                }
                return true;
              },
            })}
            className={`w-full border ${
              errors.end_date ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          />
          {errors.end_date && (
            <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>
          )}
        </div>

        {/* Enrollment Start Date */}
        <div>
          <label className="block mb-sm font-medium">Enrollment Start Date *</label>
          <input
            type="date"
            {...register('enrollment_start_date', {
              required: 'Enrollment start date is required',
            })}
            className={`w-full border ${
              errors.enrollment_start_date ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          />
          {errors.enrollment_start_date && (
            <p className="text-red-500 text-sm mt-1">{errors.enrollment_start_date.message}</p>
          )}
        </div>

        {/* Enrollment End Date */}
        <div>
          <label className="block mb-sm font-medium">Enrollment End Date *</label>
          <input
            type="date"
            {...register('enrollment_end_date', {
              required: 'Enrollment end date is required',
              validate: (value) => {
                const batchStartDate = watch('start_date');
                const enrollmentStartDate = watch('enrollment_start_date');

                if (batchStartDate && value && new Date(value) >= new Date(batchStartDate)) {
                  return 'Enrollment must end before batch starts';
                }
                if (
                  enrollmentStartDate &&
                  value &&
                  new Date(value) <= new Date(enrollmentStartDate)
                ) {
                  return 'Enrollment end date must be after enrollment start date';
                }
                return true;
              },
            })}
            className={`w-full border ${
              errors.enrollment_end_date ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          />
          {errors.enrollment_end_date && (
            <p className="text-red-500 text-sm mt-1">{errors.enrollment_end_date.message}</p>
          )}
        </div>

        {/* Max Seats */}
        <div>
          <label className="block mb-sm font-medium">Max Seats *</label>
          <input
            type="number"
            {...register('max_seats', {
              required: 'Max seats is required',
              min: { value: 1, message: 'Must have at least 1 seat' },
            })}
            className={`w-full border ${
              errors.max_seats ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="50"
          />
          {errors.max_seats && (
            <p className="text-red-500 text-sm mt-1">{errors.max_seats.message}</p>
          )}
        </div>

        {/* Available Seats */}
        <div>
          <label className="block mb-sm font-medium">Available Seats *</label>
          <input
            type="number"
            {...register('available_seats', {
              required: 'Available seats is required',
              min: { value: 0, message: 'Cannot be negative' },
              validate: (value) => {
                if (parseInt(value) > parseInt(maxSeats)) {
                  return 'Available seats cannot exceed max seats';
                }
                return true;
              },
            })}
            className={`w-full border ${
              errors.available_seats ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="50"
          />
          {errors.available_seats && (
            <p className="text-red-500 text-sm mt-1">{errors.available_seats.message}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-md pt-md border-t border-black/10">
        <SecondaryButton
          type="button"
          onClick={onCancel}
          text="Cancel"
          minWidth="fit"
          className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
        />
        <PrimaryButton
          type="submit"
          minWidth="fit"
          disabled={loading}
          text={
            loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                {isEdit ? 'Updating...' : 'Creating...'}
              </span>
            ) : isEdit ? (
              'Update Batch'
            ) : (
              'Create Batch'
            )
          }
        />
      </div>
    </form>
  );
}
