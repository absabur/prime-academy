/**
 * CoursesPage Component
 * ------------------
 * - Displays the main course listing page
 * - Sections include:
 *    1. Hero banner
 *    2. Top filter bar
 *    3. Grid/list of course cards
 *    4. Pagination controls
 *    5. Upper footer or CTA section
 * - Fully modular: each section is a separate component
 */

import CourseHero from '../../../components/Root/courses/HeroSection';
import UpperFooterCourses from '../../../components/Root/courses/UpperFooterSection';
import { fetchCourseCategories } from '@/redux/courses/courseAction';
import CourseCardsSection from '@/components/Root/courses/CourseCardsSection';
import PaginationSection from '@/components/common/PaginationSection';
import { useSEO } from '@/hooks/usePageSeo';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';

const CoursesPage = () => {
  const { coursePagination, pageSize, error } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);

  useEffect(() => {
    dispatch(fetchCourseCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'courses'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <>
      {/* Hero banner for course listing */}
      <CourseHero />

      {/* Course cards listing */}
      <CourseCardsSection />

      {/* Pagination controls for course list */}
      <PaginationSection pagination={coursePagination} pageSize={pageSize} error={error} />

      {/* Optional upper footer or CTA section */}
      <UpperFooterCourses />
    </>
  );
};

export default CoursesPage;
