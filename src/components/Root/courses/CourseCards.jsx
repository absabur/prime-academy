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
  const order = searchParams.get('order') || '';
  const previousCourses = useRef([]);

  // ✅ Store last fetched courses
  useEffect(() => {
    if (courses.length > 0) previousCourses.current = courses;
  }, [courses]);

  // ✅ Proper debounce and fetch logic
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchCourses({
          category,
          page: currentPage,
          page_size: pageSize,
          search,
          order: !!order ? 'published_at' : order, // keep same pattern as blogs
        })
      );
    }, 600);

    return () => clearTimeout(handler);
  }, [dispatch, currentPage, category, search, order, pageSize]);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
      {/* ✅ Show skeletons if loading and no previous data */}
      {loadingCourses && previousCourses.current.length == 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <CourseCardSkeleton key={index} index={index} />
          ))
        : (loadingCourses ? previousCourses.current : courses).map((item, index) => (
            <CourseCard key={item.id || index} item={item} index={index} />
          ))}

      {/* ✅ Show NotFound only if NOT loading AND empty courses */}
      {!loadingCourses && !courses.length ? <NotFoundCourses /> : null}
    </section>
  );
};

export default CourseCards;
