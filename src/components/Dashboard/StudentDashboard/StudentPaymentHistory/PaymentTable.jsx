import { Download, Eye, CreditCard, Calendar, Package, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency, formatPaymentDate, getStatusColor, getPaymentMethodLabel } from '../../../../utils/paymentHelpers';

const PaymentTable = ({ payments, onViewDetails, onDownloadInvoice, loading, sortConfig, onSort }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-black/10 p-12 text-center">
        <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-700 mb-2">No Payment History</h3>
        <p className="text-gray-500">You haven't made any payments yet.</p>
      </div>
    );
  }

  const getSortIcon = (field) => {
    if (sortConfig?.field !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-primary" />
      : <ArrowDown className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-black/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onSort('order_number')}
              >
                <div className="flex items-center gap-2">
                  Invoice #
                  {getSortIcon('order_number')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onSort('created_at')}
              >
                <div className="flex items-center gap-2">
                  Date
                  {getSortIcon('created_at')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onSort('items__course__title')}
              >
                <div className="flex items-center gap-2">
                  Course(s)
                  {getSortIcon('items__course__title')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onSort('total_amount')}
              >
                <div className="flex items-center gap-2">
                  Amount (BDT)
                  {getSortIcon('total_amount')}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {payment.order_number}
                    </span>
                  </div>
                  {payment.is_installment && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                      Installment {payment.installments_paid}/{payment.installment_plan}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatPaymentDate(payment.created_at)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {payment.items && payment.items.length > 0 ? (
                      <div className="space-y-1">
                        {payment.items.map((item, index) => (
                          <div key={index}>
                            <div className="font-medium">{item.course_title || 'Course'}</div>
                            {item.batch_name && (
                              <div className="text-xs text-gray-500">Batch: {item.batch_name}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span>{payment.items_count} {payment.items_count === 1 ? 'Course' : 'Courses'}</span>
                    )}
                  </div>
                  {payment.coupon_code && (
                    <div className="text-xs text-green-600 mt-1">
                      Coupon: {payment.coupon_code}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(payment.total_amount, payment.currency)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {getPaymentMethodLabel(payment.payment_method)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onViewDetails(payment)}
                      className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    {payment.status === 'completed' && (
                      <button
                        onClick={() => onDownloadInvoice(payment.id, payment.order_number)}
                        className="inline-flex items-center justify-center p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download Invoice"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
