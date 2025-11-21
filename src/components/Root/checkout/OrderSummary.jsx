import { Loader2, Lock, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { ErrorAlert, PriceLine } from './CheckoutComponents';

export const OrderSummary = ({
  cartItems,
  originalSubtotal,
  totalDiscount,
  couponCode,
  totalToPay,
  error,
  isPlacingOrder,
}) => (
  <div className="lg:col-span-1">
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Order</h2>

      {/* Cart Items */}
      <div className="space-y-4 divide-y divide-gray-100">
        {cartItems?.map((item) => (
          <div key={item.id} className="flex justify-between items-center pt-4 first:pt-0">
            <div className="flex-1 mr-4">
              <p className="text-gray-800 font-medium leading-tight">{item.course.title}</p>
              <p className="text-sm text-gray-500">
                1 x {formatCurrency(item.course.discounted_price)}
              </p>
            </div>
            <span className="font-medium text-gray-900 text-right">
              {formatCurrency(item.subtotal)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 my-5"></div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <PriceLine label="Original Price" value={formatCurrency(originalSubtotal)} />
        <PriceLine
          label="Total Discount"
          value={`-${formatCurrency(totalDiscount)}`}
          className="text-green-600"
        />
        {couponCode && (
          <PriceLine label={`Coupon (${couponCode})`} value="Applied" className="text-green-600" />
        )}
        <div className="border-t border-gray-200 my-2"></div>
        <div className="flex justify-between items-center text-xl font-bold text-gray-900">
          <span>Total to Pay</span>
          <span className="text-2xl text-primary">{formatCurrency(totalToPay)}</span>
        </div>
      </div>

      {/* Place Order Section */}
      <div className="mt-6">
        <p className="text-xs text-gray-500 text-center mb-4">
          By placing your order, you agree to our Terms of Service and Privacy Policy.
        </p>

        {error && <ErrorAlert message={error} />}

        <button
          type="submit"
          disabled={isPlacingOrder}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white text-center py-3 rounded-lg font-semibold text-lg hover:bg-secondary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPlacingOrder ? <Loader2 size={24} className="animate-spin" /> : <Lock size={18} />}
          {isPlacingOrder ? 'Processing...' : `Place Order (${formatCurrency(totalToPay)})`}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-5">
        <ShieldCheck size={16} />
        <span>SSL Secure Payment</span>
      </div>
    </div>
  </div>
);
