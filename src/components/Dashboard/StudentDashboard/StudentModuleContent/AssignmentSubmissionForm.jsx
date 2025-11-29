import { useState } from 'react';
import api from '@/api/axios';
import { Upload, FileText, X } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import Swal from 'sweetalert2';

const AssignmentSubmissionForm = ({ assignmentId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    submission_text: '',
    submission_url: '',
    file: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleTextChange = (e) => {
    setFormData({ ...formData, submission_text: e.target.value });
  };

  const handleUrlChange = (e) => {
    setFormData({ ...formData, submission_url: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: 'warning',
          title: 'File Too Large',
          text: 'File size must be less than 10MB',
          confirmButtonColor: '#f59e0b',
        });
        return;
      }
      setFormData({ ...formData, file });
      setError(null);
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, file: null });
    const fileInput = document.getElementById('assignment-file');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate assignment ID
    if (!assignmentId) {
      await Swal.fire({
        icon: 'error',
        title: 'Invalid Assignment',
        text: 'Assignment ID is missing. Please refresh and try again.',
        confirmButtonColor: '#d33',
      });
      return;
    }
    
    if (!formData.submission_text.trim() && !formData.submission_url.trim() && !formData.file) {
      await Swal.fire({
        icon: 'warning',
        title: 'Missing Submission',
        text: 'Please provide text, URL, or upload a file',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Confirmation dialog
    const confirmResult = await Swal.fire({
      icon: 'question',
      title: 'Submit Assignment?',
      html: `
        <div class="text-left space-y-2">
          <p><strong>Are you sure you want to submit?</strong></p>
          ${formData.submission_text ? '<p>✓ Text submission included</p>' : ''}
          ${formData.submission_url ? `<p>✓ URL: ${formData.submission_url}</p>` : ''}
          ${formData.file ? `<p>✓ File: ${formData.file.name}</p>` : ''}
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit',
      cancelButtonText: 'Cancel',
    });

    if (!confirmResult.isConfirmed) return;

    try {
      setSubmitting(true);
      setError(null);

      const submitData = new FormData();
      submitData.append('submission_text', formData.submission_text.trim() || '');
      
      if (formData.submission_url && formData.submission_url.trim()) {
        submitData.append('submission_url', formData.submission_url.trim());
      }
      
      if (formData.file) {
        submitData.append('file', formData.file);
      }


      const response = await api.post(
        `/api/assignments/${assignmentId}/submit/`,
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Backend returns 200/201 for success - trust the status code
      if (response.status >= 200 && response.status < 300) {
        
        const submissionData = response.data.data || response.data;
        
        let submittedAt = 'Just now';
        if (submissionData.submitted_at) {
          submittedAt = new Date(submissionData.submitted_at).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        }

        await Swal.fire({
          icon: 'success',
          title: 'Submitted Successfully!',
          html: `
            <div class="text-left space-y-3 p-4">
              <div class="text-center mb-3">
                <p class="text-lg font-semibold text-green-600">✓ Assignment Submitted</p>
              </div>
              <div class="space-y-2 text-sm">
                ${submissionData.status ? `<p><strong>Status:</strong> <span class="text-blue-600">${submissionData.status}</span></p>` : ''}
                <p><strong>Submitted:</strong> ${submittedAt}</p>
                ${submissionData.is_late ? '<p class="text-orange-600">⚠️ Late submission</p>' : '<p class="text-green-600">✓ On time</p>'}
              </div>
              <div class="mt-3 pt-3 border-t text-center">
                <p class="text-xs text-gray-600">Your submission is pending review by the instructor.</p>
              </div>
            </div>
          `,
          confirmButtonColor: '#10b981',
          width: '500px',
        });
        
        onSuccess();
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: response.data.message || 'Failed to submit assignment',
          confirmButtonColor: '#d33',
        });
      }
    } catch (err) {
      console.error('❌ Error submitting assignment:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        config: {
          url: err.config?.url,
          method: err.config?.method,
        }
      });
      
      let errorMessage = 'Failed to submit assignment. Please try again.';
      let errorDetails = '';
      
      if (err.response?.status === 500) {
        errorMessage = 'Server error occurred while submitting assignment';
        errorDetails = err.response?.data?.message || err.response?.data?.error || 'Please contact support if this persists';
      } else if (err.response?.status === 400) {
        errorMessage = 'Invalid submission data';
        errorDetails = err.response?.data?.message || err.response?.data?.error || 'Please check your submission';
      } else if (err.response?.status === 404) {
        errorMessage = 'Assignment not found';
        errorDetails = 'This assignment may have been deleted';
      } else if (err.response?.status === 403) {
        errorMessage = 'Permission denied';
        errorDetails = 'You may not have access to submit this assignment';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      await Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        html: `
          <div class="text-left space-y-2">
            <p class="font-medium">${errorMessage}</p>
            ${errorDetails ? `<p class="text-sm text-gray-600">${errorDetails}</p>` : ''}
            ${err.response?.status ? `<p class="text-xs text-gray-500 mt-2">Error Code: ${err.response.status}</p>` : ''}
          </div>
        `,
        confirmButtonColor: '#d33',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-lg font-bold text-gray-800 mb-4">Submit Your Assignment</h4>

      {/* Text Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Submission Text
        </label>
        <textarea
          value={formData.submission_text}
          onChange={handleTextChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Enter your submission text here..."
        />
      </div>

      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Submission URL (Optional)
        </label>
        <input
          type="url"
          value={formData.submission_url}
          onChange={handleUrlChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://github.com/your-repo/assignment"
        />
        <p className="text-xs text-gray-500 mt-1">Link to GitHub, Google Drive, or other online resources</p>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attach File (Optional)
        </label>
        
        {!formData.file ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              id="assignment-file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.zip,.rar"
            />
            <label htmlFor="assignment-file" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, DOCX, TXT, ZIP (Max 10MB)
              </p>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-800">{formData.file.name}</p>
                <p className="text-xs text-gray-500">
                  {(formData.file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 hover:bg-gray-200 rounded-full transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <PrimaryButton
          type="submit"
          text={submitting ? 'Submitting...' : 'Submit Assignment'}
          disabled={submitting}
          className="flex items-center gap-2"
        />
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AssignmentSubmissionForm;
