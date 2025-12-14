import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashBoardHeader from '../../../../components/Dashboard/common/DashBoardHeader';
import ModuleTable from '../../../../components/Dashboard/common/ModuleTable';
import { studentResourceColumnData } from '../../../../utils/studentResourceColumnData';
import { fetchMyCourses } from '../../../../redux/courses/courseAction';
import api from '@/api/axios';
import { Download, ExternalLink, FileText } from 'lucide-react';

const StudentResources = () => {
  const dispatch = useDispatch();
  const { myCourses } = useSelector((state) => state.course);
  const [selectedCourseKey, setSelectedCourseKey] = useState('');
  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);

  // Fetch courses on mount
  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  // Auto-select first course on mount
  useEffect(() => {
    if (myCourses && myCourses.length > 0 && !selectedCourseKey) {
      const firstCourseKey = `${myCourses[0].course_slug}`;
      setSelectedCourseKey(firstCourseKey);
    }
  }, [myCourses, selectedCourseKey]);

  // Fetch resources when course selected
  useEffect(() => {
    if (selectedCourseKey) {
      const courseSlug = selectedCourseKey.split('-')[0];
      fetchResources(courseSlug);
    }
  }, [selectedCourseKey]);

  const fetchResources = async (courseSlug) => {
    try {
      setLoadingResources(true);
      setResources([]);

      const modulesRes = await api.get(`/api/courses/${courseSlug}/modules/`);
      
      if (modulesRes.data.success && modulesRes.data.data.length > 0) {
        const modules = modulesRes.data.data;
        const allResources = [];

        for (const module of modules) {
          try {
            // Fetch resources using the Resources API
            const resourcesRes = await api.get(`/api/resources?module_id=${module.id}`);
            if (resourcesRes.data.success && resourcesRes.data.data.length > 0) {
              const moduleResources = resourcesRes.data.data.map((resource) => ({
                ...resource,
                module_title: module.title,
                module_id: module.id,
              }));
              allResources.push(...moduleResources);
            }
          } catch (err) {
            console.error(`Error fetching resources for module ${module.id}:`, err);
          }
        }

        if (allResources.length > 0) {
          const groupedResources = modules
            .map((module, index) => ({
              moduleNumber: index + 1,
              moduleTitle: module.title,
              sessions: allResources
                .filter((r) => r.module_id === module.id)
                .map((resource) => ({
                  ...resource,
                  headline: resource.title || 'Class Material',
                  time: resource.created_at
                    ? new Date(resource.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : '—',
                  watch: (
                    <ResourceButton
                      resourceId={resource.id}
                      resourceUrl={resource.file_url || resource.external_url}
                      title={resource.title}
                    />
                  ),
                })),
            }))
            .filter((m) => m.sessions.length > 0);

          setResources(groupedResources);
        } else {
          setResources([]);
        }
      } else {
        setResources([]);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setResources([]);
    } finally {
      setLoadingResources(false);
    }
  };

  const handleCourseChange = (e) => {
    setSelectedCourseKey(e.target.value);
  };

  // Get selected course details using the unique key
  const selectedCourse = myCourses?.find(c => `${c.course_slug}-${c.batchSlug}` === selectedCourseKey);

  return (
    <div>
      <DashBoardHeader title={`Resources`} searchBar={false} />
      
      {/* Course Dropdown */}
      {myCourses && myCourses.length > 0 ? (
        <div className="p-md bg-white shadow-md border border-black/10 rounded-lg mb-lg">
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
                  {course.course_title} {course.batchName && course.batchName !== 'N/A' ? `- ${course.batchName}` : ''}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div className="p-xl flex gap-xl item-start justify-center flex-wrap rounded-lg border border-black/10 w-full bg-white shadow-md mb-xl">
          <img width={200} src="/assets/no-recording-image.png" alt="No Courses" />
          <div>
            <h2 className="text-3xl text-primary font-bold">You haven't enrolled in any courses yet.</h2>
            <p className="text-base mt-sm max-w-150">
              Enroll in a course to access class materials and learning resources.
            </p>
          </div>
        </div>
      )}

      {/* Resources Display */}
      {myCourses && myCourses.length > 0 && (
        <>
          {loadingResources ? (
            <div className="flex items-center justify-center py-12 bg-white rounded-lg shadow-md border border-black/10">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : !selectedCourseKey ? (
            <div className="flex items-center justify-center py-12 bg-white rounded-lg shadow-md border border-black/10">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : resources.length === 0 ? (
            <div className="p-xl flex gap-xl item-start justify-center flex-wrap rounded-lg border border-black/10 w-full bg-white shadow-md mb-xl">
              <div className="flex items-center justify-center w-48 h-48">
                <FileText size={120} className="text-gray-300" />
              </div>
              <div>
                <h2 className="text-3xl text-primary font-bold">No resources available yet.</h2>
                <p className="text-base mt-sm max-w-150">
                  Class materials will appear here once they are uploaded by your instructors.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-black/10 p-md mb-lg">
              <ModuleTable
                colEarly={true}
                modules={resources}
                tableColumns={studentResourceColumnData}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Resource Button Component
const ResourceButton = ({ resourceId, resourceUrl, title }) => {
  const isExternalLink = resourceUrl && (resourceUrl.startsWith('http://') || resourceUrl.startsWith('https://'));

  const handleClick = async () => {
    if (resourceUrl) {
      try {
        // Call download API to track download count
        await api.get(`/api/resources/${resourceId}/download`);
        
        // Open/download the resource
        if (isExternalLink) {
          window.open(resourceUrl, '_blank', 'noopener,noreferrer');
        } else {
          // Download file
          const link = document.createElement('a');
          link.href = resourceUrl;
          link.download = title || 'resource';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error('Error downloading resource:', error);
        // Still try to open/download even if tracking fails
        if (isExternalLink) {
          window.open(resourceUrl, '_blank', 'noopener,noreferrer');
        } else {
          window.open(resourceUrl, '_blank');
        }
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
    >
      {isExternalLink ? (
        <>
          <ExternalLink size={16} />
          Open
        </>
      ) : (
        <>
          <Download size={16} />
          Download
        </>
      )}
    </button>
  );
};

export default StudentResources;
