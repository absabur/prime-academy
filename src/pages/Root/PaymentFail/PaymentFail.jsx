import { useEffect } from 'react';
import { HelpCircle, Home, ShoppingBag, XCircle } from 'lucide-react';
import SwalUtils from '../../../utils/sweetAlert';
import PrimaryButton from '../../../components/common/PrimaryButton';
import SecondaryButton from '../../../components/common/SecondaryButton';

const PaymentFail = () => {
  useEffect(() => {
    // Get transaction details from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tran_id = urlParams.get('tran_id');
    let orderid = localStorage.getItem('latest_order_id');

    // Clean up localStorage
    localStorage.removeItem('latest_order_id');

    if (orderid) {
      SwalUtils.error(
        'Your payment could not be processed. Please try again or contact support if the issue persists.',
        'Payment Failed'
      );
    }

    // Log for debugging
    console.error('Payment failed for transaction:', tran_id);
  }, []);

  return (
    <div className="pt-fnavbar flex items-center justify-center p-4 min-h-screen">
      <div className="w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Payment Failed</h1>
        <p className="text-gray-600 mt-2">Unfortunately, your payment could not be processed.</p>

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
};

export default PaymentFail;
