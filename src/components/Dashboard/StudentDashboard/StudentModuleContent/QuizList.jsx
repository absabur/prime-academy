import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { Loader2 } from 'lucide-react';
import QuizCard from './QuizCard';

const QuizList = ({ moduleId, onContentUpdate }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, [moduleId]);

  const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const fetchQuizzes = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Skip API call if module ID is not a valid UUID
      if (!isValidUUID(moduleId)) {
        setQuizzes([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      
      const response = await api.get(`/api/quizzes/?module_id=${moduleId}`);
      
      if (response.data.success) {
        
        // Filter out quizzes without questions (temporary - should be done on backend)
        const validQuizzes = response.data.data.filter(quiz => {
          const hasQuestions = (quiz.question_count > 0) || (quiz.total_questions > 0);
          if (!hasQuestions) {
            console.warn('⚠️ Filtering out quiz without questions:', quiz.title);
          }
          return hasQuestions;
        });
        
        setQuizzes(validQuizzes);
      } else {
        setError(response.data.message || 'Failed to fetch quizzes');
      }
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      
      // Handle authentication errors
      if (err.response?.status === 401) {
        setError('Please log in to view quizzes');
      } else if (err.response?.status === 403) {
        setError('You do not have permission to view this content');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch quizzes');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleQuizCompleted = () => {
    // Refresh the list after quiz completion
    fetchQuizzes(true); // Pass true to indicate this is a refresh
    
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
          onClick={fetchQuizzes}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
        <p className="text-gray-600 font-medium text-lg">No quizzes available</p>
        <p className="text-gray-500 text-sm mt-2">Quizzes will appear here when added</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {refreshing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-3 mb-4">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-blue-700 font-medium">Updating quiz data...</span>
        </div>
      )}
      
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          onQuizCompleted={handleQuizCompleted}
        />
      ))}
    </div>
  );
};

export default QuizList;
