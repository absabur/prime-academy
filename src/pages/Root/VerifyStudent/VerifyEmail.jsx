import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { verifyEmail } from '@/redux/auth/authAction';
import { clearAuthError, clearAuthMessage } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSEO } from '@/hooks/usePageSeo';
import { fetchSeos } from '@/redux/seo/seoAction';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';

export default function VerifyEmail() {
  const { error, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [displayMessage, setDisplayMessage] = useState('Verifying your email...'); // loading | success | error
  const [pageSeo, setPageSeo] = useState(null);
  const { seos } = useSelector((state) => state.seo);

  // Get token from query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    dispatch(fetchSeos());
  }, []);

  useEffect(() => {
    setPageSeo(seos.find((item) => item.page_name == import.meta.env.VERIFY_STUDENT_SEO_PAGE_NAME));
  }, [seos]);

  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    dispatch(verifyEmail({ token }));
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      setDisplayMessage(error);
      setStatus('error');
      dispatch(clearAuthError());
    }
    if (message) {
      SwalUtils.success(message);
      setDisplayMessage(message);
      setStatus('success');
      dispatch(clearAuthMessage());
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [error, message]);

  return (
    <div className="flex items-center justify-center p-xl min-h-[500px]">
      <div className="bg-white p-xl rounded-lg shadow-lg w-full text-center">
        {status === 'loading' && (
          <>
            <h2 className="text-xl font-semibold">{displayMessage}</h2>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <h2 className="text-xl font-semibold text-green-600">{displayMessage}</h2>
            <p className="text-gray-500 mt-2">Redirecting to login...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="text-xl font-semibold text-red-600">Verification Failed</h2>
            <p className="text-gray-500 mt-2 mb-4">{displayMessage}</p>
            <div className="flex justify-center gap-4">
              <PrimaryButton
                onClick={() => navigate('/register')}
                text={'Try Again'}
              ></PrimaryButton>
              <SecondaryButton
                from="hero"
                onClick={() => navigate('/contact')}
                text={'Contact Support'}
                className="border-primary text-black hover:text-white"
              ></SecondaryButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
