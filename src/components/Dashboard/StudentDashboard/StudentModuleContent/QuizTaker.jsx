import { useState, useEffect, useCallback } from 'react';
import api from '@/api/axios';
import {
  X,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import Swal from 'sweetalert2';

const QuizTaker = ({ quiz, onClose, onCompleted }) => {
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    startQuiz();
  }, []);

  useEffect(() => {
    // Prevent accidental page refresh/close during quiz
    const handleBeforeUnload = (e) => {
      if (quizAttempt && !result) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [quizAttempt, result]);

  useEffect(() => {
    // Save answers to localStorage as backup
    if (quizAttempt) {
      localStorage.setItem(`quiz_${quiz.id}_answers`, JSON.stringify(answers));
    }
  }, [answers, quiz.id, quizAttempt]);

  useEffect(() => {
    // Timer countdown
    if (timeLeft === null || timeLeft <= 0 || result) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz(); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, result]);

  const startQuiz = async () => {
    try {
      setLoading(true);

      const response = await api.post(`/api/quizzes/${quiz.id}/start/`);

      if (response.data.success) {
        const attemptData = response.data.data;

        // Try to get questions from different possible locations
        const questionsData = attemptData.questions || quiz.questions || [];

        if (questionsData.length === 0) {
          console.error('❌ No questions found!');
          await Swal.fire({
            icon: 'error',
            title: 'No Questions Available',
            html: `
              <p>This quiz has no questions.</p>
              <small class="text-gray-500">Please contact your instructor.</small>
            `,
            confirmButtonColor: '#ef4444',
          });
          onClose();
          return;
        }

        // Calculate total marks from question points
        const calculatedTotalMarks = questionsData.reduce((sum, q) => sum + (q.points || 0), 0);

        // Update quiz object with calculated total marks if not present
        if (!quiz.total_marks && calculatedTotalMarks > 0) {
          quiz.total_marks = calculatedTotalMarks;
        }

        setQuizAttempt(attemptData);
        setQuestions(questionsData);
        setTimeLeft(quiz.duration_minutes * 60); // Convert to seconds

        // Load saved answers from localStorage if any
        const savedAnswers = localStorage.getItem(`quiz_${quiz.id}_answers`);
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers));
        }
      } else {
        console.error('❌ Start quiz failed:', response.data);
        await Swal.fire({
          icon: 'error',
          title: 'Failed to Start Quiz',
          text: response.data.message || 'Failed to start quiz',
          confirmButtonColor: '#ef4444',
        });
        onClose();
      }
    } catch (error) {
      console.error('❌ Error starting quiz:', error);
      console.error('Response data:', error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to start quiz. Please try again.';

      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#ef4444',
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;

    const unanswered = questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Incomplete Quiz',
        html: `You have <strong>${unanswered.length}</strong> unanswered question(s).<br/>Do you want to submit anyway?`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Submit',
        cancelButtonText: 'Review',
        confirmButtonColor: '#f59e0b',
        cancelButtonColor: '#6b7280',
      });

      if (!result.isConfirmed) return;
    }

    try {
      setSubmitting(true);

      // Format answers for API
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        question_id: questionId,
        answer: answer,
      }));

      // Try the correct endpoint - quiz-attempts not quizzes
      const response = await api.post(`/api/quiz-attempts/${quizAttempt.id}/submit/`, {
        answers: formattedAnswers,
      });

      if (response.data.success) {
        const resultData = response.data.data;

        // Calculate total marks from questions if not in result
        const totalMarks =
          resultData.total_marks ||
          quiz.total_marks ||
          questions.reduce((sum, q) => sum + (q.points || 0), 0);
        const passingMarks = resultData.passing_marks || quiz.passing_marks;
        const passed = resultData.score >= passingMarks;

        // Clear saved answers from localStorage
        localStorage.removeItem(`quiz_${quiz.id}_answers`);

        // Show beautiful result popup
        await Swal.fire({
          icon: passed ? 'success' : 'info',
          title: passed ? '🎉 Congratulations!' : '📝 Quiz Completed',
          html: `
            <div style="text-align: center; padding: 20px;">
              <div style="margin: 20px 0;">
                <div style="font-size: 48px; font-weight: bold; color: ${passed ? '#10b981' : '#f59e0b'};">
                  ${resultData.score || 0}/${totalMarks}
                </div>
                <div style="font-size: 16px; color: #6b7280; margin-top: 8px;">
                  Your Score (${Math.round((resultData.score / totalMarks) * 100)}%)
                </div>
              </div>
              
              <div style="background: #f3f4f6; border-radius: 12px; padding: 16px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #4b5563; font-weight: 500;">Total Marks:</span>
                  <span style="font-weight: bold; color: #1f2937;">${totalMarks}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #4b5563; font-weight: 500;">Passing Marks:</span>
                  <span style="font-weight: bold; color: #1f2937;">${passingMarks}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #4b5563; font-weight: 500;">Result:</span>
                  <span style="font-weight: bold; color: ${passed ? '#10b981' : '#ef4444'};">
                    ${passed ? '✅ Passed' : '❌ Not Passed'}
                  </span>
                </div>
                ${
                  resultData.correct_answers !== undefined
                    ? `
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #4b5563; font-weight: 500;">Correct Answers:</span>
                    <span style="font-weight: bold; color: #1f2937;">${resultData.correct_answers}/${resultData.total_questions || questions.length}</span>
                  </div>
                `
                    : ''
                }
              </div>
              
              <div style="color: #6b7280; font-size: 14px; margin-top: 16px;">
                ${
                  passed
                    ? '🎊 Great job! You passed the quiz.'
                    : `💪 Keep practicing! You need ${passingMarks - resultData.score} more marks to pass.`
                }
              </div>
            </div>
          `,
          confirmButtonText: 'Close',
          confirmButtonColor: passed ? '#10b981' : '#3b82f6',
          width: '600px',
          allowOutsideClick: false,
        });

        // Close quiz taker after user clicks close
        onCompleted();
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: response.data.message || 'Failed to submit quiz',
          confirmButtonColor: '#ef4444',
        });
      }
    } catch (error) {
      console.error('❌ Error submitting quiz:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.detail ||
        error.message ||
        'Failed to submit quiz. Please try again.';

      await Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        html: `<p>${errorMessage}</p>${error.response?.status ? `<small class="text-gray-500">Status: ${error.response.status}</small>` : ''}`,
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-12">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-center mt-4 font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{quiz.title}</h2>
          <div className="flex items-center gap-4">
            {/* Timer */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={async (e) => {
                e.preventDefault();
                const result = await Swal.fire({
                  icon: 'warning',
                  title: 'Exit Quiz?',
                  text: 'Your progress will be saved, but the timer will continue.',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, Exit',
                  cancelButtonText: 'Continue Quiz',
                  confirmButtonColor: '#ef4444',
                  cancelButtonColor: '#6b7280',
                });

                if (result.isConfirmed) {
                  onClose();
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Question Progress */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Object.keys(answers).length} answered
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        {!currentQuestion && questions.length > 0 && (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-800 font-medium mb-2">Question not found</p>
              <p className="text-sm text-red-600">
                Question index: {currentQuestionIndex}, Total: {questions.length}
              </p>
            </div>
          </div>
        )}

        {currentQuestion && (
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex-1">
                  {currentQuestion.question_text}
                </h3>
                <span className="ml-4 px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-lg">
                  {currentQuestion.points} pts
                </span>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {/* Debug: Show what we have */}
                {!currentQuestion.options && !currentQuestion.choices && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⚠️ No options available for this question.
                      <br />
                      Question type: {currentQuestion.question_type}
                      <br />
                      Available fields: {Object.keys(currentQuestion).join(', ')}
                    </p>
                  </div>
                )}

                {currentQuestion.question_type === 'multiple_choice' && (
                  <>
                    {(currentQuestion.options || currentQuestion.choices || [])?.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                          answers[currentQuestion.id]?.includes(option.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={answers[currentQuestion.id]?.includes(option.id) || false}
                          onChange={(e) => {
                            const currentAnswers = answers[currentQuestion.id] || [];
                            if (e.target.checked) {
                              handleAnswerChange(currentQuestion.id, [
                                ...currentAnswers,
                                option.id,
                              ]);
                            } else {
                              handleAnswerChange(
                                currentQuestion.id,
                                currentAnswers.filter((id) => id !== option.id)
                              );
                            }
                          }}
                          className="w-5 h-5 text-primary"
                        />
                        <span className="text-gray-800">{option.option_text}</span>
                      </label>
                    ))}
                  </>
                )}

                {currentQuestion.question_type === 'single_choice' && (
                  <>
                    {(currentQuestion.options || currentQuestion.choices || [])?.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                          answers[currentQuestion.id] === option.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question_${currentQuestion.id}`}
                          checked={answers[currentQuestion.id] === option.id}
                          onChange={() => handleAnswerChange(currentQuestion.id, option.id)}
                          className="w-5 h-5 text-primary"
                        />
                        <span className="text-gray-800">{option.option_text}</span>
                      </label>
                    ))}
                  </>
                )}

                {currentQuestion.question_type === 'text' && (
                  <textarea
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Type your answer here..."
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-lg font-bold transition ${
                  index === currentQuestionIndex
                    ? 'bg-primary text-white'
                    : answers[questions[index].id]
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))
              }
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submit Quiz
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTaker;
