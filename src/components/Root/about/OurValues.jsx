/**
 * OurValues Component
 * ------------------
 * - Displays the "Our Values" section of the About page
 * - Desktop: clickable buttons for each value category
 * - Mobile: dropdown select for smaller screens
 * - Shows associated content (image/video + description) via aboutOurValues
 */

import TabContainSection from '@/components/common/TabContentSection';
import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import { fetchOurValues } from '../../../redux/imgIconContent/imgIconContentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { convertToAboutOurValues } from '../../../utils/convertToAboutOurValues';

const OurValues = () => {
  const { ourValues } = useSelector((state) => state.imgIconContent);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOurValues());
  }, []);
  return (
    <>
      <OuterSection className=" relative top-12">
        <InnerSection className="py-xs">
          <h2 className="text-3xl font-bold text-left self-start">Our Values</h2>
        </InnerSection>
      </OuterSection>
      {ourValues?.length && <TabContainSection tabContain={convertToAboutOurValues(ourValues)} />}
    </>
  );
};

export default OurValues;
