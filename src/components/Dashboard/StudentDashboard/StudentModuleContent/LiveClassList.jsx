import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/api/axios';
import { Loader2 } from 'lucide-react';
import LiveClassCard from './LiveClassCard';
import StudentCourseAttendance from './StudentCourseAttendance';

const LiveClassList = ({ moduleId, onContentUpdate }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceRefreshTrigger, setAttendanceRefreshTrigger] = useState(0);

  const { courseSlug } = useParams();

  useEffect(() => {
    fetchLiveClasses();
  }, [moduleId]);

  const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const fetchLiveClasses = async () => {
    try {
      setLoading(true);
      setError(null);

      // fetching live classes for module

      // Skip API call if module ID is not a valid UUID
      if (!isValidUUID(moduleId)) {
        setClasses([]);
        setLoading(false);
        return;
      }
      
      const response = await api.get(`/api/live-classes/?module_id=${moduleId}`);
      if (response.data && response.data.success) {
        setClasses(response.data.data);
      } else {
        setError(response.data?.message || 'Failed to fetch live classes');
      }
    } catch (err) {
      // Error fetching live classes
      // Handle authentication errors
      if (err.response?.status === 401) {
        setError('Please log in to view live classes');
      } else if (err.response?.status === 403) {
        setError('You do not have permission to view this content');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch live classes');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceMarked = () => {
    // Refresh the list after marking attendance
    fetchLiveClasses();
    
    // Trigger attendance summary refresh
    setAttendanceRefreshTrigger(prev => prev + 1);
    
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
          onClick={fetchLiveClasses}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-600 font-medium text-lg">No live classes scheduled yet</p>
          <p className="text-gray-500 text-sm mt-2">Check back later for upcoming classes</p>
        </div>

        {/* Module-specific attendance summary shown under the empty state */}
        <div className="mt-6">
          <div className="w-full flex-1 lg:flex-2">
            <StudentCourseAttendance courseSlug={courseSlug} moduleId={moduleId} refreshTrigger={attendanceRefreshTrigger} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <LiveClassCard
          key={classItem.id}
          classData={classItem}
          onAttendanceMarked={handleAttendanceMarked}
        />
      ))}
    </div>
  );
};

export default LiveClassList;
