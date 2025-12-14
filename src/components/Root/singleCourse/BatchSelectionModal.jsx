import { useState } from 'react';
import Modal from '@/components/common/Modal';
import PrimaryButton from '@/components/common/PrimaryButton';

const BatchSelectionModal = ({ isOpen, onClose, batches, onSelect }) => {
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleSelect = (batchId) => {
    setSelectedBatch(batchId);
  };

  const handleContinue = () => {
    if (selectedBatch) {
      onSelect(selectedBatch);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Batch">
      <div className="space-y-4">
        <p className="text-gray-600 mb-4">
          Please select a batch to enroll in:
        </p>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {batches.map(batch => (
            <div
              key={batch.id}
              onClick={() => handleSelect(batch.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedBatch === batch.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{batch.batch_name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Starts:</span>{' '}
                      {new Date(batch.start_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p>
                      <span className="font-semibold">Ends:</span>{' '}
                      {new Date(batch.end_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p>
                      <span className="font-semibold">Enrollment closes:</span>{' '}
                      {new Date(batch.enrollment_end).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-primary mb-1">
                    {batch.available_seats} seats left
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    of {batch.max_students} total
                  </p>
                  {batch.is_full && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                      FULL
                    </span>
                  )}
                  {batch.available_seats <= 5 && !batch.is_full && (
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                      FILLING FAST
                    </span>
                  )}
                </div>
              </div>
              
              {selectedBatch === batch.id && (
                <div className="mt-3 pt-3 border-t border-primary/20">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Selected</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <PrimaryButton
            text="Continue to Cart"
            onClick={handleContinue}
            disabled={!selectedBatch}
            className="flex-1"
          />
        </div>
      </div>
    </Modal>
  );
};

export default BatchSelectionModal;
