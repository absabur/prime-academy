/**
 * ImageContentBottom Component
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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ImageContentBottom = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);

  useEffect(() => {
    setContent(
      imgIconContents.find(
        (item) =>
          item.page == 'about' && item.section_type == 'info' && item.position_display == 'Bottom'
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

export default ImageContentBottom;
