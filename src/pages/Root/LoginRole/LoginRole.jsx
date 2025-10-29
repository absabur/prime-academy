import { FaBook, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContentCard from '@/components/Root/login/ContentCard';
import { loginUser } from '@/redux/auth/authAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import { clearAuthError } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import OuterSection from '@/components/common/OuterSection';
import InnerSection from '@/components/common/InnerSection';
import { useSEO } from '@/hooks/usePageSeo';
import { fetchSeos } from '@/redux/seo/seoAction';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import { RoleButton } from '../../../components/Root/login/RoleButton';

export default function LoginRole() {
  const { error, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return SwalUtils.warning('Please Enter Your Email!', 'Email Required');
    if (!password) return SwalUtils.warning('Please Enter Your Password', 'Password Required');
    if (!role)
      return SwalUtils.warning('Please choose your role before proceeding.', 'Select Role');

    // Dispatch login async
    dispatch(loginUser({ email, password, role }));
  };

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearAuthError());
    }
  }, [error]);
  // Navigate when login is successful
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == 'login-role'));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  return (
    <OuterSection className="min-h-screen">
      <InnerSection className="flex flex-col md:flex-row gap-20 justify-center items-center">
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
        <div className="w-full flex-1 max-w-[500px] shadow-around-sm bg-white p-lg rounded-lg flex flex-col items-start justify-center gap-3 md:w-1/3">
          <h1 className="text-black font-bold text-3xl text-center w-full">Welcome Back</h1>
          <p className="text-black/50 text-base w-full text-center">
            Sign in to access your learning dashboard
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-3 mt-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <PrimaryButton
              className="mt-xl"
              disabled={loading}
              type="submit"
              text={loading ? 'Signing in...' : 'Sign in'}
            />
          </form>

          <div className=" w-full flex justify-center items-center gap-3 mt-4 ">
            <hr className="flex-1 text-black/50" />
            <p className="text-black/50">Select Role</p>
            <hr className="flex-1 text-black/50" />
          </div>

          <div className="flex flex-wrap gap-3 w-full mt-4">
            {[
              { icon: <FaGraduationCap className="text-lg text-blue-500" />, role: 'Admin' },
              { icon: <FaBook className="text-lg text-green-500" />, role: 'Teacher' },
              { icon: <FaUsers className="text-lg text-orange-400" />, role: 'Account' },
              { icon: <FaUsers className="text-lg text-orange-400" />, role: 'Stuff' },
            ].map((item, index) => (
              <RoleButton
                key={index}
                role={item.role.toLowerCase()}
                text={item.role}
                icon={item.icon}
                setRole={setRole}
                activeRole={role}
              />
            ))}
          </div>

          <p className="text-black/50 text-base w-full text-center mt-2">
            You can't login without selecting you own role
          </p>
        </div>
      </InnerSection>
    </OuterSection>
  );
}
