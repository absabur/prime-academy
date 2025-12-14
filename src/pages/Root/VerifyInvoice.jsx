import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, FileText, Calendar, CreditCard, Package, User, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../../api/axios';
import OuterSection from '../../components/common/OuterSection';
import InnerSection from '../../components/common/InnerSection';

const VerifyInvoice = () => {
  const { orderNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [verificationData, setVerificationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    verifyInvoice();
  }, [orderNumber]);

  const verifyInvoice = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/api/orders/verify/${orderNumber}/`);
      setVerificationData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify invoice. Please try again.');
      setVerificationData({ verified: false });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <OuterSection className="pt-fnavbar min-h-[60vh] bg-gray-50">
        <InnerSection className="flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Invoice</h2>
            <p className="text-gray-600">Please wait while we verify invoice #{orderNumber}...</p>
          </div>
        </InnerSection>
      </OuterSection>
    );
  }

  return (
    <OuterSection className="pt-fnavbar bg-gray-50">
      <InnerSection className="max-w-3xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold text-gray-700">Invoice Verification</span>
          </div>
        </div>

        {/* Verification Result Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Status Banner */}
          {verificationData?.verified ? (
            <div className="bg-primary p-6 text-white">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-1">Invoice Verified ✓</h2>
                  <p className="text-white/90">{verificationData.message}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-500 p-6 text-white">
              <div className="flex items-center gap-4">
                <XCircle className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-1">Verification Failed</h2>
                  <p className="text-red-50">{error || 'This invoice could not be verified. It may be invalid or fraudulent.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Details */}
          {verificationData?.verified && (
            <div className="p-8">
              {/* Order Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Invoice Number</p>
                    <p className="text-lg font-bold text-gray-900">{verificationData.order_number}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(verificationData.order_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className="text-lg font-semibold text-gray-900">{verificationData.payment_method}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      verificationData.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {verificationData.status?.charAt(0).toUpperCase() + verificationData.status?.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Billing Name</p>
                    <p className="text-lg font-semibold text-gray-900">{verificationData.billing_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">{verificationData.total_amount}</p>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              {verificationData.items && verificationData.items.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Course Details
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    {verificationData.items.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{item.course_title}</h4>
                          <p className="text-sm text-gray-500">{item.batch_name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Warning for Invalid Invoice */}
          {!verificationData?.verified && (
            <div className="p-8">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">Security Alert</h3>
                    <p className="text-amber-800 mb-4">
                      This invoice could not be verified in our system. This may indicate:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-amber-800 mb-4">
                      <li>The invoice number is incorrect or doesn't exist</li>
                      <li>The invoice may be fraudulent or altered</li>
                      <li>The order was cancelled or refunded</li>
                    </ul>
                    <p className="text-sm text-amber-700">
                      If you believe this is an error, please contact Prime Academy support at{' '}
                      <a href="mailto:info@primeacademy.org" className="font-semibold underline">
                        info@primeacademy.org
                      </a>
                      {' '}or call <span className="font-semibold">+880 1300 290492</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600 bg-white rounded-lg shadow p-6">
          <p className="font-semibold text-gray-800 mb-2">Security Notice</p>
          <p>This verification system ensures the authenticity of Prime Academy invoices.</p>
          <p className="mt-1">Always verify your invoices before making any payments or sharing personal information.</p>
          <p className="mt-3 text-xs text-gray-500">
            If you have any questions, contact us at{' '}
            <a href="mailto:info@primeacademy.org" className="text-primary hover:underline">
              info@primeacademy.org
            </a>
            {' '}or call <span className="font-semibold">+880 1300 290492</span>
          </p>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default VerifyInvoice;
