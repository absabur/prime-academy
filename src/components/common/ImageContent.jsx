import { motion } from 'framer-motion';
import Modal from './Modal';
import YtVideoAutoPlay from './YtVideoPlay';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { getYouTubeID } from '../../utils/getYouTubeID.js';
import './css/videoButton.css';
import { useSelector } from 'react-redux';
import ImageContentSkeleton from './ImageContentSkeleton';

const ImageContent = ({ data, ip }) => {
  const { loadingImgIconContents } = useSelector((state) => state.imgIconContent);

  const [modal, setModal] = useState(false);
  const [mute, setMute] = useState(true); // 🔇 Start muted

  const openModal = () => {
    setMute(false); // 🔊 Enable sound when clicked
    setModal(true);
  };

  return (
    <div className="flex gap-15 flex-col md:flex-row">
      {modal && (
        <Modal setModal={setModal}>
          <div className="w-full md:w-1/2 aspect-video" onClick={(e) => e.stopPropagation()}>
            <YtVideoAutoPlay url={data?.video} mute={mute} />
          </div>
        </Modal>
      )}
      {loadingImgIconContents && <ImageContentSkeleton ip={ip}/>}
      <div className={`flex-1 relative flex items-center ${ip === 'right' ? 'order-2' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: ip === 'right' ? 30 : -30, y: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`w-full relative`}
        >
          {/* 🔹 Image / Video preview */}
          {data?.image ? (
            <img
              src={data?.image}
              alt={data?.title}
              className="relative z-20 w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              {data?.video && (
                <img
                  src={
                    data?.image
                      ? data?.image
                      : `https://i.ytimg.com/vi/${getYouTubeID(data?.video)}/hq720.jpg`
                  }
                  alt={data?.title}
                  className="relative z-20 w-full h-full object-cover rounded-lg"
                />
              )}
            </>
          )}

          {/* Play button */}
          {data?.video && (
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
            {data?.content?.split('\n').map((answer, index) =>
              answer.trim().length ? (
                <p className="text-heading text-base leading-lg" key={index}>
                  {answer}
                </p>
              ) : null
            )}
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
