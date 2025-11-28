import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UploadCloud, FileVideo, Image as ImageIcon } from 'lucide-react';
// Adjust these import paths based on your file structure
import SecondaryButton from '../../../../common/SecondaryButton';
import PrimaryButton from '../../../../common/PrimaryButton';
import CKEDITOR from '../../../common/CKEDITOR';

const defaultValuesSchema = {
  media_type: 'image', // 'image' or 'video'
  title: '',
  description: '',
  image: '', // Main image file (if media_type is image)
  video_provider: 'youtube', // 'youtube', 'vimeo', etc.
  video_url: '',
  video_thumbnail: '', // Thumbnail file (if media_type is video)
  button_text: '',
  button_link: '',
  order: 0,
  is_active: true,
};

export default function TabContentAddEditForm({
  formTitle = 'Add Tab Content',
  onSubmit,
  onCancel,
  tab_id, // The UUID for the tab
  defaultValues = defaultValuesSchema,
}) {
  const [imagePreview, setImagePreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  // Watchers
  const watchedMediaType = watch('media_type');
  const watchedImage = watch('image');
  const watchedThumbnail = watch('video_thumbnail');

  // 🧠 1. Handle Resetting Form & Previews (Edit Mode)
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);

      // Setup Image Preview
      if (typeof defaultValues.image === 'string' && defaultValues.image) {
        setImagePreview(`https://prime-api.enghasan.com${defaultValues.image}`);
      } else {
        setImagePreview(null);
      }

      // Setup Video Thumbnail Preview
      if (typeof defaultValues.video_thumbnail === 'string' && defaultValues.video_thumbnail) {
        setThumbnailPreview(`https://prime-api.enghasan.com${defaultValues.video_thumbnail}`);
      } else {
        setThumbnailPreview(null);
      }
    }
  }, [defaultValues, reset]);

  // 🧠 2. Handle New File Selection for Main Image
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0 && watchedImage[0] instanceof File) {
      const file = watchedImage[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchedImage]);

  // 🧠 3. Handle New File Selection for Video Thumbnail
  useEffect(() => {
    if (watchedThumbnail && watchedThumbnail.length > 0 && watchedThumbnail[0] instanceof File) {
      const file = watchedThumbnail[0];
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchedThumbnail]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();

    // Standard Fields
    formData.append('tab', tab_id);
    formData.append('media_type', data.media_type);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('button_text', data.button_text);
    formData.append('button_link', data.button_link);
    formData.append('order', data.order);
    formData.append('is_active', data.is_active);

    // Conditional Fields
    if (data.media_type === 'video') {
      formData.append('video_provider', data.video_provider);
      formData.append('video_url', data.video_url);

      // Check for new thumbnail file
      if (watchedThumbnail && watchedThumbnail[0] instanceof File) {
        formData.append('video_thumbnail', data.video_thumbnail[0]);
      }
    } else {
      // Check for new main image file
      if (watchedImage && watchedImage[0] instanceof File) {
        formData.append('image', data.image[0]);
      }
    }

    // Pass formData (Note: Since we have file uploads potentially in both modes,
    // it is safer to always use FormData for this specific structure).
    onSubmit(formData, data.id);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-lg rounded-lg shadow-around-sm space-y-md"
    >
      <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm">{formTitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Media Type Selection */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Media Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="image"
                {...register('media_type')}
                className="w-4 h-4 text-primary"
              />
              <span className="flex items-center gap-1">
                <ImageIcon size={16} /> Image
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="video"
                {...register('media_type')}
                className="w-4 h-4 text-primary"
              />
              <span className="flex items-center gap-1">
                <FileVideo size={16} /> Video
              </span>
            </label>
          </div>
        </div>

        {/* Title */}
        <div className="md:col-span-1">
          <label className="block mb-sm font-medium">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className={`w-full border ${
              errors.title ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
            placeholder="Content Title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Order */}
        <div className="md:col-span-1">
          <label className="block mb-sm font-medium">Display Order</label>
          <input
            type="number"
            {...register('order')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
            placeholder="0"
          />
        </div>

        {/* Description (CKEditor) */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Description</label>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
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
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors?.description?.message}</p>
          )}
        </div>

        {/* ----------------- CONDITIONAL MEDIA INPUTS ----------------- */}

        {watchedMediaType === 'image' && (
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-md border border-gray-200">
            <label className="block mb-1 font-medium text-gray-700">Main Image Upload</label>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 border border-gray-300 rounded-md bg-white flex items-center justify-center overflow-hidden shrink-0 relative">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400 text-center">No Img</span>
                )}
              </div>
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-white hover:border-blue-400 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-2">
                    <UploadCloud className="w-6 h-6 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Click to upload Image</p>
                  </div>
                  <input type="file" accept="image/*" {...register('image')} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

        {watchedMediaType === 'video' && (
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-md bg-gray-50 p-4 rounded-md border border-gray-200">
            {/* Video Provider */}
            <div>
              <label className="block mb-sm font-medium">Video Provider</label>
              <select
                {...register('video_provider')}
                className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg bg-white"
              >
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="html5">HTML5 / Self Hosted</option>
              </select>
            </div>

            {/* Video URL */}
            <div>
              <label className="block mb-sm font-medium">Video URL</label>
              <input
                type="text"
                {...register('video_url')}
                className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
                placeholder="https://..."
              />
            </div>

            {/* Video Thumbnail Upload */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">Video Thumbnail</label>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 border border-gray-300 rounded-md bg-white flex items-center justify-center overflow-hidden shrink-0 relative">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400 text-center">No Thumb</span>
                  )}
                </div>
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-white hover:border-blue-400 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-2">
                      <UploadCloud className="w-6 h-6 text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">Click to upload Thumbnail</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      {...register('video_thumbnail')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- BUTTONS & STATUS ----------------- */}

        {/* Button Text */}
        <div>
          <label className="block mb-sm font-medium">Button Text</label>
          <input
            type="text"
            {...register('button_text')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
            placeholder="e.g. Learn More"
          />
        </div>

        {/* Button Link */}
        <div>
          <label className="block mb-sm font-medium">Button Link</label>
          <input
            type="text"
            {...register('button_link')}
            className="w-full border border-black/10 px-md py-sm rounded-md focus:outline-none focus:shadow-lg"
            placeholder="e.g. /contact-us"
          />
        </div>

        {/* Is Active Status */}
        <div className="md:col-span-2">
          <label className="block mb-sm font-medium">Active Status</label>
          <select
            {...register('is_active', { required: 'Active status is required' })}
            className={`w-full border ${
              errors.is_active ? 'border-red-500' : 'border-black/10'
            } px-md py-sm rounded-md focus:outline-none focus:shadow-lg`}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
          {errors.is_active && (
            <p className="text-red-500 text-sm mt-1">{errors.is_active.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex justify-end gap-sm mt-md">
          <SecondaryButton
            className="text-black border-primary hover:bg-secondary hover:text-white hover:border-secondary"
            onClick={onCancel}
            text="Cancel"
          />
          <PrimaryButton
            type="submit"
            text={formTitle.toLocaleLowerCase().includes('add') ? 'Add' : 'Update '}
          />
        </div>
      </div>
    </form>
  );
}
