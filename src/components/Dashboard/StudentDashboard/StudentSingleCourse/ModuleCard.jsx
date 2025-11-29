import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, FileText, FilePenLine, Calendar } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';

const ModuleCard = ({ module }) => {
  const navigate = useNavigate();
  const { courseSlug } = useParams();

  const handleStudyPlan = () => {
    // Navigate to module content page
    navigate(`/student-dashboard/my-course/${courseSlug}/module/${module.id}?tab=live-classes`);
  };

  // Use actual backend data with safe fallbacks
  const progress = module.progress || 0;
  const totalItems = module.totalItems || 0;
  const status = module.is_active ? 'Active' : 'Inactive';

  // Format start date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const startDate = formatDate(module.start_date);
  const assignmentCount = module.assignment_count || 0;
  const quizCount = module.quiz_count || 0;

  return (
    <div
      key={module.id}
      className="bg-white p-4 rounded-xl shadow-md w-full border border-black/20"
    >
      {/* Top Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {/* 1. Module Box */}
        <div className="bg-secondary text-white rounded-lg text-center w-14 h-14 flex flex-col justify-center flex-shrink-0">
          <span className="text-xs font-medium leading-tight">Mod</span>
          <span className="text-2xl font-bold leading-tight">{module.order || 1}</span>
        </div>

        {/* 2. Middle Section (Progress & Status) */}
        <div className="flex-1 flex flex-col gap-1.5 min-w-[180px]">
          {/* Progress Bar + Stats */}
          <div className="flex items-center gap-2">
            {/* Progress Bar */}
            <div className="flex-1 h-2 rounded-full overflow-hidden flex bg-gray-200">
              <div className="bg-primary" style={{ width: `${progress}%` }}></div>
            </div>
            {/* Stats */}
            {totalItems > 0 && <span className="text-xs font-medium text-black">{totalItems}</span>}
          </div>

          {/* Status Badge */}
          <div className="flex">
            <div className="ml-auto border border-black/30 rounded-full py-1 px-3 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5 text-black" />
              <span className="text-xs font-semibold text-black">{status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-3 border-black/20" />

      {/* Content Section */}
      <div>
        <h2 className="text-lg font-bold text-black mb-2 line-clamp-2">{module.title}</h2>

        {/* Description */}
        {module.short_description && (
          <div
            className="text-gray-700 text-sm mb-3 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: module.short_description }}
          />
        )}

        {/* Module Stats */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-3 text-gray-600">
            {assignmentCount > 0 && (
              <div className="flex items-center gap-1">
                <FilePenLine className="h-3.5 w-3.5" />
                <span>
                  {assignmentCount} Assignment{assignmentCount !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            {quizCount > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                <span>
                  {quizCount} Quiz{quizCount !== 1 ? 'zes' : ''}
                </span>
              </div>
            )}
          </div>
          {startDate && (
            <div className="flex items-center gap-1 text-gray-700">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium">{startDate}</span>
            </div>
          )}
        </div>

        {/* Study Plan Button */}
        <PrimaryButton
          text="Study Plan"
          onClick={handleStudyPlan}
          className="w-full text-sm py-2"
        />
      </div>
    </div>
  );
};

export default ModuleCard;
