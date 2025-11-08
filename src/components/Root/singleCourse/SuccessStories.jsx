import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import StoryCard from './StoryCard';
import { useSelector } from 'react-redux';

const SuccessStories = () => {
  const { course } = useSelector((state) => state.course);
  return (
    <OuterSection
      className="w-full min-h-[600px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(/assets/success-bg.jpg)` }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${60 / 100})` }}
        aria-hidden="true"
      ></div>

      {/* Content container */}
      <InnerSection className="z-10 text-white">
        <div className="flex items-center justify-between gap-xl w-full flex-col md:flex-row">
          <h3 className="text-3xl font-bold font-heading">Success Stories</h3>
        </div>
        <div className="flex gap-xl mt-lg flex-col md:flex-row">
          {course?.detail?.success_stories?.map((item, index) => (
            <StoryCard key={index} story={item} />
          ))}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default SuccessStories;
