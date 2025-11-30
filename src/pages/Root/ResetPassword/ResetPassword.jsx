import { FaBook, FaUsers } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ContentCard from '@/components/Root/login/ContentCard';
import { resetPassword } from '@/redux/auth/authAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import { clearAuthError } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { useSEO } from '@/hooks/usePageSeo';
import { fetchSeos } from '@/redux/seo/seoAction';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import PasswordInput from '../../../components/Dashboard/common/PasswordInput';

export default function ResetPassword() {
  const { error, message, isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);

  // ✅ Extract token from query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const new_password = watch('new_password');
  const new_password2 = watch('new_password2');

  // ✅ Handle form submit
  const onSubmit = (data) => {
    const { new_password, new_password2 } = data;

    if (!new_password || !new_password2)
      return SwalUtils.warning('Enter and confirm your new password!');
    if (new_password !== new_password2) return SwalUtils.warning('Passwords do not match!');

    dispatch(resetPassword({ token, new_password, new_password2 }));
  };

  // ✅ Handle Errors
  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearAuthError());
    }
  }, [error]);

  // ✅ Handle Success Message
  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearAuthError());
      setTimeout(() => navigate('/login'), 1000);
    }
  }, [message]);

  // ✅ Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate(`/${user?.role}-dashboard`);
  }, [isAuthenticated]);

  // ✅ SEO Fetch
  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(
      seos.find((item) => item.page_name === import.meta.env.RESET_PASSWORD_SEO_PAGE_NAME)
    );
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <OuterSection className="min-h-screen">
      <InnerSection className="flex flex-col md:flex-row gap-20 justify-center items-center">
        {/* Left side content cards */}
        <div className="flex-1 w-full max-w-[500px] hidden lg:flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <img src="/assets/prime-academy-logo-full-dark.png" width={180} alt="Prime Academy" />
            <h1 className="text-3xl font-bold mt-4">Prime Academy</h1>
            <p className="text-gray-600 text-center">
              Empowering education through innovative learning management
            </p>
          </div>
          <div className="flex gap-5">
            <ContentCard
              icon={<FaBook />}
              heading="Interactive Course"
              content="Engaging multimedia content"
            />
            <ContentCard
              icon={<FaUsers />}
              heading="Collaborative Learning"
              content="Learn together efficiently"
            />
          </div>
        </div>

        {/* Right side reset form */}
        <div className="flex-1 w-full max-w-[500px] shadow-around-sm bg-white p-lg rounded-lg flex flex-col items-start justify-center gap-3 md:w-1/3">
          <h1 className="text-black font-bold text-3xl text-center w-full">Reset Password</h1>
          <p className="text-black/50 text-base w-full text-center">
            Enter your details to reset your password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 mt-3">
            <PasswordInput
              label={'Password'}
              name={'new_password'}
              register={register}
              validation={{ required: 'New password is required' }}
              error={errors.new_password}
              placeholder={'Enter new password'}
            />

            <PasswordInput
              label={'Confirm Password'}
              name={'new_password2'}
              register={register}
              validation={{
                required: 'Confirm Password is required',
                validate: (val) => val === watch('new_password') || 'Passwords do not match',
              }}
              error={errors.new_password2}
              placeholder={'Confirm password'}
            />

            <PrimaryButton
              className="mt-xl"
              disabled={loading}
              type="submit"
              text={loading ? 'Resetting...' : 'Reset Password'}
            />
          </form>

          <p className="text-black/50 text-base w-full text-center mt-2">
            Remember password?{' '}
            <Link className="text-primary" to="/login">
              Login
            </Link>
          </p>
        </div>
      </InnerSection>
    </OuterSection>
  );
}
