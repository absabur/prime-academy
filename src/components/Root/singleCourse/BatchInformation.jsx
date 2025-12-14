import OuterSection from '@/components/common/OuterSection';
import InnerSection from '@/components/common/InnerSection';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const BatchInformation = () => {
  const { course } = useSelector((state) => state.course);
  const [searchParams] = useSearchParams();
  
  // Get batch slug from URL
  const batchSlugFromUrl = searchParams.get('batch');
  
  // Get open batches
  const openBatches = course?.batches?.filter(b => b.is_enrollment_open) || [];
  
  // Select batch: prioritize URL param (by slug), otherwise first available
  const activeBatch = batchSlugFromUrl 
    ? openBatches.find(b => b.slug === batchSlugFromUrl) || openBatches[0]
    : openBatches[0] || null;

  // Don't render if no active batch
  if (!activeBatch) return null;

  return (
    <OuterSection className="py-4">
      <InnerSection>
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 md:p-6 border-2 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary mb-3">
                {activeBatch.batch_name}
              </h3>
              
              <div className="bg-white/60 rounded-lg p-3 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Current Batch: </span>
                    <span className="font-bold text-gray-900">{activeBatch.batch_number}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Available Seats: </span>
                    <span className="font-bold text-green-600">{activeBatch.available_seats}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Starts: </span>
                    <span className="font-bold text-gray-900">
                      {new Date(activeBatch.start_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Ends: </span>
                    <span className="font-bold text-gray-900">
                      {new Date(activeBatch.end_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  {/* Installment Information */}
                  {activeBatch.has_installment && (
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Payment: </span>
                      <span className="font-bold text-blue-600">
                        💳 {activeBatch.installment_preview.description}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-orange-800">
                    <span className="font-semibold">Enrollment Deadline: </span>
                    <span className="text-orange-700">
                      {new Date(activeBatch.enrollment_end_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </p>
                </div>
              </div>
              
              {activeBatch.available_seats <= 10 && activeBatch.available_seats > 0 && (
                <div className="mt-2 bg-red-50 border-l-4 border-red-400 p-2 rounded">
                  <p className="text-sm font-semibold text-red-800">
                    ⚠️ Hurry! Only {activeBatch.available_seats} seat{activeBatch.available_seats > 1 ? 's' : ''} remaining
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default BatchInformation;
