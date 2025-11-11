/**
 * CarrersSection Component
 * ------------------------
 * - Highlights career opportunities at Prime Academy
 * - Displays an image/video along with additional description and an optional button
 * - Uses OuterSection + InnerSection for consistent layout spacing
 * - Includes a decorative RoundShape element
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ImgContentTop = () => {
  const [content, setContent] = useState({});
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (!course?.detail?.side_image_sections) return;

    // make a shallow copy before sorting
    const sortedData = [...course.detail.side_image_sections].sort((a, b) => a.order - b.order);

    setContent({
      ...sortedData[0],
      content: sortedData[0]?.text,
    });
  }, [course?.detail?.side_image_sections]);

  return (
    <OuterSection className="relative">
      {/* Decorative circular element */}
      <RoundShape />

      <InnerSection>
        {/* Main content block */}
        <ImageContent data={content} />
      </InnerSection>
    </OuterSection>
  );
};

export default ImgContentTop;
