import HeroSection from '@/components/common/HeroSection';
import { fetchHeros } from '@/redux/hero/heroAction';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCart } from '../../../redux/cart/cartAction';
import { createWishlist } from '../../../redux/wishlist/wishlistAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { clearError, clearMessage } from '../../../redux/cart/cartSlice';
import {
  clearMessage as clearMessageWishlist,
  clearError as clearErrorWishlist,
} from '../../../redux/wishlist/wishlistSlice';
import SwalUtils from '../../../utils/sweetAlert';
import { fetchMyCourses } from '../../../redux/courses/courseAction';

const SingleCourseHero = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { course, myCourses } = useSelector((state) => state.course);
  const { message, error } = useSelector((state) => state.cart);
  const { message: wishlistMessage, error: wishlistError } = useSelector((state) => state.wishlist);
  const { heros } = useSelector((state) => state.hero);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const batchSlugFromUrl = searchParams.get('batch');
  const [activeBatch, setActiveBatch] = useState(null);
  const [courseHero, setCourseHero] = useState(null);

  // Calculate active batch after course loads
  useEffect(() => {
    if (course?.batches) {
      const openBatches = course.batches.filter((b) => b.is_enrollment_open);
      const batch = batchSlugFromUrl
        ? openBatches.find((b) => b.slug === batchSlugFromUrl) || openBatches[0]
        : openBatches[0] || null;
      setActiveBatch(batch);
    }
  }, [course, batchSlugFromUrl]);

  // Fetch heros once
  useEffect(() => {
    dispatch(fetchHeros());
  }, [dispatch]);

  // Set course hero after heros fetch
  useEffect(() => {
    if (heros?.length) {
      const current = heros.find(
        (item) => item.page_name === import.meta.env.VITE_SINGLE_COURSE_HERO_PAGE_NAME
      );
      setCourseHero(current || null);
    }
  }, [heros]);

  // Fetch myCourses for enrollment check
  useEffect(() => {
    if (isAuthenticated && user?.role === 'student') {
      dispatch(fetchMyCourses());
    }
  }, [dispatch, isAuthenticated, user?.id]);

  // Derived state: isAlreadyEnrolled
  const isAlreadyEnrolled = useMemo(() => {
    if (
      !isAuthenticated ||
      user?.role !== 'student' ||
      !myCourses?.length ||
      !activeBatch ||
      !course
    )
      return false;

    return myCourses.some(
      (enrollment) =>
        enrollment.course_slug === course.slug &&
        (enrollment.batch_id || enrollment.batch) === activeBatch.id
    );
  }, [isAuthenticated, user?.role, myCourses, activeBatch, course]);

  // Cart & Wishlist effects
  useEffect(() => {
    if (message) {
      SwalUtils.success(message, 'Success');
      navigate('/cart');
      dispatch(clearMessage());
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      SwalUtils.error(error, 'Failed to Add to Cart');
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    if (wishlistMessage) {
      navigate('/wish-list');
      dispatch(clearMessageWishlist());
    }
  }, [wishlistMessage]);

  useEffect(() => {
    if (wishlistError) {
      SwalUtils.error(wishlistError, 'Failed to Add to Wishlist');
      dispatch(clearErrorWishlist());
    }
  }, [wishlistError]);

  // Handlers
  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      SwalUtils.info('Please login to add courses to your wishlist', 'Login Required');
      setTimeout(() => navigate('/login?redirect=' + window.location.pathname), 1500);
      return;
    }
    if (user?.role !== 'student') {
      SwalUtils.warning('Only students can add courses to wishlist', 'Not Allowed');
      return;
    }
    if (!course?.id) return;
    dispatch(createWishlist({ course_id: course.id }));
  };

  const handleEnrollClick = () => {
    if (!course?.id || !activeBatch) {
      SwalUtils.error('Course or batch info missing.', 'Error');
      return;
    }
    if (isAlreadyEnrolled) {
      SwalUtils.info(`You are already enrolled in ${activeBatch.batch_name}.`, 'Already Enrolled');
      setTimeout(() => navigate('/student-dashboard/my-courses'), 2500);
      return;
    }
    dispatch(createCart({ course_id: course.id, batch_id: activeBatch.id }));
  };

  // Pricing
  const batchPricing =
    course?.pricing && activeBatch
      ? {
          ...course.pricing,
          installment_preview: activeBatch.has_installment ? activeBatch.installment_preview : null,
          effective_price: activeBatch.custom_price || course.pricing.effective_price,
          base_price: course.pricing.base_price,
          is_free: course.pricing.is_free,
        }
      : course?.pricing;

  if (!course) return <div>Loading course...</div>;

  return (
    <HeroSection
      bannerImage={courseHero?.banner_image}
      title={course?.detail?.hero_text || course?.title}
      description={course?.detail?.hero_description || course?.short_description}
      className="relative"
      button1={{
        text: isAlreadyEnrolled
          ? 'Already Enrolled'
          : activeBatch
            ? 'Enroll Now'
            : 'Enrollment Closed',
        onClick: isAlreadyEnrolled
          ? () => navigate('/student-dashboard/my-courses')
          : handleEnrollClick,
        disabled: !activeBatch && !isAlreadyEnrolled,
      }}
      button2={
        !isAlreadyEnrolled ? { text: 'Add to Wishlist', onClick: handleWishlistClick } : null
      }
      pricing={batchPricing}
      from="course"
    />
  );
};

export default SingleCourseHero;
