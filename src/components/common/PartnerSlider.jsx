/**
 * PartnerSlider Component
 * ------------------------
 * - Displays a title and the partner carousel
 * - Uses OuterSection + InnerSection for consistent layout spacing
 * - Serves as a reusable section to showcase partner organizations/brands
 */

import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PartnerCarousel from './PartnerCarousel';

const PartnerSlider = () => {
  return (
    <OuterSection>
      <InnerSection>
        {/* Section heading */}
        <h2
          className="text-3xl text-center font-heading font-bold text-black mb-6"
          aria-label="Partner Brands Section"
        >
          We’re Proud to Partner With
        </h2>

        {/* Carousel of partner logos */}
        <PartnerCarousel />
      </InnerSection>
    </OuterSection>
  );
};

export default PartnerSlider;
