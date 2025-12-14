import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useDispatch } from 'react-redux';
import { deleteCart } from '../../../redux/cart/cartAction';

export default function CartItemCard({ item }) {
  const { course } = item;
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteCart(item?.id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <img
        src={course.header_image}
        alt={course.title}
        className="w-full md:w-48 h-32 object-cover rounded-md"
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
          
          {/* Batch Information */}
          {item.batch_info && (
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-300">
              📚 {item.batch_info.batch_name || item.batch_info.display_name || `Batch ${item.batch_info.batch_number}`}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t md:border-t-0 md:pt-0">
          <button
            onClick={handleRemove}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>

      <div className="flex-shrink-0 text-left md:text-right">
        <p className="text-xl font-bold text-primary">{formatCurrency(course.discounted_price)}</p>
        {course.has_discount && (
          <p className="text-sm text-gray-500 line-through">{formatCurrency(course.price)}</p>
        )}
        
        {/* Installment Information */}
        {item.batch_info?.has_installment && (
          <div className="mt-2 text-xs text-blue-600 font-semibold">
            💳 {item.batch_info.installment_preview.description}
          </div>
        )}
      </div>
    </div>
  );
}
