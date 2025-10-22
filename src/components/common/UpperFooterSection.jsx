import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

const UpperFooterSection = ({
  backgroundImage,
  title,
  description,
  buttons,
  className = '',
  overlayOpacity = 60,
  height = '400px',
  layout = 'row',
}) => {
  return (
    <OuterSection
      className={`bg-cover bg-center relative ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height,
      }}
      aria-label="Call to Action Section"
    >
      {/* Overlay for better text visibility */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
        aria-hidden="true"
      ></div>

      {/* Content container */}
      <InnerSection className="relative flex flex-col items-center gap-lg z-10 text-center">
        <h2 className="font-bold font-heading text-3xl text-white">{title}</h2>
        <p className="font-heading text-base text-white/70 max-w-[600px]">{description}</p>

        {/* CTA buttons */}
        <div
          className={`flex ${layout === 'row' ? 'flex-row gap-xl' : 'flex-col sm:flex-row gap-4 sm:gap-xl'} mt-lg`}
        >
          {buttons.map((button, index) => {
            const ButtonComponent = button.type === 'primary' ? PrimaryButton : SecondaryButton;

            return (
              <ButtonComponent
                key={index}
                href={button.url}
                onClick={button.onClick}
                text={button.text}
                className="rounded-lg"
                from="hero"
              />
            );
          })}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default UpperFooterSection;
