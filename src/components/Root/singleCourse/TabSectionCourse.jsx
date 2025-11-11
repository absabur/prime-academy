/**
 * TabSectionCourse Component
 * ---------------------------
 * - Displays tab-based content for course details
 * - Optimized for performance & clean structure
 */

import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ImageContent from '../../common/ImageContent';
import TabButtons from '../../common/TabButtons';
import RoundShape from '../../common/RoundShape';
import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';

// ✅ Utility function (pure, reusable)
const formatTabSecton = (data = []) =>
  data.map((section) => {
    const content = section.contents?.[0] || {};
    return {
      category: section.tab_name || '',
      title: content.title || section.tab_name || '',
      image: content.image || '',
      video: content.video_url || '',
      content: content.description || '',
      buttonText: content.button_text || 'View More',
      url: content.button_link || '',
      ...content,
    };
  });

const TabSectionCourse = () => {
  const { course } = useSelector((state) => state.course);
  const [tabContain, setTabContain] = useState([]);
  const [activeData, setActiveData] = useState(null);

  // ✅ useMemo → prevent unnecessary recomputation
  const formattedTabs = useMemo(() => {
    if (!course?.detail?.content_sections?.length) return [];

    const sortedSections = [...course.detail.content_sections]
      .sort((a, b) => a.order - b.order)
      .map((section) => ({
        ...section,
        tabs: [...(section.tabs || [])].sort((a, b) => a.order - b.order),
      }));

    return formatTabSecton(sortedSections[0]?.tabs || []);
  }, [course?.detail?.content_sections]);

  // ✅ update states only when data changes
  useEffect(() => {
    if (formattedTabs.length) {
      setTabContain(formattedTabs);
      setActiveData(formattedTabs[0]);
    }
  }, [formattedTabs]);

  // 🔹 render nothing until data is ready
  if (!tabContain.length) return null;

  return (
    <OuterSection className="relative">
      <RoundShape p="right" opacity />
      <InnerSection>
        <TabButtons
          data={tabContain}
          selected={activeData?.category}
          setSelected={(category) =>
            setActiveData(tabContain.find((item) => item.category === category))
          }
        />
        <div className="w-full space-y-20">
          <ImageContent data={activeData} />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default TabSectionCourse;
