import { useState } from 'react';
import { ClipboardList, Clock, Trophy, CheckCircle, XCircle, Play, AlertCircle } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import QuizTaker from './QuizTaker';

const QuizCard = ({ quiz, onQuizCompleted }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const getStatusBadge = () => {
    // Perfect score - GOLD
    if (quiz.attempts_used > 0 && quiz.best_score >= quiz.total_marks) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-300 animate-pulse">
          <Trophy className="w-3 h-3" />
          Perfect Score 🏆
        </span>
      );
    }
    
    // Attempts exhausted - RED/GREEN
    if (quiz.attempts_used >= quiz.max_attempts) {
      const passed = quiz.best_score >= quiz.passing_marks;
      return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${
          passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {passed ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          {passed ? 'Completed - Passed' : 'Attempts Exhausted'}
        </span>
      );
    }

    // Passed with attempts remaining - GREEN
    if (quiz.attempts_used > 0 && quiz.best_score >= quiz.passing_marks) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
          <CheckCircle className="w-3 h-3" />
          Passed ✓
        </span>
      );
    }

    // Attempted but not passed - ORANGE
    if (quiz.attempts_used > 0) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
          <Trophy className="w-3 h-3" />
          In Progress
        </span>
      );
    }

    // Not attempted - BLUE
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
        <Clock className="w-3 h-3" />
        Not Started
      </span>
    );
  };
  
  const getAttemptsDisplay = () => {
    // Don't show attempts if perfect score achieved
    if (quiz.attempts_used > 0 && quiz.best_score >= quiz.total_marks) {
      return null;
    }
    
    const remaining = quiz.max_attempts - quiz.attempts_used;
    
    if (quiz.attempts_used >= quiz.max_attempts) {
      return (
        <span className="text-sm font-bold text-red-600 animate-pulse">
          ⚠️ No attempts left
        </span>
      );
    }
    
    if (remaining === 1) {
      return (
        <span className="text-sm font-bold text-orange-600">
          ⚠️ Last attempt remaining
        </span>
      );
    }
    
    // Only show remaining attempts if user has started AND attempts are limited (less than 100)
    if (quiz.attempts_used > 0 && quiz.max_attempts < 100) {
      return (
        <span className="text-sm font-medium text-gray-600">
          {remaining} attempt(s) left
        </span>
      );
    }
    
    return null;
  };

  const getPerformanceColor = (score) => {
    const percentage = (score / quiz.total_marks) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow border border-black/10 p-4 hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {getStatusBadge()}
              {getAttemptsDisplay()}
            </div>
            <h3 className="text-lg font-bold text-gray-800 truncate">{quiz.title}</h3>
            
            {/* Show score if attempted */}
            {quiz.attempts_used > 0 && quiz.best_score !== null && (
              <div className="mt-1.5 flex items-center gap-2 text-sm">
                <span className="text-gray-600">Score:</span>
                <span className={`font-bold ${getPerformanceColor(quiz.best_score)}`}>
                  {quiz.best_score}/{quiz.total_marks}
                </span>
                <span className="text-xs text-gray-500">
                  ({Math.round((quiz.best_score / quiz.total_marks) * 100)}%)
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
            <ClipboardList className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Quiz Info - Compact Grid */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-gray-50 rounded p-2 text-center">
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-sm font-bold text-gray-800">{quiz.duration_minutes}m</p>
          </div>
          <div className="bg-gray-50 rounded p-2 text-center">
            <p className="text-xs text-gray-500">Marks</p>
            <p className="text-sm font-bold text-gray-800">{quiz.total_marks}</p>
          </div>
          <div className="bg-gray-50 rounded p-2 text-center">
            <p className="text-xs text-gray-500">Pass</p>
            <p className="text-sm font-bold text-gray-800">{quiz.passing_marks}</p>
          </div>
          <div className="bg-gray-50 rounded p-2 text-center">
            <p className="text-xs text-gray-500">Ques</p>
            <p className="text-sm font-bold text-gray-800">{quiz.total_questions || quiz.questions?.length || 0}</p>
          </div>
        </div>

        {/* Compact Statistics - Only show if attempted */}
        {quiz.attempts_used > 0 && quiz.best_score >= quiz.total_marks ? (
          <div className="mb-3 p-2.5 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
            <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
              <Trophy className="w-4 h-4 animate-pulse" />
              <span>Perfect Score! 100% 🏆</span>
            </div>
          </div>
        ) : quiz.attempts_used > 0 && quiz.best_score >= quiz.passing_marks ? (
          <div className="mb-3 p-2.5 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Passed with {quiz.best_score} marks! 🎉</span>
            </div>
          </div>
        ) : quiz.attempts_used > 0 && (
          <div className="mb-3 p-2.5 rounded-lg bg-orange-50 border border-orange-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-700 font-medium">
                Need {quiz.passing_marks - quiz.best_score} more to pass
              </span>
              {quiz.max_attempts < 100 && (
                <span className="text-orange-600 text-xs">
                  {quiz.attempts_used}/{quiz.max_attempts} tries
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button - Compact */}
        <div className="flex gap-2">
          {quiz.attempts_used > 0 && quiz.best_score >= quiz.total_marks ? (
            <div className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 w-full justify-center">
              <Trophy className="w-4 h-4" />
              <span>Completed</span>
            </div>
          ) : quiz.can_attempt && quiz.attempts_used < quiz.max_attempts ? (
            <PrimaryButton
              text={quiz.attempts_used > 0 ? 'Retake' : 'Start'}
              onClick={() => setShowQuiz(true)}
              className={`flex items-center gap-1.5 text-sm py-2 w-full justify-center ${
                quiz.attempts_used === quiz.max_attempts - 1 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : ''
              }`}
              icon={<Play className="w-3.5 h-3.5" />}
            />
          ) : quiz.attempts_used >= quiz.max_attempts ? (
            <div className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg w-full justify-center ${
              quiz.best_score >= quiz.passing_marks
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {quiz.best_score >= quiz.passing_marks ? (
                <><CheckCircle className="w-4 h-4" /><span>Completed</span></>
              ) : (
                <><XCircle className="w-4 h-4" /><span>Max Attempts</span></>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium px-3 py-2 bg-gray-100 rounded-lg w-full justify-center">
              <Clock className="w-4 h-4" />
              <span>Not Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Taker Modal/Page */}
      {showQuiz && (
        <QuizTaker
          quiz={quiz}
          onClose={() => setShowQuiz(false)}
          onCompleted={() => {
            setShowQuiz(false);
            onQuizCompleted();
          }}
        />
      )}
    </>
  );
};

export default QuizCard;
