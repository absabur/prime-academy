import { useState } from 'react';
import { FileText, Calendar, Clock, CheckCircle, AlertTriangle, Upload, X } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import AssignmentSubmissionForm from './AssignmentSubmissionForm';

const AssignmentCard = ({ assignment, onSubmissionSuccess }) => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const getStatusBadge = () => {
    if (assignment.has_submitted) {
      if (assignment.submission_status === 'graded') {
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            <CheckCircle className="w-3 h-3" />
            Graded
          </span>
        );
      }
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
      );
    }
    
    if (assignment.is_overdue) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
          <AlertTriangle className="w-3 h-3" />
          Overdue
        </span>
      );
    }

    const dueDate = new Date(assignment.due_date);
    const now = new Date();
    const daysLeft = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 2) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
          <Clock className="w-3 h-3" />
          Due Soon
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
        <Calendar className="w-3 h-3" />
        Pending
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDaysLeft = () => {
    if (assignment.is_overdue) return null;
    
    const dueDate = new Date(assignment.due_date);
    const now = new Date();
    const daysLeft = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysLeft === 0) return 'Due today';
    if (daysLeft === 1) return '1 day left';
    if (daysLeft < 0) return 'Overdue';
    return `${daysLeft} days left`;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-black/10 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {getStatusBadge()}
            {!assignment.has_submitted && !assignment.is_overdue && (
              <span className="text-xs font-medium text-orange-600">
                {getDaysLeft()}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{assignment.title}</h3>
        </div>
        
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
          <FileText className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Description - Compact */}
      {assignment.description && (
        <div 
          className="prose prose-sm max-w-none mb-3 text-gray-600 text-sm line-clamp-2"
          dangerouslySetInnerHTML={{ __html: assignment.description }}
        />
      )}

      {/* Details - Compact */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span className="truncate">{new Date(assignment.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
          <FileText className="w-3.5 h-3.5" />
          <span>Marks: {assignment.total_marks}</span>
        </div>
      </div>

      {/* Score Display (if graded) - Compact */}
      {assignment.submission_status === 'graded' && assignment.score !== null && (
        <div className="mb-3 p-2.5 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Score:</span>
            <span className="text-xl font-bold text-green-600">
              {assignment.score}/{assignment.total_marks}
            </span>
          </div>
          {assignment.feedback && (
            <div className="mt-2 pt-2 border-t border-green-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Feedback:</p>
              <p className="text-xs text-gray-600 line-clamp-2">{assignment.feedback}</p>
            </div>
          )}
        </div>
      )}

      {/* Actions - Compact */}
      <div className="flex flex-wrap gap-2">
        {!assignment.has_submitted && (
          <>
            {(assignment.late_submission_allowed || !assignment.is_overdue) && (
              <PrimaryButton
                text={showSubmissionForm ? 'Cancel' : 'Submit'}
                onClick={() => setShowSubmissionForm(!showSubmissionForm)}
                className="flex items-center gap-1.5 text-sm py-2"
                icon={showSubmissionForm ? <X className="w-3.5 h-3.5" /> : <Upload className="w-3.5 h-3.5" />}
              />
            )}
            {assignment.is_overdue && !assignment.late_submission_allowed && (
              <div className="flex items-center gap-1.5 text-red-600 text-sm font-medium">
                <AlertTriangle className="w-4 h-4" />
                Closed
              </div>
            )}
          </>
        )}

        {assignment.has_submitted && (
          <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Submitted
          </div>
        )}
      </div>

      {/* Submission Form */}
      {showSubmissionForm && !assignment.has_submitted && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <AssignmentSubmissionForm
            assignmentId={assignment.id}
            onSuccess={() => {
              setShowSubmissionForm(false);
              onSubmissionSuccess();
            }}
            onCancel={() => setShowSubmissionForm(false)}
          />
        </div>
      )}

      {/* Late submission warning */}
      {assignment.is_overdue && assignment.late_submission_allowed && !assignment.has_submitted && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-800">
            This assignment is overdue. Late submissions may receive reduced marks.
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
