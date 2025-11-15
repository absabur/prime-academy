import React, { useState, useEffect } from 'react';
import api from '@/api/axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loader2, AlertTriangle, Lock, ShieldCheck, ShoppingCart, ArrowLeft } from 'lucide-react';
import OuterSection from '../../../components/common/OuterSection';
import InnerSection from '../../../components/common/InnerSection';
import { userProfile } from '../../../redux/auth/authAction';
import { fetchCarts } from '../../../redux/cart/cartAction';
import { formatCurrency } from '../../../utils/formatCurrency';
import axios from 'axios';

// --- Helper Components ---
const PriceLine = ({ label, value, className = '' }) => (
  <div className={`flex justify-between text-gray-700 ${className}`}>
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <Loader2 className="w-12 h-12 animate-spin text-primary" />
  </div>
);

const EmptyCart = () => (
  <OuterSection className="pt-fnavbar">
    <InnerSection
      className="flex flex-col justify-center items-center min-h-[50vh] text-center"
      style={{ paddingTop: 0 }}
    >
      <ShoppingCart className="w-16 h-16 text-gray-300" />
      <h1 className="text-2xl font-semibold mt-4">Your cart is empty.</h1>
      <p className="text-gray-600 mt-2">Redirecting ...</p>
    </InnerSection>
  </OuterSection>
);

const ErrorAlert = ({ message }) => (
  <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
    <AlertTriangle size={20} />
    <span className="flex-1">{message}</span>
  </div>
);

const BillingForm = ({ billingDetails, handleChange }) => (
  <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Billing Details</h2>
    <div className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={billingDetails.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={billingDetails.email}
          onChange={handleChange}
          required
          readOnly
          disabled
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-gray-50"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={billingDetails.phone}
          onChange={handleChange}
          required
          placeholder="e.g., 01712345678"
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          id="address"
          value={billingDetails.address}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Street address, building, apartment, etc."
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={billingDetails.city}
            onChange={handleChange}
            required
            placeholder="e.g., Dhaka"
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
            Postcode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="postcode"
            id="postcode"
            value={billingDetails.postcode}
            onChange={handleChange}
            required
            placeholder="e.g., 1200"
            className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="country"
          id="country"
          value={billingDetails.country}
          onChange={handleChange}
          required
          placeholder="e.g., Bangladesh"
          className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
    </div>
  </div>
);

const OrderSummary = ({
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

// --- Calculation Helpers ---
const calculateOrderTotals = (carts, passedState) => {
  const originalSubtotal =
    carts?.items?.reduce((acc, item) => acc + parseFloat(item.course.price), 0) || 0;
  const preCouponTotal = parseFloat(carts?.total) || 0;
  const finalTotalFromCart = passedState.final_total;
  const totalToPay =
    finalTotalFromCart !== null && finalTotalFromCart !== undefined
      ? finalTotalFromCart
      : preCouponTotal;
  const totalDiscount = originalSubtotal - totalToPay;
  const couponDiscountAmount = preCouponTotal - totalToPay;

  return {
    originalSubtotal,
    preCouponTotal,
    totalToPay,
    totalDiscount,
    couponDiscountAmount,
  };
};

const buildOrderPayload = (billingDetails, carts, totals, couponCode) => {
  return {
    billing_name: billingDetails.name,
    billing_email: billingDetails.email,
    billing_phone: billingDetails.phone,
    billing_address: billingDetails.address,
    billing_city: billingDetails.city,
    billing_country: billingDetails.country,
    billing_postcode: billingDetails.postcode,
    currency: 'BDT',
    subtotal: totals.preCouponTotal.toFixed(2),
    discount_amount: totals.couponDiscountAmount.toFixed(2),
    tax_amount: '0.00',
    total_amount: totals.totalToPay.toFixed(2),
    items: carts?.items?.map((item) => ({
      course: item.course.id,
      price: parseFloat(item.course.discounted_price).toFixed(2),
      discount: (parseFloat(item.course.price) - parseFloat(item.course.discounted_price)).toFixed(
        2
      ),
      currency: 'BDT',
    })),
  };
};

// --- Main Checkout Component ---
export default function CheckoutPage() {
  const { carts, status: cartStatus } = useSelector((state) => state.cart);
  const { couponState } = useSelector((state) => state.common);
  const { profile } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postcode: '',
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user profile and cart on mount
  useEffect(() => {
    dispatch(userProfile());
    dispatch(fetchCarts());
  }, [dispatch]);

  // Pre-fill billing details from profile
  useEffect(() => {
    if (profile) {
      setBillingDetails({
        name: `${profile.first_name} ${profile.last_name}`,
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        country: profile.country || 'Bangladesh',
        postcode: profile.postcode || '',
      });
    }
  }, [profile]);

  // Redirect if cart is empty after loading
  useEffect(() => {
    if (cartStatus === 'succeeded' && (!carts?.items || carts?.items?.length === 0)) {
      navigate('/cart');
    }
  }, [cartStatus, carts, navigate]);

  // Get checkout state (from navigation or Redux)
  const passedState = location.state || couponState || {};
  const couponCode = passedState.coupon_code || null;

  // Calculate all order totals
  const totals = calculateOrderTotals(carts, passedState);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle order placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    setError(null);

    const orderPayload = buildOrderPayload(billingDetails, carts, totals, couponCode);

    try {
      // Create order
      const orderResponse = await api.post('/api/orders/', orderPayload);
      const orderData = orderResponse?.data;

      if (!orderData.success) {
        const errorMsg = Object.values(orderData).flat().join(' ') || 'Failed to create order.';
        throw new Error(errorMsg);
      }

      // Clear cart
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/clear/`,
        {
          order_id: orderData.data.id,
        },
        {
          withCredentials: true,
        }
      );
      await api.post(`${import.meta.env.VITE_API_URL}/api/cart/clear/`, {
        order_id: orderData.data.id,
      });

      dispatch(fetchCarts());

      // Initiate payment
      const paymentResponse = await api.post(
        '/api/payment/initiate/',
        { order_id: orderData.data.id },
        { withCredentials: true }
      );

      const paymentData = paymentResponse.data;
      if (!paymentData.success) {
        throw new Error(paymentData.message || 'Failed to initiate payment.');
      }

      // Redirect to payment gateway
      window.location.href = paymentData.data.payment_url;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'An unknown error occurred.');
      setIsPlacingOrder(false);
    }
  };

  // Loading state
  if (cartStatus === 'loading' || cartStatus === 'idle') {
    return <LoadingSpinner />;
  }

  // Redirect to preserve state if needed
  if (location.state == null && couponState?.coupon_code) {
    return <Navigate to={location.pathname} replace state={couponState} />;
  }

  // Empty cart state
  if (!carts || carts?.items?.length === 0) {
    setTimeout(() => navigate('/cart'), 1000);
    return <EmptyCart />;
  }

  // Main checkout page
  return (
    <OuterSection className="pt-fnavbar">
      <InnerSection style={{ paddingTop: 0 }}>
        <div className="mb-8">
          <Link to="/cart" className="flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft size={18} /> Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Checkout</h1>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          <BillingForm billingDetails={billingDetails} handleChange={handleChange} />
          <OrderSummary
            cartItems={carts?.items}
            originalSubtotal={totals.originalSubtotal}
            totalDiscount={totals.totalDiscount}
            couponCode={couponCode}
            totalToPay={totals.totalToPay}
            error={error}
            isPlacingOrder={isPlacingOrder}
          />
        </form>
      </InnerSection>
    </OuterSection>
  );
}
