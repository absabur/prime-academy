import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { Loader2 } from 'lucide-react';
import AssignmentCard from './AssignmentCard';

const AssignmentList = ({ moduleId, onContentUpdate }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, [moduleId]);

  const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Skip API call if module ID is not a valid UUID
      if (!isValidUUID(moduleId)) {
        setAssignments([]);
        setLoading(false);
        return;
      }
      
      const response = await api.get(`/api/assignments/?module_id=${moduleId}`);
      
      if (response.data.success) {
        setAssignments(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch assignments');
      }
    } catch (err) {
      console.error('Error fetching assignments:', err);
      
      // Handle authentication errors
      if (err.response?.status === 401) {
        setError('Please log in to view assignments');
      } else if (err.response?.status === 403) {
        setError('You do not have permission to view this content');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch assignments');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmissionSuccess = () => {
    // Refresh the list after submission
    fetchAssignments();
    
    // Notify parent to refresh sidebar
    if (onContentUpdate) {
      onContentUpdate();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={fetchAssignments}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
        <p className="text-gray-600 font-medium text-lg">No assignments available</p>
        <p className="text-gray-500 text-sm mt-2">Assignments will appear here when added</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onSubmissionSuccess={handleSubmissionSuccess}
        />
      ))}
    </div>
  );
};

export default AssignmentList;
