import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { useEffect, useState, useMemo } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Trash2, Plus, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '../../../redux/skill/skillAction'; // Assumed path
import { CKEDITOR_CONFIG } from '../../../utils/ckeditor';

// -----------------

export default function UpdateProfile({ onSubmit, onCancel, defaultValues = {} }) {
  // Format defaultValues *before* useForm
  const formattedDefaultValues = useMemo(() => {
    if (!defaultValues || Object.keys(defaultValues).length === 0) {
      return { profile: { skills: [] } };
    }
    return {
      ...defaultValues,
      profile: {
        ...defaultValues.profile,
        // Extract the 'name' from each skill object, or use the value if it's already a string
        skills: (defaultValues.profile?.skills || []).map((skill) =>
          typeof skill === 'object' && skill.name ? skill.name : skill
        ),
      },
    };
  }, [defaultValues]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: formattedDefaultValues });

  const dispatch = useDispatch();
  // Get skills from Redux store
  const { skills: dbSkills } = useSelector((state) => state.skill);
  const { loading } = useSelector((state) => state.auth);

  // --- Skills Array Logic ---
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'profile.skills',
  });

  // This is an array of strings, e.g., ['React', 'Node.js']
  const currentSkills = watch('profile.skills') || [];

  // --- FIXED: Use dbSkills (array of objects) ---
  const availableSkillsList = (dbSkills || []) // Ensure dbSkills is an array
    .filter((skill) => skill.is_active) // 1. Only show active skills
    .filter((skill) => !currentSkills.includes(skill.name)); // 2. Filter out already selected skills by name

  // State for image preview
  const [preview, setPreview] = useState(defaultValues.profile?.image || null);

  // Update form when defaultValues (from parent) change
  useEffect(() => {
    reset(formattedDefaultValues);
    setPreview(defaultValues.profile?.image || null);
  }, [defaultValues, reset, formattedDefaultValues]);

  //  skill fetch
  useEffect(() => {
    dispatch(
      fetchSkills({
        page: 1,
        page_size: 100,
      })
    );
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

  // --- Form Submit Handler (Unchanged) ---
  // This logic is correct. `data.profile.skills` will be a string array.
  const handleFormSubmit = (data) => {
    const isFileSelected = data.profile?.image && data.profile.image[0] instanceof File;

    if (isFileSelected) {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('profile.title', data.profile.title);
      formData.append('profile.bio', data.profile.bio);
      formData.append('profile.education', data.profile.education);

      data.profile.skills.forEach((skill, index) => {
        formData.append(`profile.skills[${index}]`, skill);
      });
      formData.append('profile.image', data.profile.image[0]);
      onSubmit(formData);
    } else {
      const jsonData = { ...data };
      if (jsonData.profile) {
        delete jsonData.profile.image;
      }
      onSubmit(jsonData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">
        Update Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* --- All text inputs are unchanged --- */}

        {/* First Name */}
        <div>
          <label className="block mb-sm font-medium">First Name</label>
          <input
            type="text"
            {...register('first_name', { required: 'First Name is required' })}
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

        {/* Title */}
        <div>
          <label className="block mb-sm font-medium">Title</label>
          <input
            type="text"
            {...register('profile.title')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
            placeholder="Enter job title (e.g., Web Developer)"
          />
          {errors.profile?.title && (
            <p className="text-red-500 text-sm mt-1">{errors.profile.title.message}</p>
          )}
        </div>

        {/* Education */}
        <div>
          <label className="block mb-sm font-medium">Education</label>
          <input
            type="text"
            {...register('profile.education')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
            placeholder="Enter education (e.g., B.Sc in CSE)"
          />
          {errors.profile?.education && (
            <p className="text-red-500 text-sm mt-1">{errors.profile.education.message}</p>
          )}
        </div>

        {/* Bio (CKEditor) */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Biography</label>
          <Controller
            name="profile.bio"
            control={control}
            render={({ field }) => (
              <div className="border border-black/10 rounded-md">
                <CKEditor
                  editor={ClassicEditor}
                  config={CKEDITOR_CONFIG}
                  data={field.value || ''}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    field.onChange(data);
                  }}
                  onBlur={field.onBlur}
                />
              </div>
            )}
          />
        </div>

        {/* --- Skills --- */}
        <div className="md:col-span-2 space-y-4">
          <label className="block mb-sm font-medium">Skills</label>

          {/* Selected Skills */}
          <div className="p-3 border border-gray-200 rounded-md min-h-[60px] bg-gray-50">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Selected</h4>
            <div className="flex flex-wrap gap-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium rounded-full px-3 py-1"
                >
                  <span>{currentSkills[index]}</span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-blue-200 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                  <input
                    type="hidden"
                    {...register(`profile.skills[${index}]`)}
                    defaultValue={currentSkills[index]}
                  />
                </div>
              ))}
              {fields.length === 0 && <p className="text-sm text-gray-400">No skills selected.</p>}
            </div>
          </div>

          {/* Available Skills --- FIXED */}
          <div className="p-3 border border-gray-200 rounded-md">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Available to Add</h4>
            <div className="flex flex-wrap gap-2">
              {availableSkillsList.map(
                (
                  skillObj // 'skillObj' is now {id, name, ...}
                ) => (
                  <button
                    type="button"
                    key={skillObj.id} // Use the unique ID from the DB
                    onClick={() => append(skillObj.name)} // Append the name (string)
                    className="flex items-center gap-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full px-3 py-1 hover:bg-gray-300"
                  >
                    <Plus size={14} />
                    <span>{skillObj.name}</span> {/* Display the name */}
                  </button>
                )
              )}
              {availableSkillsList.length === 0 && dbSkills.length > 0 && (
                <p className="text-sm text-gray-400">All available skills added.</p>
              )}
              {(!dbSkills || dbSkills.length === 0) && (
                <p className="text-sm text-gray-400">Loading skills...</p>
              )}
            </div>
          </div>
        </div>
        {/* -------------------- */}

        {/* Image (File Upload) */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('profile.image')}
            onChange={handleImageChange}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
          />
          {preview && (
            <div className="relative w-32 h-32 mt-2">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-md border border-black/Hence"
              />
              <button
                type="button"
                onClick={() => {
                  reset({ ...watch(), profile: { ...watch('profile'), image: null } });
                  setPreview(null);
                }}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700"
              >
                <Trash2 size={14} />
              </button>
            </div>
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
          <PrimaryButton type="submit" text={`${loading ? 'Updating ... ' : 'Update Profile'}`} />
        </div>
      </div>
    </form>
  );
}
