import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import SwalUtils from '../../../utils/sweetAlert';

const PaymentFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get transaction details from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tran_id = urlParams.get('tran_id');
    
    // Clean up localStorage
    localStorage.removeItem('latest_order_id');

    // Show error notification
    SwalUtils.error(
      'Payment Failed',
      'Your payment could not be processed. Please try again or contact support if the issue persists.'
    );

    // Log for debugging
    console.error('Payment failed for transaction:', tran_id);
  }, []);

  return (
    <div className="pt-fnavbar flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Payment Failed</h1>
        <p className="text-gray-600 mt-2">
          Unfortunately, your payment could not be processed.
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-red-800">
            <strong>Possible reasons:</strong>
          </p>
          <ul className="text-sm text-red-700 text-left mt-2 space-y-1">
            <li>• Insufficient funds</li>
            <li>• Payment gateway error</li>
            <li>• Card declined by bank</li>
            <li>• Network interruption</li>
          </ul>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/courses')}
            className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
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
};

export default PaymentFail;
