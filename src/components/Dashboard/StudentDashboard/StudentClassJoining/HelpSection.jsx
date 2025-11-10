import PrimaryButton from '../../../common/PrimaryButton';

const HelpSection = () => {
  return (
    <div className="bg-primary rounded-2xl p-lg flex flex-col lg:flex-row items-center justify-between gap-lg text-white shadow-lg mx-auto mt-80">
      {/* Image Container */}
      <div className="flex-shrink-0">
        <div className="bg-cover bg-center bg-no-repeat">
          <img
            src="/assets/support.png"
            className="w-48 h-32 md:w-64 md:h-40 object-contain"
            alt=""
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-grow text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-sm text-center">Need help?</h2>
        <p className="text-base md:text-lg text-white/70 text-center">
          Call for any technical issues (9 AM to 5 PM)
        </p>
      </div>

      {/* Call to Action */}
      <div className="flex-shrink-0 flex flex-col items-center gap-xl lg:gap-md">
        <span className="text-white/70 text-sm font-medium text-center">For Call</span>
        <PrimaryButton from={`hero`} text={`+8801300290492`} href={`tel:+8801300290492`} />
      </div>
    </div>
  );
};

export default HelpSection;
