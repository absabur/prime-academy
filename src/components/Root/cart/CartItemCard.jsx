import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart, Loader2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useDispatch } from 'react-redux';
import { deleteCart } from '../../../redux/cart/cartAction';

export default function CartItemCard({ item, onSaveForLater }) {
  const { course } = item;
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteCart(item?.id));
  };

  const handleSave = () => {
    setIsSaving(true);
    onSaveForLater(item.id, course.id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <img
        src={course.header_image}
        alt={course.title}
        className="w-full md:w-48 h-32 md:h-auto object-cover rounded-md"
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Link
            to={`/courses/${course.slug}`}
            className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors"
          >
            {course.title}
          </Link>
          <p className="text-sm text-gray-500 mt-1">By Prime Academy</p>
        </div>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t md:border-t-0 md:pt-0">
          <button
            onClick={handleRemove}
            disabled={isRemoving || isSaving}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            {isRemoving ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            Remove
          </button>
          <button
            onClick={handleSave}
            disabled={isRemoving || isSaving}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Heart size={16} />}
            Save for Later
          </button>
        </div>
      </div>

      <div className="flex-shrink-0 text-left md:text-right">
        <p className="text-xl font-bold text-primary">{formatCurrency(course.discounted_price)}</p>
        {course.has_discount && (
          <p className="text-sm text-gray-500 line-through">{formatCurrency(course.price)}</p>
        )}
      </div>
    </div>
  );
}
