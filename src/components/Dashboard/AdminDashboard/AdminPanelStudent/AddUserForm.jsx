import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function AddUserForm({
  title = 'Add New Student',
  onSubmit,
  onCancel,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const password = watch('password');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* First Name */}
        <div>
          <label className="block mb-sm font-medium">First Name</label>
          <input
            type="text"
            {...register('first_name', { required: 'First name is required' })}
            className={`w-full border ${
              errors.first_name ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter first name"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-sm font-medium">Last Name</label>
          <input
            type="text"
            {...register('last_name', { required: 'Last name is required' })}
            className={`w-full border ${
              errors.last_name ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter last name"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            className={`w-full border ${
              errors.email ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-sm font-medium">Phone</label>
          <input
            type="text"
            {...register('phone', { required: 'Phone number is required' })}
            className={`w-full border ${
              errors.phone ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className={`w-full border ${
              errors.password ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register('password2', {
              required: 'Confirm password is required',
              validate: (value) => value === password || 'Passwords do not match',
            })}
            className={`w-full border ${
              errors.password2 ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Confirm password"
          />
          {errors.password2 && (
            <p className="text-red-500 text-sm mt-1">{errors.password2.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <SecondaryButton
            className="text-black  border-primary hover:bg-secondary hover:text-white hover:border-secondary"
            onClick={onCancel}
            type="button"
            text={`Cancel`}
          />
          <PrimaryButton
            type="submit"
            text={`${title.includes('Edit') ? 'Update' : 'Add'} Student`}
            minWidth="fit"
          />
        </div>
      </div>
    </form>
  );
}
