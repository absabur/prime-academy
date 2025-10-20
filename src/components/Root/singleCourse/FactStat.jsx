import InnerSection from '@/components/common/InnerSection';
import KnowUsComponent from '@/components/common/KnowUs';
import OuterSection from '@/components/common/OuterSection';
import { singleCourseFactsAndStat } from '@/data/singleCoursePageData';
import React from 'react';

const FactStat = () => {
  return (
    <OuterSection>
      <InnerSection className="flex flex-col md:flex-row gap-lg">
        <KnowUsComponent
          statsData={singleCourseFactsAndStat?.stats}
          content={singleCourseFactsAndStat?.content}
        />
      </InnerSection>
    </OuterSection>
  );
};

export default FactStat;
