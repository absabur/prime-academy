import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SwalUtils from '../../../../utils/sweetAlert';
import PreNextButtonSection from './PreNextButtonSection';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, updateFormData } from '../../../../redux/courseWizard/courseWizardSlice';

export default function CoursePricingForm({ title = 'Course Pricing' }) {
  const { pricing } = useSelector((state) => state.courseWizard.formData);

  const defaultValues = {
    base_price: pricing?.base_price || '',
    is_free: pricing?.is_free || false,
    is_active: pricing?.is_active || false,
    installment_available: pricing?.installment_available || false,
    currency: pricing?.currency || 'BDT',
    discount_percentage: pricing?.discount_percentage || '',
    discount_amount: pricing?.discount_amount || '',
    discount_start_date: pricing?.discount_start_date
      ? new Date(pricing.discount_start_date).toISOString().slice(0, 16)
      : '',
    discount_end_date: pricing?.discount_end_date
      ? new Date(pricing.discount_end_date).toISOString().slice(0, 16)
      : '',
    installment_count: pricing?.installment_count || '',
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();

  const isFree = watch('is_free') === 'true';
  const basePrice = parseFloat(watch('base_price')) || 0;
  const discountPercent = parseFloat(watch('discount_percentage')) || 0;
  const discountAmount = parseFloat(watch('discount_amount')) || 0;

  const onSubmit = (data) => {
    dispatch(updateFormData({ key: 'pricing', data }));
    dispatch(nextStep());
  };

  useEffect(() => {
    if (discountPercent > 100) {
      SwalUtils.error('Discount percentage cannot exceed 100%.');
      setValue('discount_percentage', 100);
    }

    if (discountPercent > 1) {
      setValue('discount_amount', 0);
    }

    if (discountAmount > basePrice) {
      SwalUtils.error('Discount amount cannot exceed base price.');
      setValue('discount_amount', basePrice);
    }

    if (discountAmount > 1) {
      setValue('discount_percentage', 0);
    }
  }, [isFree, basePrice, setValue, discountPercent, discountAmount]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Base Price */}
        <div>
          <label className="block mb-sm font-medium">Base Price</label>
          <input
            type="number"
            step="0.01"
            {...register('base_price', { required: 'Base price is required' })}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            placeholder="Enter base price"
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
            {...register('discount_percentage')}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            disabled={isFree || discountAmount > 0}
          />
        </div>

        {/* Discount Amount */}
        <div>
          <label className="block mb-sm font-medium">Flat Discount </label>
          <input
            type="number"
            step="0.01"
            {...register('discount_amount')}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            disabled={isFree || discountPercent > 0}
          />
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
            {...register('discount_end_date')}
            className="w-full border border-black/10 px-md py-sm rounded-md"
          />
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
            {...register('installment_count')}
            className="w-full border border-black/10 px-md py-sm rounded-md"
            placeholder="e.g. 3"
            disabled={watch('installment_available') === 'false'}
          />
        </div>

        {/* button */}
        <PreNextButtonSection className="col-span-2" />
      </div>
    </form>
  );
}
