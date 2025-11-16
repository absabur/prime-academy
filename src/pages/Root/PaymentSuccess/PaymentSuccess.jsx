import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import { CircleCheck, Loader2 } from 'lucide-react'; // Optional: for icons
import SwalUtils from '../../../utils/sweetAlert';

// You can create a simple spinner component or use one from a library
const Spinner = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
  </div>
);

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Verifying your payment...');
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);

  const navigate = useNavigate();

  // Helper function for showing errors with SweetAlert and navigating
  const showErrorAndNavigate = (title, text, path = '/courses') => {
    setLoading(false); // Stop loading
    SwalUtils.error(title, text);
    {
      localStorage.removeItem('latest_order_id'); // Clean up
      navigate(path);
    }
  };

  useEffect(() => {
    // 1. Get Order ID from Local Storage
    const order_id = localStorage.getItem('latest_order_id');

    if (!order_id) {
      showErrorAndNavigate(
        'No Order Found',
        "We couldn't find an order ID to verify. Please try your purchase again."
      );
      return;
    }

    // 2. Main Verification and Enrollment Flow
    const processPayment = async () => {
      try {
        // --- Step 1: Fetch Order ---
        setLoadingMessage('Fetching order details...');
        const orderResponse = await api.get(
          `${import.meta.env.VITE_API_URL}/api/orders/${order_id}/`
        );
        const orderData = orderResponse?.data?.data;

        if (!orderData) {
          throw new Error('Order data could not be retrieved.');
        }

        // --- Step 2: Verify Payment ---
        setLoadingMessage('Confirming payment status...');
        const paymentVerify = await api.post(
          `${import.meta.env.VITE_API_URL}/api/payment/verify/`,
          {
            order_number: orderData.order_number,
          }
        );

        // --- Step 3: Check Status ---
        if (orderData.status === 'completed' && paymentVerify?.data?.success) {
          setOrder(orderData); // Triggers the next useEffect

          // --- Step 4: Enroll in Courses ---
          setLoadingMessage('Enrolling you in your courses...');

          if (!orderData.items || orderData.items.length === 0) {
            throw new Error('No items found in this order to enroll.');
          }

          // Use Promise.all to wait for all enrollments
          const enrollmentPromises = orderData.items.map((item) => {
            return api.post(`${import.meta.env.VITE_API_URL}/api/enrollments/`, {
              user: orderData.user,
              course: item.id, // Assuming item.id is the course ID
              order: orderData.id,
            });
          });

          await Promise.all(enrollmentPromises);

          // --- Step 5: Complete ---
          localStorage.removeItem('latest_order_id');
          setLoading(false);
          setEnrollmentComplete(true);
        } else {
          // Payment failed verification
          throw new Error('Payment verification failed or order is not marked as completed.');
        }
      } catch (error) {
        // Handle any error from the try block
        console.error(error); // Log for debugging
        const errorMessage =
          error.response?.data?.message || error.message || 'An unknown error occurred.';
        showErrorAndNavigate(
          'Payment Failed',
          `There was an issue processing your payment: ${errorMessage}`
        );
      }
    };

    processPayment();

    // Cleanup function for safety
    return () => {
      // If component unmounts, stop loading
      setLoading(false);
    };
  }, [navigate]); // Only run once on mount

  // UI Rendering Logic
  return (
    <div className="pt-fnavbar flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {loading && (
          <>
            <Spinner />
            <h1 className="text-2xl font-semibold text-gray-800 mt-4">Processing Your Order</h1>
            <p className="text-gray-600 mt-2">{loadingMessage}</p>
            <p className="text-sm text-gray-500 mt-4 font-medium">
              Please do not close or refresh this page.
            </p>
          </>
        )}

        {enrollmentComplete && (
          <>
            <CircleCheck className="w-20 h-20 text-green-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Payment Successful!</h1>
            <p className="text-gray-600 mt-2">You are now enrolled in the following courses:</p>

            <ul className="text-left list-disc list-inside bg-gray-50 p-4 rounded-md my-6 border">
              {order?.items?.map((item) => (
                <li key={item.id} className="text-gray-700 font-medium">
                  {item.title || 'Course Item'}
                </li> // Assuming 'item.title'
              ))}
            </ul>

            <button
              onClick={() => navigate('/student-dashboard')} // Navigate to dashboard
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Go to Your Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
