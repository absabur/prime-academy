/**
 * ImageContentTop Component
 * ---------------------
 * - Represents the "Who We Are" section of the About page
 * - Displays video or image content along with additional info
 * - Uses OuterSection + InnerSection for consistent layout
 * - Includes a decorative RoundShape element
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ImageContentTop = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);

  useEffect(() => {
    setContent(
      imgIconContents.find(
        (item) =>
          item.page == 'about' && item.section_type == 'info' && item.position_display == 'Top'
      )
    );
  }, [imgIconContents]);

  return (
    <OuterSection className="relative">
      {/* Decorative circular element */}
      <RoundShape />

      <InnerSection>
        {/* Main content block (image/video + text) */}
        <ImageContent data={content} />
      </InnerSection>
    </OuterSection>
  );
};

export default ImageContentTop;
