import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import DashBoardHeader from '../../../../components/Dashboard/common/DashBoardHeader';
import PaymentTable from '../../../../components/Dashboard/StudentDashboard/StudentPaymentHistory/PaymentTable';
import PaymentFilters from '../../../../components/Dashboard/StudentDashboard/StudentPaymentHistory/PaymentFilters';
import Pagination from '../../../../components/Dashboard/StudentDashboard/StudentPaymentHistory/Pagination';
import PaymentDetailsModal from '../../../../components/Dashboard/StudentDashboard/StudentPaymentHistory/PaymentDetailsModal';
import { paymentService } from '../../../../services/paymentService';
import Swal from 'sweetalert2';

const StudentPaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [allPayments, setAllPayments] = useState([]); // Store all payments for stats
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'created_at',
    direction: 'desc', // 'asc' or 'desc'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    pageSize: 10,
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch all payments for stats (once on mount)
  useEffect(() => {
    fetchAllPayments();
  }, []);

  // Fetch filtered payments when filters, sort, or page change
  useEffect(() => {
    fetchPayments();
  }, [filters, sortConfig, pagination.currentPage]);

  const fetchAllPayments = async () => {
    try {
      const response = await paymentService.getMyPayments({
        page: 1,
        pageSize: 1000, // Get all for stats
        ordering: '-created_at',
      });
      const results = response.data?.results || response.results || [];
      setAllPayments(results);
    } catch (error) {
      console.error('Failed to fetch all payments for stats');
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      
      // Build ordering parameter
      const orderingPrefix = sortConfig.direction === 'desc' ? '-' : '';
      const ordering = `${orderingPrefix}${sortConfig.field}`;
      
      const params = {
        page: pagination.currentPage,
        status: filters.status || undefined,
        ordering,
      };

      const response = await paymentService.getMyPayments(params);
      
      // Handle different response structures
      const results = response.data?.results || response.results || [];
      const count = response.data?.count || response.count || 0;
      
      if (results.length > 0) {
      }
      
      setPayments(results);
      setPagination(prev => ({
        ...prev,
        totalPages: Math.ceil(count / prev.pageSize),
        totalCount: count,
      }));
    } catch (error) {
      // Check if it's a 404 - endpoint might not be implemented yet
      if (error.response?.status === 404) {
        Swal.fire({
          icon: 'info',
          title: 'Payment History Not Available',
          text: 'The payment history feature is not yet available on the backend. Please contact support.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3b82f6',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Load Payments',
          text: error.response?.data?.detail || error.response?.data?.message || 'Unable to fetch payment history. Please try again.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3b82f6',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page on filter change
  };

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page on sort change
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (payment) => {
    // Handle both payment object and orderId string
    const orderId = typeof payment === 'object' ? payment.id : payment;
    setSelectedOrderId(orderId);
    setShowDetailsModal(true);
  };

  const handleDownloadInvoice = async (orderId, orderNumber) => {
    try {
      // Show loading indicator
      Swal.fire({
        title: 'Downloading Invoice...',
        text: 'Please wait while we prepare your invoice',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await paymentService.downloadInvoice(orderId, orderNumber);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Invoice Downloaded',
        text: 'Your invoice has been downloaded successfully',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Failed to download invoice:', error);
      Swal.fire({
        icon: 'error',
        title: 'Download Failed',
        text: error.response?.data?.detail || 'Unable to download invoice. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3b82f6',
      });
    }
  };

  return (
    <div>
      <DashBoardHeader title="Payment History" searchBar={false} />

      {/* Stats Summary (always show if data available, using allPayments) */}
      {!loading && allPayments.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4 mx-4">
          <div className="bg-white rounded-lg shadow border border-black/10 p-3">
            <p className="text-xs text-gray-500 mb-0.5">Total Orders</p>
            <p className="text-xl font-bold text-gray-900">{allPayments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow border border-black/10 p-3">
            <p className="text-xs text-gray-500 mb-0.5">Completed</p>
            <p className="text-xl font-bold text-green-600">
              {allPayments.filter(p => p.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow border border-black/10 p-3">
            <p className="text-xs text-gray-500 mb-0.5">Failed</p>
            <p className="text-xl font-bold text-red-600">
              {allPayments.filter(p => p.status === 'failed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow border border-black/10 p-3">
            <p className="text-xs text-gray-500 mb-0.5">Pending</p>
            <p className="text-xl font-bold text-yellow-600">
              {allPayments.filter(p => p.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow border border-black/10 p-3">
            <p className="text-xs text-gray-500 mb-0.5">Processing</p>
            <p className="text-xl font-bold text-blue-600">
              {allPayments.filter(p => p.status === 'processing').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow border border-black/10 p-3">
            <p className="text-xs text-gray-500 mb-0.5">Cancelled</p>
            <p className="text-xl font-bold text-gray-600">
              {allPayments.filter(p => p.status === 'cancelled').length}
            </p>
          </div>
        </div>
      )}

      {/* Filter and Table Container */}
      <div className="bg-white rounded-lg shadow-md border border-black/10 m-md overflow-hidden">
        {/* Filter Section - Right aligned above table */}
        <div className="p-md border-b border-gray-200 flex justify-end">
          <PaymentFilters 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Payment Table */}
        <PaymentTable
          payments={payments}
          loading={loading}
          onViewDetails={handleViewDetails}
          onDownloadInvoice={handleDownloadInvoice}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>

      {/* Pagination */}
      {!loading && payments.length > 0 && pagination.totalPages > 1 && (
        <div className="m-md">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* No Results Message */}
      {!loading && payments.length === 0 && filters.status && (
        <div className="bg-white rounded-lg shadow-md border border-black/10 p-lg m-md text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Payments Found</h3>
          <p className="text-gray-600 mb-6">
            No payments match your current filters. Try adjusting your search criteria.
          </p>
          <button
            onClick={() => handleFilterChange({ status: '' })}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Payment Details Modal */}
      {showDetailsModal && (
        <PaymentDetailsModal
          orderId={selectedOrderId}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedOrderId(null);
          }}
        />
      )}
    </div>
  );
};

export default StudentPaymentHistory;
