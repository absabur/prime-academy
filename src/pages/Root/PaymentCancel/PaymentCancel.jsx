import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import SwalUtils from '../../../utils/sweetAlert';

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get transaction details from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tran_id = urlParams.get('tran_id');
    
    // Clean up localStorage
    localStorage.removeItem('latest_order_id');

    // Show info notification
    SwalUtils.info(
      'Payment Cancelled',
      'You have cancelled the payment process.'
    );

    // Log for debugging
    console.log('Payment cancelled for transaction:', tran_id);
  }, []);

  return (
    <div className="pt-fnavbar flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
        <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Payment Cancelled</h1>
        <p className="text-gray-600 mt-2">
          You have cancelled the payment process. Your order has not been completed.
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-yellow-800">
            No charges have been made to your account.
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            Your items are still in your cart if you'd like to complete the purchase later.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Return to Cart
          </button>
          
          <button
            onClick={() => navigate('/courses')}
            className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Continue Shopping
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full text-blue-600 font-medium hover:underline"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
