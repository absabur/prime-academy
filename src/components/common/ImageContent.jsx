import { motion } from 'framer-motion';
import Modal from './Modal';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import './css/videoButton.css';
import { useSelector } from 'react-redux';
import ImageContentSkeleton from './ImageContentSkeleton';
import DOMPurify from 'dompurify';

const ImageContent = ({ data, ip }) => {
  const { loadingImgIconContents } = useSelector((state) => state.imgIconContent);

  const [modal, setModal] = useState(false);
  const [mute, setMute] = useState(true); // 🔇 Start muted

  const openModal = () => {
    setMute(false); // 🔊 Enable sound when clicked
    setModal(true);
  };

  // --- New Logic ---

  // 1. Determine the correct preview image source
  let previewSrc = null;
  if (data?.media_type === 'video') {
    // It's a video. Prioritize the video thumbnail.
    previewSrc = data?.video_thumbnail;

    // If no video thumb, use the main 'image' field as a fallback.
    if (!previewSrc) {
      previewSrc = data?.image;
    }

    // If still no image, fallback to YouTube default (if applicable).
    if (!previewSrc && data?.video_provider === 'youtube' && data?.video_id) {
      previewSrc = `https://i.ytimg.com/vi/${data?.video_id}/hq720.jpg`;
    }
  } else {
    // It's an image. Just use the 'image' field.
    previewSrc = data?.image;
  }

  if (previewSrc?.startsWith('/')) {
    previewSrc = `${import.meta.env.VITE_API_URL}${previewSrc}`;
  }

  // 2. Determine the video embed URL for the modal
  let videoEmbedUrl = '';
  if (data?.video_id) {
    const videoId = data?.video_id;
    // When modal opens, mute is set to false.
    const isMuted = mute ? 1 : 0;

    if (data?.video_provider === 'youtube') {
      videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted}&playsinline=1`;
    } else if (data?.video_provider === 'vimeo') {
      videoEmbedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=${isMuted}&autopause=0`;
    }
  }
  // --- End New Logic ---

  return (
    <div className="flex gap-15 flex-col md:flex-row">
      {modal && (
        <Modal setModal={setModal}>
          <div className="w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            {/* 🔹 Updated: Generic iFrame player */}
            {videoEmbedUrl ? (
              <iframe
                src={videoEmbedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={data?.title || 'Video Player'}
              ></iframe>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <p className="text-white">Could not load video.</p>
              </div>
            )}
          </div>
        </Modal>
      )}
      {/* {loadingImgIconContents && <ImageContentSkeleton ip={ip} />} */}
      <div className={`flex-1 relative flex items-center ${ip === 'right' ? 'order-2' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: ip === 'right' ? 30 : -30, y: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`w-full relative`}
        >
          {/* 🔹 Updated: Image / Video preview logic */}
          {previewSrc ? (
            <img
              src={previewSrc}
              alt={data?.title}
              className="relative z-20 w-full h-full object-cover rounded-lg"
            />
          ) : (
            // Optional: Fallback if no image or video thumb
            <div className="relative z-20 w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No preview available</p>
            </div>
          )}

          {/* 🔹 Updated: Play button logic */}
          {(data?.media_type === 'video' || data?.video_url) && (
            <div
              onClick={openModal}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white play cursor-pointer hover:bg-secondary z-30"
            ></div>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: ip === 'right' ? -30 : 30, y: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full relative flex-1 flex gap-lg flex-col`}
      >
        <div className={`flex-1 flex flex-col justify-start ${ip == 'right' && 'order-1'}`}>
          <h2 className="text-3xl leading-xl font-bold text-black uppercase mb-md">
            {data?.title}
          </h2>

          <div className="w-full space-y-sm">
            <div
              className="prose prose-sm max-w-none text-black/80 text-justify"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.content),
              }}
            />
          </div>

          {data?.button_link ? (
            <PrimaryButton
              href={`${data?.button_link}`}
              text={data?.button_text}
              className="self-start rounded-lg mt-xl"
            />
          ) : (
            <></>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ImageContent;
