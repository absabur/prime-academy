import { Filter } from 'lucide-react';

const PaymentFilters = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value || '' });
  };

  const handleClearFilters = () => {
    onFilterChange({ status: '' });
  };

  const hasActiveFilters = filters.status;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by Status</label>
      </div>
      <select
        value={filters.status || ''}
        onChange={handleStatusChange}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="failed">Failed</option>
        <option value="refunded">Refunded</option>
        <option value="cancelled">Cancelled</option>
      </select>
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default PaymentFilters;
