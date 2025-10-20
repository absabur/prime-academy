/**
 * KnowUs Component
 * ----------------
 * - Displays key facts and figures about the academy
 * - Layout:
 *    1. Text content on the left (heading + description)
 *    2. Statistics grid on the right
 * - Includes a decorative RoundShape element for visual appeal
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import RoundShape from '../../common/RoundShape';
import KnowUsComponent from '../../common/KnowUs';
import { aboutKnowUs } from '../../../data/aboutPageData';

const KnowUs = () => {
  return (
    <OuterSection className="relative">
      {/* Decorative element positioned to the right */}

      <InnerSection className="flex flex-col md:flex-row gap-lg">
        <KnowUsComponent statsData={aboutKnowUs?.stats} content={aboutKnowUs?.content} />
      </InnerSection>
    </OuterSection>
  );
};

export default KnowUs;
