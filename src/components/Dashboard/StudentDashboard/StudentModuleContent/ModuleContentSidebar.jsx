import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { Calendar, Info, TrendingUp } from 'lucide-react';

const ModuleContentSidebar = ({ moduleId }) => {
  const [moduleInfo, setModuleInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModuleInfo();
  }, [moduleId]);

  const fetchModuleInfo = async () => {
    try {
      setLoading(true);

      // Fetch aggregated data for this module
      const [liveClassRes, assignmentRes, quizRes] = await Promise.all([
        api
          .get(`/api/live-classes/?module_id=${moduleId}`)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return { data: { success: false, data: [] } };
          }),
        api
          .get(`/api/assignments/?module_id=${moduleId}`)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return { data: { success: false, data: [] } };
          }),
        api
          .get(`/api/quizzes/?module_id=${moduleId}`)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return { data: { success: false, data: [] } };
          }),
      ]);

      const liveClasses = (liveClassRes.data.success ? liveClassRes.data.data : []) || [];
      const assignments = (assignmentRes.data.success ? assignmentRes.data.data : []) || [];
      let quizzes = (quizRes.data.success ? quizRes.data.data : []) || [];

      // Filter out quizzes without questions (temporary - should be done on backend)
      const originalQuizCount = quizzes.length;
      quizzes = quizzes.filter((quiz) => {
        const hasQuestions = quiz.question_count > 0 || quiz.total_questions > 0;
        return hasQuestions;
      });

      // Calculate completed items using backend fields
      const completedClasses = liveClasses.filter(
        (c) => c.status === 'completed' || c.attendance_marked
      ).length;
      const completedAssignments = assignments.filter((a) => a.has_submitted === true).length;

      // Quiz is considered completed if:
      // 1. is_completed is true, OR
      // 2. attempts_used > 0 (has attempted at least once), OR
      // 3. best_score exists and > 0
      const completedQuizzes = quizzes.filter((q) => {
        const isCompleted =
          q.is_completed === true ||
          q.attempts_used > 0 ||
          (q.best_score !== null && q.best_score !== undefined);

        return isCompleted;
      }).length;

      const totalItems = liveClasses.length + assignments.length + quizzes.length;
      const completedItems = completedClasses + completedAssignments + completedQuizzes;
      const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

      setModuleInfo({
        title: `Module Content`,
        dateRange: 'In Progress',
        progress,
        totalClasses: liveClasses.length,
        completedClasses,
        totalAssignments: assignments.length,
        completedAssignments,
        totalQuizzes: quizzes.length,
        completedQuizzes,
      });
    } catch (error) {
      console.error('❌ Error fetching module info:', error);
      // Set default values on error
      setModuleInfo({
        title: 'Module Content',
        dateRange: 'In Progress',
        progress: 0,
        totalClasses: 0,
        completedClasses: 0,
        totalAssignments: 0,
        completedAssignments: 0,
        totalQuizzes: 0,
        completedQuizzes: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-black/10 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!moduleInfo) return null;

  return (
    <div className="space-y-md">
      {/* Module Info Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-black/10 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Module Information
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-lg text-gray-800">{moduleInfo.title}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Calendar className="w-4 h-4" />
              <span>{moduleInfo.dateRange}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-primary">{moduleInfo.progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${moduleInfo.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Live Classes</span>
              <span className="text-sm font-bold text-blue-600">
                {moduleInfo.completedClasses}/{moduleInfo.totalClasses}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Assignments</span>
              <span className="text-sm font-bold text-green-600">
                {moduleInfo.completedAssignments}/{moduleInfo.totalAssignments}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Quizzes</span>
              <span className="text-sm font-bold text-orange-600">
                {moduleInfo.completedQuizzes}/{moduleInfo.totalQuizzes}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Study Tips
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-white/80">•</span>
            <span>Complete all live classes before attempting quizzes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/80">•</span>
            <span>Submit assignments before the due date</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white/80">•</span>
            <span>Review recordings if you miss a class</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModuleContentSidebar;
