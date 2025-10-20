export const getYouTubeID = (url) => {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url?.match(regExp);
  return match ? match[1] : null;
};
