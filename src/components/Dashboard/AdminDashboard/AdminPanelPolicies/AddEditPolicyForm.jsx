import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CKEDITOR from '../../common/CKEDITOR';

export default function AddEditPolicyForm({
  title = 'Add New Policy',
  onSubmit,
  onCancel,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    const id = data.id || null;
    const json_data = data;
    if (defaultValues.page_name) {
      delete json_data.page_name;
    }
    onSubmit(json_data, id);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Policy Name */}
        <div>
          <label className="block mb-sm font-medium">Page Name</label>
          <select
            disabled={title.includes('Edit')}
            className={`w-full border border-black/15 px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            name="page_name"
            id="page_name"
            {...register('page_name', { required: 'Policy Title is required' })}
          >
            <option value="">Select Page Name</option>

            <option value="privacy">Privacy Policy</option>
            <option value="terms">Terms Policy</option>
            <option value="refund">Refund Policy</option>
            <option value="cookie">Cookie Policy</option>
            <option value="data">Data Policy</option>
            <option value="disclaimer">Disclaimer Policy</option>
            <option value="instructor">Instructor Policy</option>
            <option value="student">Student Policy</option>
            <option value="copyright">Copyright Policy</option>
            <option value="accessibility">Accessibility Policy</option>
            <option value="payment">Payment Policy</option>
          </select>
          {errors.page_name && (
            <p className="text-red-500 text-sm mt-1">{errors.page_name.message}</p>
          )}
        </div>

        {/* Policy Title */}
        <div>
          <label className="block mb-sm font-medium">Policy Title</label>
          <input
            type="text"
            {...register('title', { required: 'Policy Title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter policy Title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* ✅ CKEditor */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Content</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Policy Content is required' }}
            render={({ field: { onChange, value } }) => (
              <CKEDITOR
                value={value || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  onChange(data);
                }}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors?.content?.message}</p>
          )}
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
            text={title.includes('Edit') ? 'Update Policy' : 'Add Policy'}
          />
        </div>
      </div>
    </form>
  );
}
