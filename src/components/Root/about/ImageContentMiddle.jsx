/**
 * ImageContentMiddle Component
 * ------------------------
 * - Highlights that the academy is the largest independent training provider in England
 * - Displays an image/video along with additional description and an optional button
 * - Uses OuterSection + InnerSection for layout consistency
 * - Includes a decorative RoundShape for visual appeal
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ImageContentMiddle = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);

  useEffect(() => {
    setContent(
      imgIconContents.find(
        (item) =>
          item.page == 'about' && item.section_type == 'info' && item.position_display == 'Middle'
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

export default ImageContentMiddle;
