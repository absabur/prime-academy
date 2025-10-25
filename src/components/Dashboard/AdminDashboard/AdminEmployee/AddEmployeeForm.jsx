import { createDepartment, fetchDepartments } from '@/redux/department/departmentAction';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { data } from 'react-router-dom';

export default function AddEmployeeForm({
  title = 'Add New Employee',
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
  // state
  const [preview, setPreview] = useState(defaultValues.employee_image || null);
  const [departmentDropDown, setdepartmentDropDown] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const { departments } = useSelector((state) => state.department);

  // 🧠 যখন defaultValues পরিবর্তন হবে (Edit এর সময়), তখন ফর্ম আপডেট করো
  useEffect(() => {
    reset(defaultValues);
    setPreview(defaultValues.employee_image || null);
  }, [defaultValues, reset]);

  // get department
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartments());
  }, []);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // 🧾 Handle submit with FormData (for file upload)
  const handleFormSubmit = (data) => {
    const id = data.id || null;

    // 🔹 check if user selected a new file
    const isFileSelected = data.employee_image && data.employee_image[0] instanceof File;

    if (isFileSelected) {
      // FormData for new file
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        if (key !== 'employee_image') formData.append(key, value);
      }

      formData.append('employee_image', data.employee_image[0]);
      onSubmit(formData, id);
    } else {
      // JSON data for no new image
      const jsonData = { ...data };
      delete jsonData.employee_image; // remove employee_image
      onSubmit(jsonData, id);
    }

    // Reset form & preview
    reset();
    setPreview(null);
  };

  // Add New Department

  const handleAddDepartment = () => {
    if (!departmentName) return SwalUtils.error('Enter Department Name');
    dispatch(createDepartment({ name: departmentName }));
    setdepartmentDropDown(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Employee ID */}
        <div>
          <label className="block mb-sm font-medium">Employee ID</label>
          <input
            type="text"
            {...register('employee_id', { required: 'Employee ID is required' })}
            className={`w-full border ${
              errors.employee_id ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter employee ID"
          />
          {errors.employee_id && (
            <p className="text-red-500 text-sm mt-1">{errors.employee_id.message}</p>
          )}
        </div>

        {/* Employee Name */}
        <div>
          <label className="block mb-sm font-medium">Employee Name</label>
          <input
            type="text"
            {...register('employee_name', { required: 'Employee name is required' })}
            className={`w-full border ${
              errors.employee_name ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter employee name"
          />
          {errors.employee_name && (
            <p className="text-red-500 text-sm mt-1">{errors.employee_name.message}</p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block mb-sm font-medium">Job Title</label>
          <input
            type="text"
            {...register('job_title', { required: 'Job title is required' })}
            className={`w-full border ${
              errors.job_title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter job title"
          />
          {errors.job_title && (
            <p className="text-red-500 text-sm mt-1">{errors.job_title.message}</p>
          )}
        </div>

        {/* Select Department */}
        <div className=" ">
          <label className="block mb-sm font-medium">Department Name</label>
          <div className="flex justify-between items-center relative">
            <select
              name=""
              id=""
              className={`w-[90%] border ${
                errors.department ? 'border-red-500' : 'border-black/10'
              } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
              {...register('department.id', { required: 'Department name is required' })}
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setdepartmentDropDown(true)}
              type="button"
              className="self-end text-4xl mb-xs "
              title="Add Department"
            >
              <FaPlus />
            </button>
            {/* Department small form */}
            {departmentDropDown && (
              <div className="absolute right-0 bg-white shadow-xl rounded-md p-md top-10 z-50 border space-y-sm border-black/10 w-56">
                <input
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  type="text"
                  placeholder="Department name"
                  className="w-full border border-black/20 px-sm py-xs rounded-md focus:outline-none"
                />
                <div className="flex justify-end gap-xs">
                  <button
                    type="button"
                    onClick={() => setdepartmentDropDown(false)}
                    className="text-sm px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddDepartment}
                    className="text-sm px-2 py-1 bg-primary text-white rounded-md hover:bg-primary-dark"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
          )}
        </div>

        {/* Employee Image (File Upload) */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Employee Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('employee_image')}
            onChange={handleImageChange}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mt-2 border border-black/10"
            />
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-sm font-medium">Phone Number</label>
          <input
            type="text"
            {...register('phone_number', { required: 'Phone number is required' })}
            className={`w-full border ${
              errors.phone_number ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter phone number"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>
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

        {/* Joining Date */}
        <div>
          <label className="block mb-sm font-medium">Joining Date</label>
          <input
            type="date"
            {...register('joining_date', { required: 'Joining date is required' })}
            className={`w-full border ${
              errors.joining_date ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          />
          {errors.joining_date && (
            <p className="text-red-500 text-sm mt-1">{errors.joining_date.message}</p>
          )}
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
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {errors.is_active && (
            <p className="text-red-500 text-sm mt-1">{errors.is_active.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <button
            type="button"
            onClick={onCancel}
            className="px-md py-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-md py-sm bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {title.includes('Edit') ? 'Update' : 'Add'} Employee
          </button>
        </div>
      </div>
    </form>
  );
}
