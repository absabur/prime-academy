/**
 * KnowUs Component
 * ----------------
 * - Highlights key statistics and achievements of Prime Academy
 * - Split layout:
 *    1. Text and CTA on the left
 *    2. Statistics grid on the right
 * - Uses OuterSection + InnerSection for consistent layout
 * - Includes a PrimaryButton for user engagement
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import KnowUsComponent from '../../common/KnowUs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAcademyOverview } from '../../../redux/imgIconContent/imgIconContentAction';

const KnowUs = () => {
  const { academyOverview } = useSelector((state) => state.imgIconContent);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAcademyOverview());
  }, []);

  if (academyOverview?.length) {
    return (
      <OuterSection>
        <InnerSection className="flex flex-col lg:flex-row gap-lg">
          <KnowUsComponent data={academyOverview[0]} />
        </InnerSection>
      </OuterSection>
    );
  }
};

export default KnowUs;
