import { FaBook, FaUsers } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ContentCard from '@/components/Root/login/ContentCard';
import { registerStudent } from '@/redux/auth/authAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import { clearAuthError, clearAuthMessage } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { useSEO } from '@/hooks/usePageSeo';
import { fetchSeos } from '@/redux/seo/seoAction';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import { Link } from 'react-router-dom';
import PasswordInput from '../../../components/Dashboard/common/PasswordInput';

export default function RegisterStudent() {
  const { error, loading, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegister = (data) => {
    const { first_name, last_name, email, phone, password, password2 } = data;

    if (!first_name || !last_name || !email || !phone || !password || !password2) {
      return SwalUtils.warning('All fields are required!');
    }

    if (password !== password2) {
      return SwalUtils.warning('Passwords do not match!');
    }

    dispatch(registerStudent({ first_name, last_name, email, phone, password, password2 }));
  };

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearAuthError());
    }
    if (message) {
      SwalUtils.success(message);
      dispatch(clearAuthMessage());
      reset();
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == import.meta.env.VITE_REGISTER_SEO_PAGE_NAME));
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

        {/* Right side form */}
        <div className="flex-1 w-full max-w-[500px] shadow-around-sm bg-white p-lg rounded-lg flex flex-col items-start justify-center gap-3 md:w-1/3">
          <h1 className="text-black font-bold text-3xl text-center w-full">Create Account</h1>
          <p className="text-black/50 text-base w-full text-center">
            Register to get started with your learning journey
          </p>

          <form onSubmit={handleSubmit(handleRegister)} className="w-full flex flex-col gap-3 mt-3">
            <div className="flex gap-3">
              <div className="w-full">
                <label htmlFor="first_name">First Name</label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                  {...register('first_name', { required: true })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.first_name && (
                  <span className="text-red-500 text-sm">First name is required</span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="last_name">Last Name</label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Last Name"
                  {...register('last_name', { required: true })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm">Last name is required</span>
                )}
              </div>
            </div>

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              {...register('email', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              placeholder="01XXXXXXXXX"
              {...register('phone', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.phone && <span className="text-red-500 text-sm">Phone is required</span>}

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

            <PasswordInput
              label={'Confirm Password'}
              name={'password2'}
              register={register}
              validation={{
                required: 'Password is required',
                validate: (val) => val === watch('password') || 'Passwords do not match',
              }}
              error={errors.password2}
              placeholder={'Confirm password'}
            />

            <PrimaryButton
              className="mt-xl"
              disabled={loading}
              type="submit"
              text={loading ? 'Creating Account...' : 'Register'}
            />
          </form>

          <p className="text-black/50 text-base w-full text-center mt-2">
            Already have an account?{' '}
            <Link className="text-primary" to="/login">
              Login
            </Link>
          </p>
        </div>
      </InnerSection>
    </OuterSection>
  );
}
