import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PreNextButtonSection from '../PreNextButtonSection';

export default function CoursePricingForm({
  title = 'Course Pricing',
  defaultValues = {},
  onsubmit,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const EMPTY_FORM_STATE = {
    base_price: '',
    currency: 'BDT',
    is_free: 'false', // Matches your string logic
    is_active: 'true',
    discount_percentage: '',
    discount_amount: '',
    discount_start_date: '',
    discount_end_date: '',
    installment_available: 'false',
    installment_count: '',
  };

  useEffect(() => {
    // Set default values when they change

    if (Object.keys(defaultValues).length === 0) {
      reset(EMPTY_FORM_STATE);
    }

    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formattedValues = {
        ...defaultValues,
        // Boolean values (show_in_megamenu, show_in_home_tab, is_active) to string for <select>
        is_free: defaultValues.is_free ? 'true' : 'false',
        is_active: defaultValues.is_active ? 'true' : 'false',
        installment_available: defaultValues.installment_available ? 'true' : 'false',
        discount_start_date: defaultValues?.discount_start_date
          ? new Date(defaultValues.discount_start_date).toISOString().slice(0, 16)
          : '',
        discount_end_date: defaultValues?.discount_end_date
          ? new Date(defaultValues.discount_end_date).toISOString().slice(0, 16)
          : '',
      };
      reset(formattedValues);
    }
  }, [defaultValues, reset]);

  const isFree = watch('is_free') === 'true';
  const basePrice = parseFloat(watch('base_price')) || 0;
  const discountPercent = parseFloat(watch('discount_percentage')) || 0;
  const discountAmount = parseFloat(watch('discount_amount')) || 0;
  const installmentAvailable = watch('installment_available') === 'true';

  const handelSubmit = (data) => {
    if (data?.discount_start_date === '') {
      delete data.discount_start_date;
    }

    if (data?.discount_end_date === '') {
      delete data.discount_end_date;
    }
    if (data?.discount_percentage === '') {
      delete data.discount_percentage;
    }

    if (data?.discount_amount === '') {
      delete data.discount_amount;
    }

    if (onsubmit) {
      onsubmit(data);
    }
  };

  useEffect(() => {
    if (discountPercent > 0) {
      setValue('discount_amount', 0);
    }

    if (discountAmount > 0) {
      setValue('discount_percentage', 0);
    }

    if (installmentAvailable === false) {
      setValue('installment_count', 0);
    }
  }, [discountAmount, discountPercent, installmentAvailable, setValue]);

  return (
    <form
      onSubmit={handleSubmit(handelSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Base Price */}
        <div>
          <label className="block mb-sm font-medium">Base Price</label>
          <input
            disabled={isFree}
            type="number"
            step="0.01"
            {...register('base_price', {
              required: !isFree && 'Base price is required',
              min: { value: 0, message: 'Price cannot be negative' },
            })}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            placeholder="Enter base price"
            onWheel={(e) => e.target.blur()}
          />
          {errors.base_price && <p className="text-red-500 text-sm">{errors.base_price.message}</p>}
        </div>

        {/* Currency */}
        <div>
          <label className="block mb-sm font-medium">Currency</label>
          <select
            {...register('currency', { required: 'Currency is required' })}
            className={`w-full border ${
              errors.currency ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md`}
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
          </select>
          {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
        </div>

        {/* Is Free */}
        <div>
          <label className="block mb-sm font-medium">Is Free?</label>
          <select
            {...register('is_free')}
            className="w-full border border-black/10 px-md py-sm rounded-md"
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
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

        {/* Discount Percentage */}
        <div>
          <label className="block mb-sm font-medium">Discount Percentage (%)</label>
          <input
            type="number"
            step="0.01"
            {...register('discount_percentage', {
              min: { value: 0, message: 'Min 0%' },
              max: { value: 100, message: 'Cannot exceed 100%' },
            })}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            disabled={isFree || discountAmount > 0}
            onWheel={(e) => e.target.blur()}
          />
          {errors.discount_percentage && (
            <p className="text-red-500 text-sm">{errors.discount_percentage.message}</p>
          )}
        </div>

        {/* Discount Amount */}
        <div>
          <label className="block mb-sm font-medium">Flat Discount </label>
          <input
            type="number"
            step="0.01"
            {...register('discount_amount', {
              min: { value: 0, message: 'Cannot be negative' },
              validate: (value) => {
                const numberValue = Number(value);
                if (numberValue > Number(basePrice)) {
                  return 'Discount cannot exceed base price';
                }
                return true;
              },
            })}
            onWheel={(e) => e.target.blur()}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            disabled={isFree || discountPercent > 0}
          />
          {errors.discount_amount && (
            <p className="text-red-500 text-sm">{errors.discount_amount.message}</p>
          )}
        </div>

        {/* Dates */}
        <div>
          <label className="block mb-sm font-medium">Discount Start Date</label>
          <input
            type="datetime-local"
            {...register('discount_start_date')}
            className="w-full border border-black/10 px-md py-sm rounded-md"
          />
        </div>

        <div>
          <label className="block mb-sm font-medium">Discount End Date</label>
          <input
            type="datetime-local"
            {...register('discount_end_date', {
              validate: (val) => {
                const start = watch('discount_start_date');
                if (start && val && new Date(val) < new Date(start)) {
                  return 'End date cannot be before start date';
                }
                return true;
              },
            })}
            className="w-full border border-black/10 px-md py-sm rounded-md"
          />
          {errors.discount_end_date && (
            <p className="text-red-500 text-sm">{errors.discount_end_date.message}</p>
          )}
        </div>

        {/* Installment */}
        <div>
          <label className="block mb-sm font-medium">Installment Available?</label>
          <select
            {...register('installment_available')}
            className="w-full border border-black/10 px-md py-sm rounded-md"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div>
          <label className="block mb-sm font-medium">Installment Count</label>
          <input
            type="number"
            {...register('installment_count', {
              required: installmentAvailable && 'Count is required for installments',
              min: {
                value: installmentAvailable ? 2 : 0,
                message: 'At least 2 installments required',
              },
            })}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            placeholder="e.g. 3"
            disabled={watch('installment_available') === 'false'}
            onWheel={(e) => e.target.blur()}
          />
          {errors.installment_count && (
            <p className="text-red-500 text-sm">{errors.installment_count.message}</p>
          )}
        </div>
        {/* button */}
        <PreNextButtonSection className="col-span-2" />
      </div>
    </form>
  );
}
