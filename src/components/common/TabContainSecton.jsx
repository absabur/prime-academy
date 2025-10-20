/**
 * OurValues Component
 * ------------------
 * - Displays the "Our Values" section of the About page
 * - Desktop: clickable buttons for each value category
 * - Mobile: dropdown select for smaller screens
 * - Shows associated content (image/video + description) via aboutOurValues
 */

import { useState } from 'react';
import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import ImageContent from './ImageContent';
import TabButtons from './TabButtons';
import RoundShape from './RoundShape';
import KnowUsComponent from './KnowUs';
import { aboutKnowUs } from '../../data/aboutPageData';

const TabContainSection = ({ tabContain }) => {
  const [activeData, setActiveData] = useState(tabContain[0]);

  return (
    <OuterSection className="relative">
      <RoundShape p="right" />
      <InnerSection>
        <TabButtons
          data={tabContain}
          selected={activeData.category}
          setSelected={(category) =>
            setActiveData(tabContain.find((item) => item.category === category))
          }
        />

        {/* Display selected value content */}
        <div className="w-full space-y-20">
          <ImageContent data={activeData} />
          <KnowUsComponent statsData={aboutKnowUs?.stats} content={aboutKnowUs?.content} />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default TabContainSection;
