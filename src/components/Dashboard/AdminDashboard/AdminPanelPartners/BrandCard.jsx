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
            className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
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
          <button
            onClick={() => onEdit(id)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {/* Edit Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {/* Delete Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrandCard;
