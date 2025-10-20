import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ImageContentBottom = () => {
  const [content, setContent] = useState({});
  const { imgIconContents } = useSelector((state) => state.imgIconContent);

  useEffect(() => {
    setContent(
      imgIconContents.find(
        (item) =>
          item.page == 'home' && item.section_type == 'info' && item.position_display == 'Bottom'
      )
    );
  }, [imgIconContents]);

  return (
    <OuterSection className="relative">
      <RoundShape p={`right`} opacity={true} />
      <InnerSection>
        <ImageContent data={content} />
      </InnerSection>
    </OuterSection>
  );
};

export default ImageContentBottom;
