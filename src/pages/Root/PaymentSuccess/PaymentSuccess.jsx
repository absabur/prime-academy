import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../api/axios';
import { CircleCheck, HelpCircle, Loader2, ShoppingBag } from 'lucide-react';
import SwalUtils from '../../../utils/sweetAlert';
import PrimaryButton from '../../../components/common/PrimaryButton';
import SecondaryButton from '../../../components/common/SecondaryButton';

const Spinner = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="w-12 h-12 animate-spin text-primary" />
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
      let order_number = urlParams.get('tran_id');
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
          const orderData = response.data.data;
          
          // Always fetch full order details to get batch info and items
          if (latest_order_id) {
            try {
              const orderResponse = await api.get(`/api/orders/${latest_order_id}/`);
              
              const fullOrder = orderResponse.data.data;
              
              // Extract enrolled courses with batch info from order items
              const enrolledCoursesWithBatch = fullOrder.items?.map(item => ({
                course_title: item.course_title || item.course?.title,
                batch_name: item.batch_info?.batch_name || item.batch_info?.display_name,
                batch_number: item.batch_info?.batch_number,
              })) || [];
              
              // Merge order details with payment data
              const fullOrderData = {
                ...orderData,
                is_installment: fullOrder.is_installment,
                installment_plan: fullOrder.installment_plan,
                installments_paid: fullOrder.installments_paid,
                total_amount: fullOrder.total_amount,
                next_payment_due: fullOrder.next_payment_due,
                next_payment_amount: fullOrder.next_payment_amount,
                enrolled_courses: enrolledCoursesWithBatch, // Use courses with batch info
              };
              
              setPaymentData(fullOrderData);
            } catch (orderErr) {
              console.warn('Could not fetch full order details:', orderErr);
              setPaymentData(orderData);
            }
          } else {
            setPaymentData(orderData);
          }

          // Clear cart
          await api.post(`${import.meta.env.VITE_API_URL}/api/cart/clear/`, {
            order_id: latest_order_id,
          });

          // Clean up localStorage
          localStorage.removeItem('latest_order_id');
          localStorage.removeItem('payment_redirect');

          // Show success message
          SwalUtils.success(
            `You have been enrolled in ${response.data.data.enrollment_count} course(s).`,
            'Payment Successful! 🎉'
          );
          setTimeout(() => {
            navigate('/student-dashboard/my-courses');
          }, 8000);
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
      <div className="flex items-center justify-center p-4">
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
      <div className="flex items-center justify-center p-4">
        <div className="w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Verification Failed</h1>
          <p className="text-gray-600 mt-2">{error}</p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <PrimaryButton href={`/cart`} text={`Try Again`} prefixIcon={<ShoppingBag />} />
            <SecondaryButton
              href={`/courses`}
              text={`Browse Courses`}
              className="text-primary border-primary hover:text-white"
            />
            <PrimaryButton href={`/contact`} text={`Contact Support`} prefixIcon={<HelpCircle />} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <CircleCheck className="w-24 h-24 text-green-500 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-900 mt-6">Payment Successful! 🎉</h1>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
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
              <p className="text-sm text-gray-600">
                {paymentData?.is_installment ? 'First Installment Paid' : 'Amount Paid'}
              </p>
              <p className="font-semibold text-gray-900">
                {paymentData?.currency} {
                  paymentData?.is_installment && paymentData?.total_amount && paymentData?.installment_plan
                    ? (parseFloat(paymentData.total_amount) / paymentData.installment_plan).toFixed(2)
                    : paymentData?.amount
                }
              </p>
              {paymentData?.is_installment && (
                <p className="text-xs text-blue-600 mt-1">
                  {paymentData?.installments_paid || 1}/{paymentData?.installment_plan} installments
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {paymentData?.is_installment ? 'Total Course Fee' : 'Courses Enrolled'}
              </p>
              <p className="font-semibold text-gray-900">
                {paymentData?.is_installment 
                  ? `${paymentData?.currency} ${paymentData?.total_amount}`
                  : paymentData?.enrollment_count
                }
              </p>
            </div>
          </div>
          
          {/* Installment Payment Info */}
          {paymentData?.is_installment && (
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm font-semibold text-blue-900 mb-2">💳 Payment Plan Details</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• Total installments: {paymentData?.installment_plan}</p>
                <p>• Paid installments: {paymentData?.installments_paid || 1}</p>
                <p>• Remaining: {(paymentData?.installment_plan - (paymentData?.installments_paid || 1))}</p>
                {paymentData?.next_payment_due && (
                  <p className="text-blue-700 font-medium mt-2">
                    Next payment: {paymentData?.currency} {paymentData?.next_payment_amount} due on {new Date(paymentData?.next_payment_due).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Enrolled Courses:</h2>
          <ul className="space-y-2">
            {paymentData?.enrolled_courses?.map((course, index) => {
              // Check if course is an object with batch info or just a string
              const courseName = typeof course === 'string' ? course : course.course_title || course.title;
              const batchName = typeof course === 'object' ? (course.batch_name || course.batch_info?.batch_name || course.batch_info?.display_name) : null;
              
              return (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <CircleCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-gray-700 font-medium">{courseName}</span>
                    {batchName && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        📚 {batchName}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8">
          <PrimaryButton
            text={`See Your Courses`}
            href={`/student-dashboard/my-courses`}
            className="w-full py-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
