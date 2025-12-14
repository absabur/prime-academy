import PrimaryButton from '../../../common/PrimaryButton';
import api from '@/api/axios';
import SwalUtils from '@/utils/sweetAlert';

const ClassItem = ({ classData }) => {
  const handleJoinClass = async () => {
    if (!classData.meeting_url) {
      SwalUtils.error('Meeting link not available');
      return;
    }

    try {
      // Mark attendance
      const response = await api.post(`/api/live-classes/${classData.id}/join/`);
      
      // Open meeting in new tab
      window.open(classData.meeting_url, '_blank', 'noopener,noreferrer');
      SwalUtils.success('Attendance recorded! Opening meeting...');
    } catch (error) {
      console.error('Error joining class:', error);
      console.error('Error details:', error.response?.data);
      
      // Still try to open meeting even if attendance fails
      window.open(classData.meeting_url, '_blank', 'noopener,noreferrer');
      
      if (error.response?.status === 400) {
        SwalUtils.warning(error.response.data.message || 'Attendance may already be marked');
      } else if (error.response?.status === 500) {
        SwalUtils.error('Server error. Please contact support.');
      } else {
        SwalUtils.warning('Opened meeting, but attendance may not be recorded');
      }
    }
  };

  return (
    <article className="px-lg py-md bg-white border border-black/10 shadow-sm mb-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-md">
        {/* Left Side: Topic & Instructor */}
        <div className="flex-grow">
          <h4 className="text-xl font-semibold mb-md">{classData.topic}</h4>
          {classData.module_title && (
            <div className="text-sm text-gray-600 mb-2">
              📚 Module: {classData.module_title}
            </div>
          )}
          <div className="flex items-center gap-3">
            <img
              src={classData.instructor.avatar}
              alt={classData.instructor.name}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/40x40/E2E8F0/333?text=??';
                e.currentTarget.onerror = null;
              }}
            />
            <div>
              <span className="text-sm text-black/50">Instructor:</span>
              <span className="text-sm font-medium text-black/70"> {classData.instructor.name}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Schedule & Button */}
        <div className="flex-shrink-0 flex flex-col md:items-end gap-md mt-md md:mt-0">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-black bg-secondary/20 border border-secondary/40 px-md py-xs rounded-lg w-full md:w-auto text-center">
              {classData.schedule}
            </span>
            {classData.status === 'ongoing' && (
              <span className="text-xs font-bold text-white bg-red-500 px-md py-xs rounded-lg w-full md:w-auto text-center animate-pulse">
                🔴 LIVE NOW
              </span>
            )}
          </div>
          <PrimaryButton 
            text={classData.can_join ? `Join the class` : `View Details`}
            onClick={handleJoinClass}
            disabled={!classData.meeting_url}
          />
        </div>
      </div>
    </article>
  );
};

export default ClassItem;
