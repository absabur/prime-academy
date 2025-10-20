import SecondaryButton from '@/components/common/SecondaryButton';

const ChartCard = ({ title, buttontext, children }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-around-sm flex-1 flex flex-col justify-between p-xl space-y-xl">
      <div className="flex justify-between items-center mb-md w-full">
        <h1 className="text-primary font-bold text-xl">{title}</h1>
        <SecondaryButton
          text={buttontext}
          className="text-primary border-primary hover:text-white"
        />
      </div>
      {children}
    </div>
  );
};

export default ChartCard;
