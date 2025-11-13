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

const PriceLine = ({ label, value, className = '' }) => (
  <div className={`flex justify-between text-gray-700 ${className}`}>
    <span>{label}</span> <span className="font-medium">{value}</span>
  </div>
);

// --- Main Checkout Page Component ---
export default function CheckoutPage() {
  const { carts, status: cartStatus } = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
    dispatch(fetchCarts());
  }, [dispatch]); // Added dispatch to dependency array
  // --- State Management ---

  const [billingDetails, setBillingDetails] = useState({
    // Pre-filled from your user context
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Check if profile exists before setting
    if (profile) {
      setBillingDetails({
        name: `${profile.first_name} ${profile.last_name}`,
        email: profile.email || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState(null); // --- Data from Cart & Previous Page ---
  // Get coupon and final total from the cart page's <Link> state

  const passedState = location.state || {};
  const couponCode = passedState.coupon_code || null;
  const finalTotalFromCart = passedState.final_total; // Calculate totals

  const originalSubtotal =
    carts?.items?.reduce((acc, item) => acc + parseFloat(item.course.price), 0) || 0; // The total *before* coupon, but *after* item discounts (e.g., 5100.00)

  const preCouponTotal = parseFloat(carts?.total) || 0; // The final price to be paid. Use the one from the Link state if available,
  // otherwise, fall back to the cart's total (no coupon).

  const totalToPay =
    finalTotalFromCart !== null && finalTotalFromCart !== undefined
      ? finalTotalFromCart
      : preCouponTotal; // Total discount (item markdowns + coupon)

  // --- THIS IS THE CORRECTION ---
  const totalDiscount = originalSubtotal - totalToPay;
  // Specific coupon discount (the difference between pre-coupon total and final total)
  const couponDiscountAmount = preCouponTotal - totalToPay; // --- Effects ---
  // Redirect if cart is empty
  // --- END CORRECTION ---

  useEffect(() => {
    // If the cart is loaded and is empty, send user back
    if (cartStatus === 'succeeded' && (!carts?.items || carts?.items?.length === 0)) {
      navigate('/cart');
    }
  }, [cartStatus, carts, navigate]); // --- Form Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  }; // --- API Functionality: Place Order ---

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    setError(null);

    const orderPayload = {
      billing_name: billingDetails.name,
      billing_email: billingDetails.email,
      billing_phone: billingDetails.phone,
      currency: 'BDT', // Or get from cart
      // This is the subtotal *before* the coupon, but *after* item discounts.

      subtotal: preCouponTotal.toFixed(2),

      // --- THIS IS THE CORRECTED FIELD ---
      // This is *only* the discount from the coupon.
      discount_amount: couponDiscountAmount.toFixed(2),
      // --- END CORRECTION ---

      tax_amount: '0.00',
      total_amount: totalToPay.toFixed(2), // coupon: couponCode, // API schema expects coupon *UUID*, not code.
      // If you have the coupon UUID (e.g., from the validation response), pass it here.

      items: carts?.items?.map((item) => ({
        course: item.course.id,
        // The price for the item is its discounted price (pre-coupon)
        price: parseFloat(item.course.discounted_price).toFixed(2),
        // The discount for the item is the markdown from its original price
        discount: (
          parseFloat(item.course.price) - parseFloat(item.course.discounted_price)
        ).toFixed(2),
        currency: 'BDT',
      })),
    };

    try {
      // 2. API CALL: POST /api/orders/
      const orderResponse = await api.post('/api/orders/', { ...orderPayload });

      const orderData = orderResponse?.data; // API Response: OrderDetail

      console.log(orderData);

      // Assuming a successful response has an 'id' or 'order_number'
      if (!orderData.success) {
        // Handle validation errors, e.g., "phone: This field is required"
        const errorMsg = Object.values(orderData).flat().join(' ') || 'Failed to create order.';
        throw new Error(errorMsg);
      }

      await api.post('/api/cart/clear/', {
        order_id: orderData.id, // Send the new order's UUID
      });

      dispatch(fetchCarts());

      // NOTE: Using `api.post` for consistency, but your `fetch` is also fine.
      const paymentResponse = await api.post('/api/payment/initiate/', {
        order_id: orderData.id, // Send the new order's UUID
      });

      const paymentData = paymentResponse.data; // Axios wraps in `data`
      if (!paymentData.success) {
        throw new Error(paymentData.message || 'Failed to initiate payment.');
      } // 4. REDIRECT: Send user to the payment gateway

      window.location.href = paymentData.data.payment_url;
    } catch (err) {
      console.error(err);
      // Check for Axios error structure
      console.log(err);
      setError(err.response?.data?.message || err.message || 'An unknown error occurred.');
      setIsPlacingOrder(false);
    }
  };

  if (cartStatus === 'loading' || cartStatus === 'idle') {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!carts || carts?.items?.length === 0) {
    setTimeout(() => {
      navigate(`/cart`);
    }, 1000);
    return (
      <OuterSection className="pt-fnavbar">
        <InnerSection className="flex flex-col justify-center items-center min-h-[50vh] text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300" />
          <h1 className="text-2xl font-semibold mt-4">Your cart is empty.</h1>
          <p className="text-gray-600 mt-2">Redirecting you back to the cart...</p>
        </InnerSection>
      </OuterSection>
    );
  }

  return (
    <OuterSection className="pt-fnavbar">
      <InnerSection>
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
          {/* Billing Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Billing Details</h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
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
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={billingDetails.email}
                  onChange={handleChange}
                  required
                  readOnly // Email from profile should not be changed here
                  disabled
                  className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
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
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Order</h2>
              <div className="space-y-4 divide-y divide-gray-100">
                {carts?.items?.map((item) => (
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
              <div className="border-t border-gray-200 my-5"></div> {/* Totals */}
              <div className="space-y-3">
                <PriceLine label="Original Price" value={formatCurrency(originalSubtotal)} />
                <PriceLine
                  label="Total Discount"
                  value={`-${formatCurrency(totalDiscount)}`}
                  className="text-green-600"
                />
                {couponCode && (
                  <PriceLine
                    label={`Coupon (${couponCode})`}
                    value="Applied"
                    className="text-green-600"
                  />
                )}
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>Total to Pay</span>
                  <span className="text-2xl text-primary">{formatCurrency(totalToPay)}</span>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-gray-500 text-center mb-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
                {/* Error Message Display */}
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
                    <AlertTriangle size={20} /> <span className="flex-1">{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white text-center py-3 rounded-lg font-semibold text-lg hover:bg-secondary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isPlacingOrder ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <Lock size={18} />
                  )}
                  {isPlacingOrder ? 'Processing...' : `Place Order (${formatCurrency(totalToPay)})`}
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-5">
                <ShieldCheck size={16} /> <span>SSL Secure Payment</span>
              </div>
            </div>
          </div>
        </form>
      </InnerSection>
    </OuterSection>
  );
}
