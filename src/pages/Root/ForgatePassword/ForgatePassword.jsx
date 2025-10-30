import { FaBook, FaUsers } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ContentCard from '@/components/Root/login/ContentCard';
import { forgotPassword } from '@/redux/auth/authAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import { clearAuthError } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { useSEO } from '@/hooks/usePageSeo';
import { fetchSeos } from '@/redux/seo/seoAction';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';

export default function ForgatePassword() {
  const { error, message, isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);

  const handleForgot = (e) => {
    e.preventDefault();
    if (!email) return SwalUtils.warning('Enter Your Email!');

    // Dispatch forgot async
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearAuthError());
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearAuthError());
    }
  }, [message]);

  // Navigate when forgot is successful
  useEffect(() => {
    if (isAuthenticated) navigate(`/${user?.role}-dashboard`);
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'forgate-password'));
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

        {/* Right side forgot form */}
        <div className="flex-1 w-full max-w-[500px] shadow-around-sm bg-white p-lg rounded-lg flex flex-col items-start justify-center gap-3 md:w-1/3">
          <h1 className="text-black font-bold text-3xl text-center w-full">Welcome Back</h1>
          <p className="text-black/50 text-base w-full text-center">Reset you password</p>

          <form onSubmit={handleForgot} className="w-full flex flex-col gap-3 mt-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Enter you email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <PrimaryButton
              className="mt-xl"
              disabled={loading}
              type="submit"
              text={loading ? 'Sending...' : 'Send Mail'}
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
