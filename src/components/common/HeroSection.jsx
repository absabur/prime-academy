import ReactMarkdown from 'react-markdown';
import './css/hero.css';

// Custom Hook
import { useResponsiveMargin } from '../../hooks/useResponsiveMergin'; // Adjust path as needed

// Common Components
import HorizontalScrollSection from './HorizontalScroll';
import VerticalScrollSection from './VerticalScroll';
import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import HomeHeroBgLayouts from './HomeHeroBgLayouts'; // Adjust path
import HeroBgLayouts from './HeroBgLayouts';
import PathUrl from './PathUrl';

// Reusable Hero Section component
const HeroSection = ({
  title,
  description,
  bannerImage,
  slides,
  button1,
  button2,
  from,
  pricing = null,
}) => {
  // The responsive margin logic is now self-contained within this component.
  const { ref: h1Ref, style: h1Style } = useResponsiveMargin(180);

  return (
    <OuterSection
      className="bg-primary relative min-h-[800px] pt-fnavbar items-start"
      style={{ zIndex: 40 }}
    >
      {/* Conditionally render the background image */}
      {from == 'home' ? (
        <HomeHeroBgLayouts image={bannerImage} />
      ) : (
        <HeroBgLayouts image={bannerImage} />
      )}

      <InnerSection Tag="header" className="items-start z-5 py-md md:py-xl">
        <div className="md:block hidden">
          <PathUrl />
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-sm">
          {/* Left Content */}
          <div className={`pb-20 ${from == 'home' ? 'home-hero-left' : 'w-full md:w-[40%]'}`}>
            {/* The title is required, so no conditional check needed here */}

            <div className="md:hidden block mt-50 md:mt-0" ref={h1Ref} style={h1Style}>
              <PathUrl />
            </div>
            {from == 'home' ? (
              <h1
                ref={h1Ref}
                className="heading-home-hero mb-md text-white whitespace-pre-wrap uppercase"
                style={h1Style}
              >
                {/* Use ReactMarkdown to render the title which may contain line breaks */}
                <ReactMarkdown components={{ p: 'span' }}>{title}</ReactMarkdown>
              </h1>
            ) : (
              <h1
                className={`${from == 'course' ? 'heading-3xl' : 'heading-5xl'} mt-10 pb-md text-white uppercase`}
                style={{ color: 'var(--color-white)' }}
              >
                {/* Use ReactMarkdown to render the title which may contain line breaks */}
                <span>{title}</span>
              </h1>
            )}

            {/* Conditionally render the horizontal scroll for mobile */}
            {slides && (
              <div className="w-full flex lg:hidden gap-xl mb-md">
                <HorizontalScrollSection items={slides} />
              </div>
            )}

            {/* Conditionally render the description */}
            {description && (
              <div
                className={`font-heading text-sm text-white leading-lg lg:max-w-[80%] space-y-md ${from == 'course' ? 'line-clamp-3' : 'mt-lg'}`}
              >
                <p>{description}</p>
              </div>
            )}

            {pricing && from === 'course' && (
              <div className="mt-xl">
                {pricing.effective_price == 0 || pricing.is_free ? (
                  <span className="text-2xl font-bold bg-secondary-light text-primary px-3 py-1 shadow-md rounded-md">
                    FREE
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    {pricing?.installment_available ? (
                      <div className="text-white flex items-center gap-sm">
                        <span className="text-lg">Price:</span>
                        <span className="font-bold text-2xl md:text-secondary">
                          {pricing?.installment_amount}
                        </span>
                        /<span className="">{pricing?.installment_count} Installment</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-lg text-white">Price:</span>
                        <span className="font-bold text-2xl md:text-secondary text-white">
                          {pricing.effective_price}
                        </span>
                        {pricing.base_price && pricing.base_price !== pricing.effective_price && (
                          <del className="text-gray-300 text-sm">{pricing.base_price}</del>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Conditionally render buttons */}
            {(button1 || button2) && (
              <div className="flex gap-lg flex-col sm:flex-row mt-xl">
                {button1?.url && (
                  <PrimaryButton
                    from="hero"
                    href={button1?.url}
                    text={button1?.text}
                    className="rounded-lg shadow-lg md:shadow-none"
                  />
                )}
                {button1?.onClick && (
                  <PrimaryButton
                    from="hero"
                    onClick={button1?.onClick}
                    text={button1?.text}
                    className="rounded-lg shadow-lg md:shadow-none"
                  />
                )}
                {button2?.url && (
                  <SecondaryButton
                    href={button2?.url}
                    text={button2?.text}
                    className="rounded-lg"
                    from="hero"
                  />
                )}
                {button2?.onClick && (
                  <SecondaryButton
                    from="hero"
                    onClick={button2?.onClick}
                    text={button2?.text}
                    className="rounded-lg"
                  />
                )}
              </div>
            )}
          </div>

          {/* Conditionally render the vertical scroll for desktop */}
          {slides && (
            <div className="hidden w-full lg:flex">
              <VerticalScrollSection items={slides} />
            </div>
          )}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default HeroSection;
