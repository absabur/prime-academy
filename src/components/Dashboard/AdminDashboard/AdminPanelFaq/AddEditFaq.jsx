import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEDITOR_CONFIG } from '@/utils/ckeditor';

export default function AddEditFaq({
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
    control,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    const json_data = { ...data, order: category.faqs.length, is_active: true };
    onSubmit(category, json_data, defaultValues.id, 'edit');
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 gap-md">
        {/* Question */}
        <div>
          <label className="block mb-sm font-medium">Question</label>
          <input
            type="text"
            {...register('question', { required: 'Question is required' })}
            className={`w-full border ${
              errors.question ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter Question"
          />
          {errors.question && (
            <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>
          )}
        </div>

        {/* ✅ CKEditor */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Answer</label>
          <Controller
            name="answer"
            control={control}
            rules={{ required: 'Answer is required' }}
            render={({ field: { onChange, value } }) => (
              <CKEditor
                editor={ClassicEditor}
                config={CKEDITOR_CONFIG}
                data={value || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  onChange(data);
                }}
              />
            )}
          />
          {errors.answer && <p className="text-red-500 text-sm mt-1">{errors?.answer?.message}</p>}
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
            text={title.includes('Edit') ? 'Update FAQ' : 'Add FAQ'}
          />
        </div>
      </div>
    </form>
  );
}
