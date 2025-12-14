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
import SwalUtils from '../../../utils/sweetAlert';
import LoadingDashboard from '../../../components/Dashboard/common/LoadingDashboard';
import OuterSection from '../../../components/common/OuterSection';
import InnerSection from '../../../components/common/InnerSection';

// --- Main Checkout Component ---
export default function CheckoutPage() {
  const { carts, status: cartStatus } = useSelector((state) => state.cart);
  const { couponState } = useSelector((state) => state.common);
  const { profile } = useSelector((state) => state.auth);
  const { myCourses } = useSelector((state) => state.course);
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

  // Calculate installment info from filtered items
  const calculateInstallmentInfo = (items) => {
    if (!items || items.length === 0) return null;

    // Check if any item has installment
    const hasInstallmentItems = items.some((item) => item.batch_info?.has_installment);
    if (!hasInstallmentItems) return null;

    // Calculate total first installment amount and total course price
    let totalFirstInstallment = 0;
    let totalCoursePrice = 0;
    let installmentCount = 0;

    items.forEach((item) => {
      if (item.batch_info?.has_installment && item.batch_info?.installment_preview) {
        totalFirstInstallment += parseFloat(item.batch_info.installment_preview.amount || 0);
        installmentCount = item.batch_info.installment_preview.count || 0; // Assuming same plan
      }
      totalCoursePrice += parseFloat(item.subtotal || 0);
    });

    // Generate description
    const description =
      installmentCount > 0
        ? `Pay in ${installmentCount} installments of ৳${totalFirstInstallment.toFixed(2)}`
        : 'Installment payment available';

    return {
      amount: totalFirstInstallment.toFixed(2),
      count: installmentCount,
      total: totalCoursePrice.toFixed(2),
      description: description,
    };
  };

  // Fetch user profile and cart on mount
  useEffect(() => {
    dispatch(userProfile());
    dispatch(fetchCarts());

    // Fetch enrolled courses to check if already enrolled
    import('../../../redux/courses/courseAction').then(({ fetchMyCourses }) => {
      dispatch(fetchMyCourses());
    });
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

  // Check if user is already enrolled in SPECIFIC BATCH of cart courses
  useEffect(() => {
    if (carts?.items && myCourses && myCourses.length > 0) {

      // Check if enrolled in the EXACT batch (not just the course)
      const alreadyEnrolledCourses = carts.items.filter((cartItem) => {
        const cartBatchId = cartItem.batch?.id || cartItem.batch_info?.id;

        return myCourses.some((enrollment) => {
          const courseMatch = enrollment.course_slug === cartItem.course.slug;
          const enrollmentBatchId = enrollment.batch_id || enrollment.batch;

          // MUST match BOTH course AND batch
          const batchMatch = enrollmentBatchId === cartBatchId;

          return courseMatch && batchMatch;
        });
      });

      if (alreadyEnrolledCourses.length > 0) {
        const courseNames = alreadyEnrolledCourses
          .map((item) => {
            const batchName = item.batch_info?.batch_name || item.batch_info?.display_name || '';
            return `${item.course.title} - ${batchName}`;
          })
          .join(', ');

        SwalUtils.warning(`You are already enrolled in: ${courseNames}`, 'Already Enrolled').then(
          () => {
            navigate('/student-dashboard/my-courses');
          }
        );
      } else {
      }
    }
  }, [carts, myCourses, navigate]);

  // Get checkout state (from navigation or Redux)
  const passedState = location.state || couponState || {};
  const couponCode = passedState.coupon_code || null;

  // No filtering needed since mixed payments are blocked
  const filteredCarts = carts;

  // Calculate all order totals based on filtered items
  const totals = calculateOrderTotals(filteredCarts, passedState);

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

    // Check if cart items have installment
    const hasInstallment = filteredCarts?.items?.some((item) => item.batch_info?.has_installment);
    let is_installment = hasInstallment;
    let installment_plan = filteredCarts?.items?.[0]?.batch_info?.installment_preview?.count || 0;

    // Calculate total first installment amount for all items in checkout
    let installment_price = 0;
    if (is_installment) {
      installment_price =
        filteredCarts?.items?.reduce((sum, item) => {
          if (item.batch_info?.has_installment && item.batch_info?.installment_preview) {
            return sum + parseFloat(item.batch_info.installment_preview.amount || 0);
          }
          return sum;
        }, 0) || 0;
    }

    const orderPayload = buildOrderPayload(
      billingDetails,
      filteredCarts,
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

      // Refresh cart to reflect order creation (backend should handle partial clearing)
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

  // Loading state (only show when actively loading)
  if (cartStatus === 'loading') {
    return <LoadingDashboard loading={true} />;
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
          cartItems={filteredCarts?.items}
          originalSubtotal={totals.originalSubtotal}
          totalDiscount={totals.totalDiscount}
          couponCode={couponCode}
          totalToPay={totals.totalToPay}
          error={error}
          isPlacingOrder={isPlacingOrder}
          installmentInfo={calculateInstallmentInfo(filteredCarts?.items)}
        />
      </form>
    </div>
  );
}
