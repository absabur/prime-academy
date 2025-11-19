import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../api/axios';
import { CircleCheck, Loader2 } from 'lucide-react';
import SwalUtils from '../../../utils/sweetAlert';

const Spinner = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
  </div>
);

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyPayment = async () => {
      // Get transaction ID from URL - check multiple parameter names
      const urlParams = new URLSearchParams(window.location.search);
      let order_number = urlParams.get('order_number');
      let val_id = urlParams.get('val_id');
      let latest_order_id = localStorage.getItem('latest_order_id');

      if (!order_number) {
        try {
          // Call the verify endpoint - it handles enrollment automatically
          const response = await api.get(`/api/orders/${latest_order_id}`);
          order_number = response?.data?.data?.order_number;
        } catch (err) {
          const errorMessage = err.response?.data?.message || 'Failed to verify payment';
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      }

      // Check if user is authenticated
      if (!isAuthenticated || !accessToken) {
        // Save redirect info and send to login
        if (order_number) {
          localStorage.setItem('payment_redirect', order_number);
        }
        setLoading(false);
        SwalUtils.warning(
          'Please Log In',
          'You need to be logged in to view your enrollment details.'
        );
        setTimeout(() => {
          navigate('/login?redirect=payment-success');
        }, 2000);
        return;
      }

      if (!order_number) {
        setError('No transaction ID found in URL. Check console for debug info.');
        setLoading(false);
        return;
      }

      try {
        // Call the verify endpoint - it handles enrollment automatically
        const response = await api.post(`/api/payment/verify/`, {
          order_number: order_number,
          val_id: val_id,
        });
        if (response.data.success) {
          setPaymentData(response.data.data);

          // Clean up localStorage
          localStorage.removeItem('latest_order_id');
          localStorage.removeItem('payment_redirect');

          // Show success message
          SwalUtils.success(
            `You have been enrolled in ${response.data.data.enrollment_count} course(s).`,
            'Payment Successful! 🎉'
          );
        } else {
          setError(response.data.message);
          SwalUtils.error('Verification Failed', response.data.message);
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to verify payment';
        setError(errorMessage);
        SwalUtils.error('Payment Verification Error', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  if (loading) {
    return (
      <div className="pt-fnavbar flex items-center justify-center p-4 min-h-screen">
        <div className="w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <Spinner />
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">Verifying Payment</h1>
          <p className="text-gray-600 mt-2">Please wait while we confirm your payment...</p>
          <p className="text-sm text-gray-500 mt-4 font-medium">
            Do not close or refresh this page.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-fnavbar flex items-center justify-center p-4 min-h-screen">
        <div className="w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Verification Failed</h1>
          <p className="text-gray-600 mt-2">{error}</p>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => navigate('/courses')}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Browse Courses
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full text-blue-600 font-medium hover:underline"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-fnavbar flex items-center justify-center p-4 min-h-screen">
      <div className="w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <CircleCheck className="w-24 h-24 text-green-500 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-900 mt-6">Payment Successful! 🎉</h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="font-semibold text-gray-900">{paymentData?.order_number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold text-green-600 capitalize">{paymentData?.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Amount Paid</p>
              <p className="font-semibold text-gray-900">
                {paymentData?.currency} {paymentData?.amount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Courses Enrolled</p>
              <p className="font-semibold text-gray-900">{paymentData?.enrollment_count}</p>
            </div>
          </div>
        </div>

        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Enrolled Courses:</h2>
          <ul className="space-y-2">
            {paymentData?.enrolled_courses?.map((course, index) => (
              <li
                key={index}
                className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <CircleCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{course}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/student-dashboard/my-courses')}
            className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition duration-300 text-lg"
          >
            Go to My Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
