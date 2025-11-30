import HeroSection from '@/components/common/HeroSection';
import { fetchHeros } from '@/redux/hero/heroAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCart } from '../../../redux/cart/cartAction';
import { createWishlist } from '../../../redux/wishlist/wishlistAction';
import { useNavigate } from 'react-router-dom';
import { clearError, clearMessage } from '../../../redux/cart/cartSlice';
import { clearMessage as clearMessageWishlist } from '../../../redux/wishlist/wishlistSlice';
import { clearError as clearErrorWishlist } from '../../../redux/wishlist/wishlistSlice';
import SwalUtils from '../../../utils/sweetAlert';

const SingleCourseHero = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const { message, error } = useSelector((state) => state.cart);
  const { message: wishlistMessage, error: wishlistError } = useSelector((state) => state.wishlist);
  const [courseHero, setCourseHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);

  useEffect(() => {
    if (message) {
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

  useEffect(() => {
    let current = heros.filter((item) => item.page_name == import.meta.env.VITE_SINGLE_COURSE_HERO_PAGE_NAME);
    setCourseHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      bannerImage={courseHero?.banner_image}
      title={course?.detail?.hero_text || course?.title}
      description={course?.detail?.hero_description || course?.short_description}
      className="relative"
      button1={{
        text: 'Enroll Now',
        onClick: () => dispatch(createCart({ course_id: course?.id })),
      }}
      button2={
        isAuthenticated && user?.role == 'student'
          ? {
              text: 'Add to Wishlist',
              onClick: () => dispatch(createWishlist({ course_id: course?.id })),
            }
          : null
      }
      pricing={course?.pricing}
      from="course"
    />
  );
};

export default SingleCourseHero;
