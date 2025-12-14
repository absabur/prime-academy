import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Radio, FileText } from 'lucide-react';
import ScheduleSection from '../../../../components/Dashboard/StudentDashboard/StudentClassJoining/ScheduleSection';
import PageHeader from '../../../../components/Dashboard/StudentDashboard/StudentClassJoining/PageHeader';
import HelpSection from '../../../../components/Dashboard/StudentDashboard/StudentClassJoining/HelpSection';
import { fetchMyCourses } from '../../../../redux/courses/courseAction';
import api from '@/api/axios';

export default function StudentClassJoining() {
  const dispatch = useDispatch();
  const { myCourses } = useSelector((state) => state.course);
  const [selectedCourseKey, setSelectedCourseKey] = useState('');
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch courses on mount
  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  // Auto-select first course
  useEffect(() => {
    if (myCourses && myCourses.length > 0 && !selectedCourseKey) {
      const firstCourseKey = `${myCourses[0].course_slug}`;
      setSelectedCourseKey(firstCourseKey);
    }
  }, [myCourses, selectedCourseKey]);

  // Fetch live classes when course selected
  useEffect(() => {
    if (selectedCourseKey) {
      const courseSlug = selectedCourseKey;
      fetchLiveClasses(courseSlug);
    }
  }, [selectedCourseKey]);

  const fetchLiveClasses = async (courseSlug) => {
    try {
      setLoading(true);
      setLiveClasses([]);

      // 1. Fetch Modules first
      const modulesRes = await api.get(`/api/courses/${courseSlug}/modules/`);

      if (modulesRes.data.success && modulesRes.data.data.length > 0) {
        const modules = modulesRes.data.data;

        // 2. Create an array of promises (requests) to run in parallel
        const fetchPromises = modules.map(async (module) => {
          try {
            const liveClassRes = await api.get(`/api/live-classes?module_id=${module.id}`);

            if (liveClassRes.data.success && liveClassRes.data.data.length > 0) {
              // Map the results immediately
              return liveClassRes.data.data.map((lc) => ({
                ...lc,
                module_title: module.title,
                module_id: module.id,
              }));
            }
            return []; // Return empty array if no data found
          } catch (err) {
            console.error(`Error fetching live classes for module ${module.id}:`, err);
            return []; // Return empty array on error so Promise.all doesn't fail
          }
        });

        // 3. Await all requests to finish simultaneously
        const results = await Promise.all(fetchPromises);

        // 4. Flatten the array of arrays into a single list
        const allClasses = results.flat();

        setLiveClasses(allClasses);
      }
    } catch (error) {
      console.error('Error fetching live classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (e) => {
    setSelectedCourseKey(e.target.value);
  };

  // Filter upcoming/ongoing classes
  const upcomingClasses = liveClasses.filter(
    (lc) => lc.status === 'scheduled' || lc.status === 'ongoing'
  );

  // Format classes for ScheduleSection component
  const formattedClasses = upcomingClasses.map((lc) => ({
    id: lc.id,
    topic: lc.title || lc.topic,
    instructor: {
      name: lc.instructor_name || 'Instructor',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(lc.instructor_name || 'I')}&background=random`,
    },
    schedule: lc.scheduled_date
      ? new Date(lc.scheduled_date).toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : 'Schedule TBA',
    meeting_url: lc.meeting_url,
    can_join: lc.can_join,
    status: lc.status,
    module_title: lc.module_title,
  }));

  // Get selected course details using the unique key
  const selectedCourse = myCourses?.find(
    (c) => `${c.course_slug}-${c.batchSlug}` === selectedCourseKey
  );

  return (
    <>
      <div className="mx-auto bg-white p-lg rounded-lg border border-black/10 shadow-md">
        <PageHeader
          courseTitle={selectedCourse?.course_title}
          batchName={selectedCourse?.batchName}
        />

        {/* Course Dropdown */}
        {myCourses && myCourses.length > 0 ? (
          <div className="mb-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
            <select
              value={selectedCourseKey}
              onChange={handleCourseChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {myCourses.map((course) => {
                const courseKey = `${course.course_slug}`;
                return (
                  <option key={courseKey} value={courseKey}>
                    {course.course_title}{' '}
                    {course.batchName && course.batchName !== 'N/A' ? `- ${course.batchName}` : ''}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <div className="p-xl flex gap-xl item-start justify-center flex-wrap rounded-lg border border-black/10 w-full bg-gray-50 mb-lg">
            <div className="flex items-center justify-center w-32 h-32">
              <FileText size={80} className="text-gray-300" />
            </div>
            <div>
              <h2 className="text-2xl text-primary font-bold">No Courses Enrolled</h2>
              <p className="text-base mt-sm">Enroll in a course to see upcoming classes.</p>
            </div>
          </div>
        )}

        {/* Live Classes Display */}
        {myCourses && myCourses.length > 0 && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : !selectedCourseKey ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : formattedClasses.length === 0 ? (
              <div className="p-xl flex gap-xl item-start justify-center flex-wrap rounded-lg border border-black/10 w-full bg-gray-50">
                <div className="flex items-center justify-center w-32 h-32">
                  <Radio size={80} className="text-gray-300" />
                </div>
                <div>
                  <h2 className="text-2xl text-primary font-bold">No Upcoming Classes</h2>
                  <p className="text-base mt-sm">
                    There are no scheduled classes at the moment. Check back later!
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-lg">Upcoming Classes</h2>
                <ScheduleSection
                  title="Live Classes"
                  icon={Radio}
                  classes={formattedClasses}
                  isLive={true}
                />
              </>
            )}
          </>
        )}
      </div>

      <HelpSection />
    </>
  );
}
