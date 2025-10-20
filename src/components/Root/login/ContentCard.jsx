const ContentCard = ({ icon, heading, content }) => {
  return (
    <div className="flex flex-col items-start justify-center gap-3 mt-6 bg-white shadow-around-sm p-6 rounded-lg">
      <p className="text-3xl text-secondary">{icon}</p>
      <h1 className="font-semibold">{heading}</h1>
      <p className="text-sm text-black/50" >{content}</p>
    </div>
  );
};

export default ContentCard;