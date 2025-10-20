/**
 * ImageContentTop Component
 * -----------------------------
 * - Displays an image/video content section with optional additional info and CTA button
 * - Uses `OuterSection` + `InnerSection` for consistent layout
 * - Includes a decorative `RoundShape` for visual design
 * - The actual content is passed via the `imageContent` object
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ImageContentTop = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);
  useEffect(() => {
    setContent(
      imgIconContents.find(
        (item) =>
          item.page == 'home' && item.section_type == 'info' && item.position_display == 'Top'
      )
    );
  }, [imgIconContents]);

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

export default ImageContentTop;
