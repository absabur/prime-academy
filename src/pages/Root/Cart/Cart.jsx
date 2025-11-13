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

const removeCartItem = (itemId) => ({ type: 'cart/removeCartItem/pending', payload: itemId });
const saveForLater = (data) => ({ type: 'cart/saveForLater/pending', payload: data });
// --- End Mock Thunks ---

export default function ShoppingCartPage() {
  // Assuming 'status' and 'error' are also in your cart slice
  const { carts, error, message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      SwalUtils.success(
        message == 'Added to cart' ? 'The course is now in your shopping cart' : message,
        message == 'Added to cart' ? 'Added to Cart!' : 'Success'
      );
      dispatch(clearMessage());
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      SwalUtils.success(message, 'Somthing went Wrong!');
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

  // --- Corrected API Functionality ---

  const handleSaveForLater = (itemId, courseId) => {
    console.log(`Dispatching save for later: ${itemId} (Course: ${courseId})`);
    // Dispatch the Redux thunk for saving for later
    dispatch(saveForLater({ itemId, courseId }));
  };

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
              <CartItemCard key={item.id} item={item} onSaveForLater={handleSaveForLater} />
            ))}
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <OrderSummaryCard
              preCouponTotal={preCouponTotal}
              originalPrice={originalSubtotal}
              cartItems={carts?.items}
            />
          </div>
        </div>
      </InnerSection>
    </OuterSection>
  );
}
