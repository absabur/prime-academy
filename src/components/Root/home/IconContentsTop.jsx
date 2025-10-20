import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import CourseFeatureCard from '../../common/CourseFeatureCard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const IconContentsTop = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);
  useEffect(() => {
    setContent(
      imgIconContents.filter(
        (item) =>
          item.page == 'home' && item.section_type == 'icon' && item.position_display == 'Top'
      )
    );
  }, [imgIconContents]);

  return (
    <OuterSection>
      <InnerSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {content?.length &&
            content?.map((feature) => <CourseFeatureCard key={feature.id} course={feature} />)}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default IconContentsTop;
