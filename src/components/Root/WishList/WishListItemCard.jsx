import { useDispatch } from 'react-redux';
import { Star, ShoppingCart, X, Trash2 } from 'lucide-react';
import PrimaryButton from '../../common/PrimaryButton';
import { Link } from 'react-router-dom';
import { deleteWishlist, moveToCart } from '../../../redux/wishlist/wishlistAction';
// Import your Redux actions for wishlist removal and adding to cart
// import { removeWishlistItem } from '../../../redux/wishlist/wishlistAction';
// import { addCart } from '../../../redux/cart/cartAction';

// Helper to render star ratings
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
      />
    );
  }
  return stars;
};

export default function WishlistItemCard({ item }) {
  const course = item;
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = () => {
    dispatch(deleteWishlist(course?.id));
  };

  const handleAddToCart = () => {
    dispatch(moveToCart(course?.id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center border border-black/10 transition-shadow duration-300 hover:shadow-lg">
      {/* Course Image */}
      <img
        src={course?.header_image}
        alt={course?.title}
        className="w-full md:w-56 h-40 object-cover flex-shrink-0"
      />

      {/* Course Details */}
      <div className="p-5 flex-1">
        <Link to={`/courses/${course?.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{course?.title}</h3>
        </Link>

        {/* Rating and Meta */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 font-bold">{course?.rating || 4.5}</span>
            {renderStars(course?.rating || 4.5)}
          </div>
          <span className="text-sm text-gray-500">({course?.reviews_count || 0} ratings)</span>
        </div>

        {/* Price - displayed prominently */}
        <div className="text-2xl font-bold text-indigo-600 mb-4 md:mb-0">${course?.price}</div>
      </div>

      {/* Actions Column */}
      <div className="p-5 w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start space-x-4 md:space-x-0 md:space-y-4 border-t md:border-t-0 md:border-l border-gray-100">
        <PrimaryButton
          text="Add to Cart"
          onClick={handleAddToCart}
          suffixIcon={<ShoppingCart size={18} />}
          className="w-auto"
        />
        <button
          onClick={handleRemoveFromWishlist}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-red-500 transition-colors"
          title="Remove from Wishlist"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
