import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '@/api/axios';
import { CertificateCard, NavigationTabs, ResetCourseCard } from './LeftSideTopContent';
import ModuleCard from './ModuleCard';
import ModuleTable from '../../common/ModuleTable';
import {
  studentDashboardAssignmentTabColumnData,
} from '../../../../utils/studentDashboardAssignmentTab';
import { studentRecordingColumnData } from '../../../../utils/studentRecordingColumnData';
import {
  studentDashboardResourceTabColumnData,
} from '../../../../utils/studentDashboardResourceTab';
import StudentCourseAttendance from '../StudentModuleContent/StudentCourseAttendance';

const LeftSideContent = () => {
  const { courseSlug } = useParams();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab');
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [loadingRecordings, setLoadingRecordings] = useState(false);
  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);

  useEffect(() => {
    if (currentTab === 'Modules') {
      fetchModules();
    } else if (currentTab === 'Assignment') {
      fetchAssignments();
    } else if (currentTab === 'Recording') {
      fetchRecordings();
    } else if (currentTab === 'Resource') {
      fetchResources();
    }
  }, [currentTab, courseSlug]);

  const fetchModules = async () => {
    try {
      setLoadingModules(true);

      const response = await api.get(`/api/courses/${courseSlug}/modules/`);

      if (response.data.success) {
        const modulesData = response.data.data;

        // Enrich modules with assignment, quiz counts, and first class date
        const enrichedModules = await Promise.all(
          modulesData.map(async (module) => {
            try {
              // Fetch assignments count
              const assignmentRes = await api.get(`/api/assignments/?module_id=${module.id}`);
              const assignment_count = assignmentRes.data.success
                ? assignmentRes.data.data.length
                : 0;

              // Fetch quizzes count
              const quizRes = await api.get(`/api/quizzes/?module_id=${module.id}`);
              const quiz_count = quizRes.data.success ? quizRes.data.data.length : 0;

              // Fetch first live class date
              const liveClassRes = await api.get(`/api/live-classes/?module_id=${module.id}`);
              let first_class_date = null;
              if (liveClassRes.data.success && liveClassRes.data.data.length > 0) {
                // Sort by scheduled_at and get the first one
                const sortedClasses = liveClassRes.data.data.sort(
                  (a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at)
                );
                first_class_date = sortedClasses[0].scheduled_at;
              }

              return {
                ...module,
                assignment_count,
                quiz_count,
                start_date: first_class_date || module.start_date,
              };
            } catch (err) {
              console.error(`Error fetching counts for module ${module.id}:`, err);
              return {
                ...module,
                assignment_count: 0,
                quiz_count: 0,
                start_date: module.start_date, // Preserve original start_date on error
              };
            }
          })
        );

        setModules(enrichedModules);
      } else {
        setModules([]);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
      setModules([]);
    } finally {
      setLoadingModules(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      setLoadingAssignments(true);
      // Get modules first
      const modulesRes = await api.get(`/api/courses/${courseSlug}/modules/`);
      if (modulesRes.data.success && modulesRes.data.data.length > 0) {
        const modules = modulesRes.data.data;
        const allAssignments = [];

        // Fetch ONLY assignments for each module
        for (const module of modules) {
          try {
            // Fetch assignments
            const assignmentRes = await api.get(`/api/assignments/?module_id=${module.id}`);
            if (assignmentRes.data.success) {
              const assignmentsWithModule = assignmentRes.data.data.map((assignment) => {
                // Format the assignment data to match the table structure
                const formatDate = (dateString) => {
                  if (!dateString) return '—';
                  const date = new Date(dateString);
                  return date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                };

                return {
                  ...assignment,
                  headline: assignment.title,
                  time: formatDate(assignment.due_date),
                  module_title: module.title,
                  module_id: module.id,
                };
              });
              allAssignments.push(...assignmentsWithModule);
            }
          } catch (err) {
            console.error(`Error fetching assignments for module ${module.id}:`, err);
          }
        }

        // Only set assignments if we found any
        if (allAssignments.length > 0) {
          // Group assignments by module for ModuleTable
          const groupedAssignments = modules
            .map((module, index) => ({
              moduleNumber: index + 1,
              moduleTitle: module.title,
              sessions: allAssignments
                .filter((a) => a.module_id === module.id)
                .map((assignment) => ({
                  ...assignment,
                  headline: (
                    <div>
                      <div className="font-semibold text-black">{assignment.headline}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        Module: {assignment.module_title}
                      </div>
                    </div>
                  ),
                  status: (
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                        assignment.submission_status === 'submitted'
                          ? 'bg-green-100 text-green-700'
                          : assignment.submission_status === 'graded'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {assignment.submission_status === 'submitted'
                        ? 'Submitted'
                        : assignment.submission_status === 'graded'
                          ? 'Graded'
                          : 'Pending'}
                    </div>
                  ),
                  watch: (
                    <button
                      onClick={() => {
                        // Navigate to module page assignments tab
                        window.location.href = `/student-dashboard/my-course/${courseSlug}/module/${assignment.module_id}?tab=assignments`;
                      }}
                      className="ml-0 w-full xl:w-fit xl:mx-auto flex gap-sm items-center justify-center bg-secondary hover:bg-primary text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200"
                    >
                      {assignment.submission_status === 'submitted' ||
                      assignment.submission_status === 'graded'
                        ? 'View'
                        : 'Submit'}
                    </button>
                  ),
                })),
            }))
            .filter((m) => m.sessions.length > 0);

          setAssignments(groupedAssignments);
        } else {
          setAssignments([]);
        }
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setAssignments([]);
    } finally {
      setLoadingAssignments(false);
    }
  };

  const fetchRecordings = async () => {
    try {
      setLoadingRecordings(true);
      // Get modules first
      const modulesRes = await api.get(`/api/courses/${courseSlug}/modules/`);
      if (modulesRes.data.success && modulesRes.data.data.length > 0) {
        const modules = modulesRes.data.data;
        const allRecordings = [];

        // Fetch live classes for each module and filter ones with recordings
        for (const module of modules) {
          try {
            const liveClassRes = await api.get(`/api/live-classes/?module_id=${module.id}`);
            if (liveClassRes.data.success) {
              const recordingsOnly = liveClassRes.data.data
                .filter((lc) => lc.has_recording && lc.recording_url)
                .map((lc) => ({
                  ...lc,
                  module_title: module.title,
                  module_id: module.id,
                }));
              allRecordings.push(...recordingsOnly);
            }
          } catch (err) {
            console.error(`Error fetching recordings for module ${module.id}:`, err);
          }
        }

        // Only set recordings if we found any
        if (allRecordings.length > 0) {
          // Group recordings by module for ModuleTable
          const groupedRecordings = modules
            .map((module, index) => ({
              moduleNumber: index + 1,
              sessions: allRecordings.filter((r) => r.module_id === module.id),
            }))
            .filter((m) => m.sessions.length > 0);

          setRecordings(groupedRecordings);
        } else {
          setRecordings([]);
        }
      } else {
        setRecordings([]);
      }
    } catch (error) {
      console.error('Error fetching recordings:', error);
      setRecordings([]);
    } finally {
      setLoadingRecordings(false);
    }
  };

  const fetchResources = async () => {
    try {
      setLoadingResources(true);
      // Try to fetch resources from backend
      try {
        const response = await api.get(`/api/courses/${courseSlug}/resources/`);
        if (response.data.success) {
          setResources(response.data.data);
          setLoadingResources(false);
          return;
        }
      } catch (err) {
        // If resources endpoint doesn't exist, show empty state
        setResources([]);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setResources([]);
    } finally {
      setLoadingResources(false);
    }
  };

  return (
    <div>
      <div className="space-y-md">
        <ResetCourseCard />
        <NavigationTabs />
      </div>

      {/* Modules tab show */}
      {currentTab == 'Modules' && (
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-md mt-lg">
          {loadingModules ? (
            <div className="col-span-2 flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : modules.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">No modules found for this course.</p>
            </div>
          ) : (
            modules.map((item, index) => <ModuleCard key={item.id || index} module={item} />)
          )}
        </div>
      )}

      {/* Assignment Tab Show */}
      {currentTab == 'Assignment' && (
        <>
          {loadingAssignments ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No assignments found for this course.</p>
            </div>
          ) : (
            <ModuleTable
              colEarly={true}
              noParent={false}
              modules={assignments}
              tableColumns={studentDashboardAssignmentTabColumnData}
            />
          )}
        </>
      )}

      {/* Recording Tab Show */}
      {currentTab == 'Recording' && (
        <>
          {loadingRecordings ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : recordings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No recordings found for this course.</p>
            </div>
          ) : (
            <ModuleTable
              colEarly={true}
              modules={recordings}
              tableColumns={studentRecordingColumnData}
            />
          )}
        </>
      )}

      {/* Resource Tab Show */}
      {currentTab == 'Resource' && (
        <>
          {loadingResources ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources found for this course.</p>
            </div>
          ) : (
            <ModuleTable
              colEarly={true}
              noParent={true}
              modules={resources}
              tableColumns={studentDashboardResourceTabColumnData}
            />
          )}
        </>
      )}

      {/* Certificate Tab Show */}
      {currentTab == 'Certificate' && (
        <div className="mt-md">
          <CertificateCard />
        </div>
      )}

      {/* Attendance Tab Show */}
      {currentTab == 'Attendance' && (
        <div className="mt-md">
          <StudentCourseAttendance courseSlug={courseSlug} />
        </div>
      )}
    </div>
  );
};

export default LeftSideContent;

const demoQuizData = [
  {
    moduleTitle: 'Module 1',
    quizTitle: 'Module 1 Quiz',
    dateRange: '11 Apr - 17 Apr',
    description: 'Please check result for Answer sheet.',
    mark: '10/10',
  },
  {
    moduleTitle: 'Module 2',
    quizTitle: 'Module 2 Quiz',
    dateRange: '11 Apr - 17 Apr',
    description: 'Please check result for Answer sheet.',
    mark: '10/10',
  },
  {
    moduleTitle: 'Module 3',
    quizTitle: 'Module 3 Quiz',
    dateRange: '11 Apr - 17 Apr',
    description: 'Please check result for Answer sheet.',
    mark: '',
  },
];
