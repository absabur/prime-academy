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
import { useParams } from 'react-router-dom';
import { fetchSingleCourse } from '../../../redux/courses/courseAction';
// SingleCourse page component
const SingleCourse = () => {
  const { slug } = useParams();

  // tab handel state
  const [openTab, setOpenTab] = useState('left');

  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeos());
    dispatch(fetchSingleCourse(slug));
  }, [slug]);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == import.meta.env.VITE_SINGLE_COURSE_SEO_PAGE_NAME));
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
