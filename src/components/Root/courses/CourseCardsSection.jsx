/**
 * CourseCardsSection Component
 * --------------------------
 * - Wraps the course listing section
 * - Displays a sidebar filter (LeftFilter) and the course cards (CourseCards)
 * - Fully responsive: flex-column on mobile, flex-row on desktop
 * - Uses OuterSection + InnerSection for consistent layout spacing
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import CourseCards from './CourseCards';
import TopFilter from './TopFilter';

const CourseCardsSection = () => {
  return (
    <OuterSection>
      <InnerSection>
        {/* Top Filter form */}
        <TopFilter />

        <div className="flex flex-col md:flex-row gap-lg mt-lg">

          {/* Course cards listing */}
          <CourseCards />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default CourseCardsSection;
