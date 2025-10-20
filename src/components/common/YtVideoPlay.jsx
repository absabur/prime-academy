import { getYouTubeID } from '@/utils/getYouTubeID';

const YtVideoAutoPlay = ({ url, mute }) => {
  return (
    <iframe
      className="w-full h-full rounded-lg"
      src={`https://www.youtube.com/embed/${getYouTubeID(url)}?autoplay=1&mute=${mute ? 1 : 0}&playsinline=1`}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YtVideoAutoPlay;
