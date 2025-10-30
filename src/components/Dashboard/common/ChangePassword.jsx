import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { useForm } from 'react-hook-form';
import PasswordInput from './PasswordInput';
import { useSelector } from 'react-redux';

export default function ChangePassword({ title = 'Change Your Password', onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch, // 2. Add 'watch' for password confirmation
  } = useForm();

  const { loading } = useSelector((state) => state.auth);

  // 3. Watch the value of 'new_password'
  const newPassword = watch('new_password');

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Old Password */}
        <PasswordInput
          label="Old Password"
          name="old_password"
          register={register}
          validation={{ required: 'Old Password is required' }}
          error={errors.old_password}
          placeholder="Enter Old Password"
        />

        {/* New Password */}
        <PasswordInput
          label="New Password"
          name="new_password"
          register={register}
          validation={{ required: 'New Password is required' }}
          error={errors.new_password}
          placeholder="Enter New Password"
        />

        {/* Confirm New Password */}
        <PasswordInput
          label="Confirm New Password"
          name="new_password2"
          register={register}
          validation={{
            required: 'Please confirm your new password',
            validate: (value) => value === newPassword || 'The passwords do not match',
          }}
          error={errors.new_password2}
          placeholder="Enter Confirm New Password"
        />

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <SecondaryButton
            className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
            onClick={onCancel}
            text={`Cancel`}
            type="button"
          />
          <PrimaryButton type="submit" text={`${loading ? 'Updating ... ' : 'Update Password'}`} />
        </div>
      </div>
    </form>
  );
}
