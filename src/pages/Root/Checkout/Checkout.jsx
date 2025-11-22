import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { userProfile } from '../../../redux/auth/authAction';
import { fetchCarts } from '../../../redux/cart/cartAction';
import { buildOrderPayload, calculateOrderTotals } from '../../../utils/checkout';
import { BillingForm } from '../../../components/Root/checkout/BillingForm';
import { OrderSummary } from '../../../components/Root/checkout/OrderSummary';
import { EmptyCart } from '../../../components/Root/checkout/CheckoutComponents';

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

    let firstCourse = carts.items[0]?.course?.slug;

    let is_installment = false;
    let installment_plan = 0;
    let installment_price = 0;

    try {
      const courseResponse = await api.get(`/api/courses/${firstCourse}/`);
      const pricing = courseResponse?.data?.data?.pricing;

      is_installment = pricing?.installment_available;
      installment_plan = pricing?.installment_count;
      installment_price = pricing?.installment_amount;
    } catch (error) {
      console.error('Error fetching course details:', error);
      setError('Failed to fetch course details. Please try again.');
      setIsPlacingOrder(false);
      return;
    }

    const orderPayload = buildOrderPayload(
      billingDetails,
      carts,
      totals,
      couponCode,
      is_installment,
      installment_plan,
      installment_price
    );

    try {
      // Create order
      const orderResponse = await api.post('/api/orders/', orderPayload);
      const orderData = orderResponse?.data;

      if (!orderData.success) {
        const errorMsg = Object.values(orderData).flat().join(' ') || 'Failed to create order.';
        throw new Error(errorMsg);
      }

      localStorage.setItem('latest_order_id', orderData.data.id);

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
    <div>
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
    </div>
  );
}
