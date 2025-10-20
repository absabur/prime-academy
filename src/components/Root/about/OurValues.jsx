/**
 * OurValues Component
 * ------------------
 * - Displays the "Our Values" section of the About page
 * - Desktop: clickable buttons for each value category
 * - Mobile: dropdown select for smaller screens
 * - Shows associated content (image/video + description) via aboutOurValues
 */

import { aboutOurValues } from '../../../data/aboutPageData';
import TabContainSection from '@/components/common/TabContainSecton';

const OurValues = () => {
  return (
    <>
      <TabContainSection tabContain={aboutOurValues} />
    </>
  );
};

export default OurValues;
