/**
 * CourseCards Component
 * -------------------
 * - Displays a responsive grid of course cards
 * - Uses CourseCard component for individual card rendering
 * - Fully responsive: 1 column on mobile, 2 on medium screens, 3 on large
 * - Card data is currently static but can be replaced with API data
 */

import { useDispatch, useSelector } from 'react-redux';
import CourseCard from './CourseCard';
import { fetchCourses } from '@/redux/courses/courseAction';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCardSkeleton from './CourseCardSkeleton';
import NotFoundCourses from './NotFoundCourse';

const CourseCards = () => {
  const { courses, pageSize, loadingCourses } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const previousCourses = useRef([]);

  useEffect(() => {
    if (courses.length > 0) previousCourses.current = courses; // ✅ Store last course
  }, [courses]);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchCourses({
          category: category,
          page: currentPage,
          page_size: pageSize,
          search,
        })
      );
    }, 600); // debounce delay 600ms

    return () => {
      clearTimeout(handler); // cleanup old timer before new one
    };
  }, [dispatch, currentPage, category, search]);

  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
      {loadingCourses && previousCourses.current.length === 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <CourseCardSkeleton key={index} index={index} />
          ))
        : (loadingCourses ? previousCourses.current : courses).map((item, index) => (
            <CourseCard key={item.id || index} index={index} item={item} />
          ))}

      {/* Show "No Course Found" only if NOT loading AND no courses AND we have fetched at least once */}
      {!loadingCourses && !courses.length && <NotFoundCourses />}
    </section>
  );
};

export default CourseCards;
