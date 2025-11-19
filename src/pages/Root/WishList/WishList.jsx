import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react'; // Changed icon to Heart
import { fetchWishlist } from '../../../redux/wishlist/wishlistAction'; // Assumed new action
import { clearError, clearMessage } from '../../../redux/wishlist/wishlistSlice'; // Assumed new slice
import OuterSection from '../../../components/common/OuterSection';
import InnerSection from '../../../components/common/InnerSection';
import PrimaryButton from '../../../components/common/PrimaryButton';
import SwalUtils from '../../../utils/sweetAlert';
import WishlistItemCard from '../../../components/Root/WishList/WishListItemCard';
import SecondaryButton from '../../../components/common/SecondaryButton';
import LoadingDashboard from '../../../components/Dashboard/common/LoadingDashboard';

export default function WishlistPage() {
  // Note: Assuming a 'wishlist' slice instead of 'cart'
  const { wishlist, error, message, loadingWishlists } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      SwalUtils.info(message, 'Success');
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      SwalUtils.error(error, 'Something went Wrong!');
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Fetch wishlist on mount
  useEffect(() => {
    dispatch(fetchWishlist()); // Assumed new action
  }, [dispatch]);

  // --- Render Logic ---
  if (!wishlist || wishlist?.courses?.length === 0) {
    return (
      <OuterSection className="pt-fnavbar">
        <InnerSection className="text-center">
          <div className="bg-white p-12 rounded-lg mx-auto">
            <Heart className="w-20 h-20 mx-auto text-gray-300" />
            <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-4">Your wishlist is empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't saved any courses for later.
            </p>

            <PrimaryButton
              className="text-lg mr-md"
              href={`/courses`}
              suffixIcon={<ArrowRight size={20} />}
              text={`Browse Courses`}
            />

            <SecondaryButton
              className="text-lg hover:text-white border-primary text-primary"
              from={`hero`}
              href={`/cart`}
              suffixIcon={<ShoppingBag size={20} />}
              text={`See Cart`}
            />
          </div>
        </InnerSection>
      </OuterSection>
    );
  }

  if (loadingWishlists) {
    return <LoadingDashboard loading={loadingWishlists} />;
  }

  const itemCount = wishlist?.courses?.length || 0;

  return (
    <div className="pt-fnavbar">
      <div>
        {/* Header */}
        <div className="mb-8 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-lg text-gray-600 mt-1">
            You have {itemCount} {itemCount > 1 ? 'courses' : 'course'} saved for later.
          </p>
        </div>

        {/* Wishlist Items List */}
        {/* We removed the grid layout, as there's no summary card */}
        <div className="mx-auto space-y-6">
          {wishlist?.courses?.map((item) => (
            <WishlistItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
