import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import { FaEdit, FaTrash } from 'react-icons/fa';

// --- You can split this into its own BrandCard.jsx file if you want ---
function BrandCard({ brand, onStatusChange, onEdit, onDelete }) {
  const { id, logo, is_active } = brand;

  // Handle toggle change
  const handleToggle = () => {
    // We pass the new value (!is_active) back up
    onStatusChange(id, 'is_active', !is_active);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* 1. Logo Section */}
      <div className="h-40 flex items-center justify-center p-4 bg-gray-50">
        <img src={logo} alt="Brand Logo" className="max-h-full max-w-full object-contain" />
      </div>

      <div className="p-4">
        {/* 2. Status Toggle Section */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            {is_active ? 'Active' : 'Inactive'}
          </span>
          {/* A clean, modern toggle switch */}
          <button
            onClick={handleToggle}
            role="switch"
            aria-checked={is_active}
            className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
              ${is_active ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <span
              aria-hidden="true"
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${is_active ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* 3. Action Buttons Section */}
        <div className="grid grid-cols-2 gap-3">
          <SecondaryButton
            minWidth="fit"
            onClick={() => onEdit(id)}
            className="border-primary text-primary hover:text-white"
            text={`Edit`}
            prefixIcon={<FaEdit />}
          />
          <PrimaryButton
            minWidth="fit"
            onClick={() => onDelete(id)}
            text={`Delete`}
            prefixIcon={<FaTrash />}
          />
        </div>
      </div>
    </div>
  );
}

export default BrandCard;
