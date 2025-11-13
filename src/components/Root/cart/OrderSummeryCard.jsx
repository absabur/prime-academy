import { useState } from 'react';
import api from '@/api/axios';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, Tag, Loader2, AlertCircle } from 'lucide-react';
import SecondaryButton from '../../../components/common/SecondaryButton';
import { formatCurrency } from '../../../utils/formatCurrency';

const PriceLine = ({ label, value, className = '' }) => (
  <div className={`flex justify-between text-gray-700 ${className}`}>
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default function OrderSummaryCard({ preCouponTotal, originalPrice, cartItems }) {
  // State for the coupon logic
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponResult, setCouponResult] = useState(null); // Stores the API response data

  // --- Derived Values ---
  const initialDiscount = parseFloat(originalPrice) - parseFloat(preCouponTotal);
  const couponDiscount = couponResult ? parseFloat(couponResult.discount_amount) : 0;
  const totalDiscount = initialDiscount + couponDiscount;
  const finalTotal = parseFloat(preCouponTotal) - couponDiscount;

  // --- API Functionality ---
  const handleApplyCoupon = async () => {
    if (!couponCode) return;

    if (!cartItems || cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    // API requires a course_id. We'll use the first one.
    const courseId = cartItems[0].course.id;

    setIsLoading(true);
    setError(null);
    setCouponResult(null);

    try {
      // API CALL: POST /api/courses/coupons/validate/
      const response = await api.post('/api/courses/coupons/validate/', {
        code: couponCode,
        course_id: courseId,
      });

      const data = response?.data;
      if (!data?.success) {
        throw new Error(data.message || 'Invalid coupon code.');
      }

      // --- Success! ---
      // data.data is the object you provided
      setCouponResult(data?.data);
    } catch (err) {
      setError(err.response.data.data.code[0]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">Summary</h2>

      {/* Coupon Input */}
      <div className="mb-4">
        <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
          Coupon Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="coupon"
            placeholder="Enter coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={isLoading}
            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary/50 focus:border-primary/50 text-sm disabled:bg-gray-50"
          />
          <SecondaryButton
            onClick={handleApplyCoupon}
            text={isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Apply'}
            disabled={isLoading}
            minWidth="fit"
            className="text-primary border-primary hover:text-white"
          />
        </div>
        {/* API Response Messages */}
        {error && (
          <div className="flex items-center gap-1.5 text-sm text-red-600 mt-2">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
        {couponResult && (
          <div className="flex items-center gap-1.5 text-sm text-green-600 mt-2">
            <Tag size={14} />
            {couponResult.message}
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4">
        <PriceLine label="Original Price" value={formatCurrency(originalPrice)} />
        <PriceLine
          label="Discount"
          value={`-${formatCurrency(totalDiscount)}`}
          className="text-green-600"
        />
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Total */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-primary">{formatCurrency(finalTotal)}</span>
      </div>

      {/* Checkout Button */}
      <Link
        to="/checkout"
        state={{
          coupon_code: couponResult ? couponResult.coupon_code : null,
          final_total: finalTotal,
        }}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white text-center py-3 rounded-lg font-semibold text-lg hover:bg-secondary transition-colors"
      >
        <Lock size={18} />
        Proceed to Checkout
      </Link>
      {/* <PrimaryButton text={`Proceed to Checkout`} prefixIcon={<Lock size={18} />} href={`/checkcout`}/> */}

      {/* Secure Payment Info */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-5">
        <ShieldCheck size={16} />
        <span>Secure Payment</span>
      </div>
    </div>
  );
}
