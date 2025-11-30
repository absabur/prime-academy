import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { capitalizeFirst } from '@/utils/capitalizeFirst';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import SortableSlideItem from './SortableSlideItem';

export default function EditHeroForm({
  onSubmit,
  onCancel,
  defaultValues = {},
  title = `Update ${capitalizeFirst(defaultValues.page_name)} Hero`,
}) {
  const {
    register,
    control, // <-- Need 'control' for useFieldArray
    handleSubmit,
    formState: { errors },
    reset,
    watch, // <-- Watch changes for slides
  } = useForm({
    defaultValues,
  });

  // --- useFieldArray Hook ---
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'slides',
  });
  // --------------------------

  const [preview, setPreview] = useState(defaultValues.banner_image || null);

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      const formattedValues = {
        ...defaultValues,
        is_active: defaultValues.is_active ? 'true' : 'false',
        slides: defaultValues.slides || [], // Ensure slides is an array
      };
      reset(formattedValues);
      setPreview(defaultValues.banner_image || null);
    }
  }, [defaultValues, reset]);

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // --- Dnd-kit Sensor setup ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // --- Dnd-kit Drag End Handler ---
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex); // This function updates react-hook-form state
    }
  }

  // --- UPDATED Form Submit Handler ---
  const handleFormSubmit = (data) => {
    const id = data.id || null;
    const bannerFile = data.banner_image && data.banner_image[0];
    const isFileSelected = !!(bannerFile && (bannerFile instanceof File || bannerFile.name));

    // --- Process slides: update 'order' based on final array index ---
    const processedSlides = data.slides.map((slide, index) => ({
      ...slide,
      order: index, // This ensures the order is saved correctly
    }));

    if (isFileSelected) {
      const formData = new FormData();

      // Append all fields EXCEPT image and slides
      for (const [key, value] of Object.entries(data)) {
        if (key !== 'banner_image' && key !== 'slides' && key !== 'page_name') {
          formData.append(key, value);
        }
      }

      // Append the new image file (include filename for Safari compatibility)
      const file = data.banner_image[0];
      if (file && (file instanceof File || file.name)) {
        formData.append('banner_image', file, file.name || 'banner.jpg');
      }

      // Append slides as a JSON string
      // The backend will need to JSON.parse(req.body.slides)
      formData.append('slides', JSON.stringify(processedSlides));

      onSubmit(formData, id);
    } else {
      // Send as JSON
      const jsonData = { ...data };
      jsonData.slides = processedSlides; // Use the processed slides

      // Don't send the old image URL string as a "file"
      delete jsonData.banner_image;
      delete jsonData.page_name;

      onSubmit(jsonData, id);
    }

    // Note: You might not want to reset() here if the submit fails
    reset();
    // setPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Title */}
        <div>
          <label className="block mb-sm font-medium">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows="4"
            className={`w-full border ${
              errors.description ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Enter short description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Button 1 */}
        <div>
          <label className="block mb-sm font-medium">Button 1 Text</label>
          <input
            type="text"
            {...register('button1_text')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
          />
        </div>
        <div>
          <label className="block mb-sm font-medium">Button 1 URL</label>
          <input
            type="text"
            {...register('button1_url')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
            placeholder="/courses"
          />
        </div>

        {/* Button 2 */}
        <div>
          <label className="block mb-sm font-medium">Button 2 Text</label>
          <input
            type="text"
            {...register('button2_text')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
          />
        </div>
        <div>
          <label className="block mb-sm font-medium">Button 2 URL</label>
          <input
            type="text"
            {...register('button2_url')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:shadow-lg"
            placeholder="/faqs"
          />
        </div>

        {/* --- Slides Section --- */}
        {defaultValues.page_name == import.meta.env.VITE_HOME_HERO_PAGE_NAME && (
          <div className="md:col-span-2 space-y-3">
            <label className="block font-medium">Slide Texts</label>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {fields.map((field, index) => {
                    // Check for errors on this specific slide item
                    const fieldError = errors.slides?.[index]?.text;
                    return (
                      <div key={field.id}>
                        <SortableSlideItem
                          id={field.id}
                          field={field}
                          index={index}
                          register={register}
                          remove={remove}
                        />
                        {fieldError && (
                          <p className="text-red-500 text-sm mt-1">{fieldError.message}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>

            <button
              type="button"
              onClick={() => append({ text: '', order: fields.length })} // Add new slide
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <Plus size={16} />
              Add Slide
            </button>
          </div>
        )}
        {/* ----------------------- */}

        {/* Banner Image */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Banner Image</label>
          <input
            type="file"
            accept="image/*,image/heic,image/heif"
            {...register('banner_image')}
            onChange={handleImageChange}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
          />
          {preview && (
            <img
              src={preview}
              className="w-44 h-28 object-cover rounded-md mt-sm border"
              alt="Preview"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <SecondaryButton
            className="border-primary text-primary hover:text-white"
            onClick={onCancel}
            text="Cancel"
          />
          <PrimaryButton type="submit" text={`${title}`} />
        </div>
      </div>
    </form>
  );
}
