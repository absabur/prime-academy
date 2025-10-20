/**
 * KnowUs Component
 * ----------------
 * - Highlights key statistics and achievements of Prime Academy
 * - Split layout:
 *    1. Text and CTA on the left
 *    2. Statistics grid on the right
 * - Uses OuterSection + InnerSection for consistent layout
 * - Includes a PrimaryButton for user engagement
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import KnowUsComponent from '../../common/KnowUs';
import { homeKhowUs } from '../../../data/homePageData';

const KnowUs = () => {
  return (
    <OuterSection>
      <InnerSection className="flex flex-col lg:flex-row gap-lg">
        <KnowUsComponent statsData={homeKhowUs?.stats} content={homeKhowUs?.content} />
      </InnerSection>
    </OuterSection>
  );
};

export default KnowUs;
