import { useEffect } from 'react';
import { AlertCircle, Home, ShoppingBag, ShoppingBasket } from 'lucide-react';
import SwalUtils from '../../../utils/sweetAlert';
import PrimaryButton from '../../../components/common/PrimaryButton';
import SecondaryButton from '../../../components/common/SecondaryButton';

const PaymentCancel = () => {
  useEffect(() => {
    // Get transaction details from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tran_id = urlParams.get('tran_id');
    let orderid = localStorage.getItem('latest_order_id');

    // Clean up localStorage
    localStorage.removeItem('latest_order_id');

    if (orderid) {
      // Show info notification
      SwalUtils.info('You have cancelled the payment process.', 'Payment Cancelled');
    }
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <AlertCircle className="w-20 h-20 text-secondary mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Payment Cancelled</h1>
        <p className="text-gray-600 mt-2">
          You have cancelled the payment process. Your order has not been completed.
        </p>

        <div className="bg-secondary/10 border border-secondary-light rounded-lg p-4 mt-6">
          <p className="text-sm text-primary">No charges have been made to your account.</p>
          <p className="text-sm text-primary mt-2">
            Your items are still in your cart if you'd like to complete the purchase later.
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <PrimaryButton href={`/cart`} text={`Return to Cart`} prefixIcon={<ShoppingBag />} />
          <SecondaryButton
            href={`/courses`}
            text={`Continue Shopping`}
            className="text-primary border-primary hover:text-white"
            prefixIcon={<ShoppingBasket />}
          />
          <PrimaryButton href={`/`} text={`Home`} prefixIcon={<Home />} />
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
