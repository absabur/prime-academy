import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart as EmptyCartIcon, ArrowRight } from 'lucide-react';
import { fetchCarts } from '../../../redux/cart/cartAction';
import OuterSection from '../../../components/common/OuterSection';
import InnerSection from '../../../components/common/InnerSection';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { clearError, clearMessage } from '../../../redux/cart/cartSlice';
import SwalUtils from '../../../utils/sweetAlert';
import CartItemCard from '../../../components/Root/cart/CartItemCard';
import OrderSummaryCard from '../../../components/Root/cart/OrderSummeryCard';
import LoadingDashboard from '../../../components/Dashboard/common/LoadingDashboard';
// --- End Mock Thunks ---

export default function ShoppingCartPage() {
  // Assuming 'status' and 'error' are also in your cart slice
  const { carts, error, message, loadingCarts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  // Get installment info from batch level using has_installment flag
  const firstItemBatch = carts?.items?.[0]?.batch_info;
  const installmentInfo = firstItemBatch?.has_installment ? firstItemBatch.installment_preview : null;
  const paymentSummary = carts?.payment_summary;

  useEffect(() => {
    if (message) {
      SwalUtils.info(message, 'Success');
      dispatch(clearMessage());
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      SwalUtils.error(error, 'Somthing went Wrong!');
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  // --- Calculations ---
  // We derive these from the Redux state `carts`
  const originalSubtotal =
    carts?.items?.reduce((acc, item) => acc + parseFloat(item.course.price), 0) || 0;

  // This is the total *after* item discounts but *before* coupons
  const preCouponTotal = parseFloat(carts?.total) || 0;

  // --- Render Logic ---
  if (!carts || carts?.items?.length === 0) {
    return (
      <OuterSection className="pt-fnavbar">
        <InnerSection className="text-center">
          <div className="bg-white p-12 rounded-lg">
            <EmptyCartIcon className="w-20 h-20 mx-auto text-gray-300" />
            <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any courses yet.
            </p>

            <PrimaryButton
              className="text-lg"
              href={`/courses`}
              suffixIcon={<ArrowRight size={20} />}
              text={`Browse Courses`}
            />
          </div>
        </InnerSection>
      </OuterSection>
    );
  }

  if (loadingCarts) {
    return <LoadingDashboard loading={loadingCarts} />;
  }

  return (
    <OuterSection className="pt-fnavbar">
      <InnerSection>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-lg text-gray-600 mt-1">
            You have {carts?.item_count} {carts?.item_count > 1 ? 'courses' : 'course'} in your
            cart.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {carts?.items?.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <OrderSummaryCard
              preCouponTotal={preCouponTotal}
              originalPrice={originalSubtotal}
              cartItems={carts?.items}
              installmentInfo={installmentInfo}
              paymentSummary={paymentSummary}
            />
          </div>
        </div>
      </InnerSection>
    </OuterSection>
  );
}
