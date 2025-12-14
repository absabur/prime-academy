import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Info, Radio, Loader2, CalendarClock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchMyCourses } from '../../../../redux/courses/courseAction';
import api from '@/api/axios';

export default function StudentClassJoining() {
  const dispatch = useDispatch();
  const { myCourses } = useSelector((state) => state.course);
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch courses on mount
  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  // 2. Fetch Logic (Wrapped in useCallback for performance)
  const fetchAllLiveClasses = useCallback(async () => {
    if (!myCourses || myCourses.length === 0) return;

    try {
      setLoading(true);
      // We don't clear liveClasses here to prevent UI flickering if refreshing

      // Parallel Request Strategy
      const coursePromises = myCourses.map(async (course) => {
        try {
          // Fetch Modules
          const modulesRes = await api.get(`/api/courses/${course.course_slug}/modules/`);

          if (modulesRes.data.success && modulesRes.data.data.length > 0) {
            const modules = modulesRes.data.data;

            // Fetch Live Classes for all modules simultaneously
            const modulePromises = modules.map(async (module) => {
              try {
                const liveClassRes = await api.get(`/api/live-classes?module_id=${module.id}`);
                if (liveClassRes.data.success && liveClassRes.data.data.length > 0) {
                  return liveClassRes.data.data.map((lc) => ({
                    ...lc,
                    course_title: course.course_title,
                    module_title: module.title,
                    module_id: module.id,
                  }));
                }
                return [];
              } catch (err) {
                return []; // Fail silently for individual module errors
              }
            });

            const moduleResults = await Promise.all(modulePromises);
            return moduleResults.flat();
          }
          return [];
        } catch (err) {
          return [];
        }
      });

      const allCourseResults = await Promise.all(coursePromises);
      const allUnifiedClasses = allCourseResults.flat();

      // Filter only upcoming/ongoing immediately to save memory
      const activeClasses = allUnifiedClasses.filter(
        (lc) => lc.status === 'scheduled' || lc.status === 'ongoing'
      );

      // Sort by date
      activeClasses.sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));

      setLiveClasses(activeClasses);
    } catch (error) {
      console.error('Error fetching live classes:', error);
    } finally {
      setLoading(false);
    }
  }, [myCourses]);

  // 3. Trigger Fetch
  useEffect(() => {
    if (myCourses?.length > 0) {
      fetchAllLiveClasses();
    }
  }, [myCourses, fetchAllLiveClasses]);

  return (
    <>
      <div className="mb-md w-full mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        {/* --- DISPLAY LOGIC START --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-gray-500 font-medium">Checking schedules...</p>
          </div>
        ) : liveClasses.length > 0 ? (
          /* --- ACTIVE STATE: Live Classes Found (Attractive UI) --- */
          <div className="p-6 bg-gradient-to-r from-blue-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Radio size={100} className="text-blue-600" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">Live Class Scheduled</h2>
                </div>
                <p className="text-gray-600">
                  You have <span className="font-bold text-blue-600">{liveClasses.length}</span>{' '}
                  upcoming session{liveClasses.length > 1 ? 's' : ''}.
                </p>
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <CalendarClock size={16} />
                  Next:{' '}
                  {new Date(liveClasses[0].scheduled_date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  • {liveClasses[0].course_title}
                </div>
              </div>

              <Link
                to="/student-dashboard/class-joining"
                className="group flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Join Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          /* --- EMPTY STATE: No Classes (Your requested UI) --- */
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-full shrink-0">
                <Info className="w-8 h-8 text-blue-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  No live classes today
                </h2>
                <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg">
                  Practice previous classes and assignments
                  <br className="hidden sm:block" /> during this time.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* --- DISPLAY LOGIC END --- */}
      </div>
    </>
  );
}
