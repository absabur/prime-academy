// Importing the SingleCourseHero component (main hero section for the course page)
import SingleCourseHero from '@/components/Root/singleCourse/SingleCourseHero';
import SingleCourseTab from '../../../components/Root/singleCourse/SingleCourseTab';
import { useEffect, useState } from 'react';
import LeftSideContent from '@/components/Root/singleCourse/LeftSideContent/LeftSideContent';
import RightSideContent from '@/components/Root/singleCourse/RightSideContent/RightSideContent';
import { useSEO } from '@/hooks/usePageSeo';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import { fetchImgIconContents } from '@/redux/imgIconContent/imgIconContentAction';
// SingleCourse page component
const SingleCourse = () => {
  // tab handel state
  const [openTab, setOpenTab] = useState('left');

  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImgIconContents({ page: 'single-course' }));
  }, []);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'single-course'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <>
      {/*  Hero section for single course page */}
      <SingleCourseHero />
      {/* Tab section click data change */}
      <SingleCourseTab openTab={openTab} setOpenTab={setOpenTab} />
      {openTab === 'left' && <LeftSideContent />}
      {openTab === 'right' && <RightSideContent />}
    </>
  );
};

// ✅ Exporting component as default
export default SingleCourse;
