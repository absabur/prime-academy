import api from '@/api/axios';

export const paymentService = {
  /**
   * Get current student's payment history
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.pageSize - Items per page
   * @param {string} params.status - Filter by status
   * @param {string} params.paymentMethod - Filter by payment method
   * @param {string} params.ordering - Sort order
   * @returns {Promise<Object>} Payment history data
   */
  getMyPayments: async (params = {}) => {
    const queryParams = {
      page: params.page || 1,
      page_size: params.pageSize || 10,
      ordering: params.ordering || '-created_at',
    };

    if (params.status) queryParams.status = params.status;

    // Try different endpoint patterns that might exist
    try {
      // Try with underscore (like my_enrollments)
      const response = await api.get('/api/orders/my_orders/', { params: queryParams });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // Try with hyphen
        const response = await api.get('/api/orders/my-orders/', { params: queryParams });
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Get detailed information for a specific order
   * @param {string} orderId - Order UUID
   * @returns {Promise<Object>} Order details
   */
  getOrderDetails: async (orderId) => {
    const response = await api.get(`/api/orders/${orderId}/`);
    return response.data;
  },

  /**
   * Download invoice PDF for an order
   * @param {string} orderId - Order UUID
   * @param {string} orderNumber - Order number for filename
   */
  downloadInvoice: async (orderId, orderNumber = orderId) => {
    try {
      const response = await api.get(`/api/export/my-orders/${orderId}/invoice/`, {
        responseType: 'blob',
      });

      // Create blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_${orderNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};
