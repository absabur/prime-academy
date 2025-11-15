import { FaBook, FaUsers } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ContentCard from '@/components/Root/login/ContentCard';
import { loginUser } from '@/redux/auth/authAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import { clearAuthError } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { useSEO } from '@/hooks/usePageSeo';
import { fetchSeos } from '@/redux/seo/seoAction';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import PasswordInput from '../../../components/Dashboard/common/PasswordInput';
import { setCouponState } from '../../../redux/common/commonSlice';

export default function LoginStudent() {
  const { error, isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;

    if (!email) return SwalUtils.warning('Enter Your Email!');
    if (!password) return SwalUtils.warning('Enter Your Password');

    dispatch(loginUser({ email, password, role: 'student' }));
  };

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearAuthError());
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      const next = searchParams.get('next');
      const redirectState = location.state?.fromState || null;
      dispatch(setCouponState(redirectState));
      if (next) {
        navigate(next);
      } else {
        navigate(`/${user?.role}-dashboard`);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'login'));
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
            <p className="text-gray-600 w-100 text-center">
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

        {/* Right side login form */}
        <div className="flex-1 w-full max-w-[500px] shadow-around-sm bg-white p-lg rounded-lg flex flex-col items-start justify-center gap-3 md:w-1/3">
          <h1 className="text-black font-bold text-3xl text-center w-full">Welcome Back</h1>
          <p className="text-black/50 text-base w-full text-center">
            Sign in to access your learning dashboard
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="w-full flex flex-col gap-3 mt-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              {...register('email', { required: true })}
              className="w-full p-sm border border-gray-300 rounded"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}

            <PasswordInput
              label={'Password'}
              name={'password'}
              register={register}
              validation={{
                required: 'Password is required',
              }}
              error={errors.password}
              placeholder={'Enter password'}
            />

            <Link className="text-primary-light" to={`/forgot-password`}>
              Forgot Password?
            </Link>

            <PrimaryButton
              className="mt-xl"
              disabled={loading}
              type="submit"
              text={loading ? 'Signing in...' : 'Sign in'}
            />
          </form>

          <p className="text-black/50 text-base w-full text-center mt-2">
            Don't have an account?{' '}
            <Link className="text-primary" to="/register">
              Register
            </Link>
          </p>
        </div>
      </InnerSection>
    </OuterSection>
  );
}
