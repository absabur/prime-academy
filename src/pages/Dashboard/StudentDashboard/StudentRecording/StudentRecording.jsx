import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashBoardHeader from '../../../../components/Dashboard/common/DashBoardHeader';
import PrimaryButton from '../../../../components/common/PrimaryButton';
import { TriangleAlert } from 'lucide-react';
import { fetchMyCourses } from '../../../../redux/courses/courseAction';
import api from '@/api/axios';
import ModuleTable from '../../../../components/Dashboard/common/ModuleTable';
import { studentRecordingColumnData } from '../../../../utils/studentRecordingColumnData';
import Modal from '../../../../components/common/Modal';
import { getYouTubeID } from '../../../../utils/getYouTubeID';

// Video Player Button Component
export const VideoPlayerButton = ({ videoUrl, title }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="ml-0 w-full xl:w-fit xl:mx-auto flex gap-sm items-center justify-center bg-secondary hover:bg-primary text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200"
      >
        Watch
      </button>

      {showModal && (
        <Modal setModal={setShowModal}>
          <div className="w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            {videoUrl ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeID(videoUrl)}?autoplay=1&mute=0&playsinline=1`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={title || 'Recording'}
              ></iframe>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <p className="text-white">Video not available</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

const StudentRecording = () => {
  const dispatch = useDispatch();
  const { myCourses, loadingmyCourses } = useSelector((state) => state.course);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [loadingRecordings, setLoadingRecordings] = useState(false);

  // Fetch enrolled courses on mount
  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  // Auto-select first course when courses load
  useEffect(() => {
    if (myCourses && myCourses.length > 0 && !selectedCourseSlug) {
      setSelectedCourseSlug(myCourses[0].course_slug);
    }
  }, [myCourses]);

  // Fetch recordings when course is selected
  useEffect(() => {
    if (selectedCourseSlug) {
      fetchRecordings(selectedCourseSlug);
    }
  }, [selectedCourseSlug]);

  const fetchRecordings = async (courseSlug) => {
    try {
      setLoadingRecordings(true);
      const modulesRes = await api.get(`/api/courses/${courseSlug}/modules/`);

      if (modulesRes.data.success && modulesRes.data.data.length > 0) {
        const modules = modulesRes.data.data;
        const allRecordings = [];

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

        if (allRecordings.length > 0) {
          const groupedRecordings = modules
            .map((module, index) => ({
              moduleNumber: index + 1,
              moduleTitle: module.title,
              sessions: allRecordings
                .filter((r) => r.module_id === module.id)
                .map((recording) => ({
                  ...recording,
                  headline: recording.title || recording.topic || 'Class Recording',
                  duration: recording.duration || '—',
                  time: recording.scheduled_date
                    ? new Date(recording.scheduled_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : '—',
                  watch: (
                    <VideoPlayerButton
                      videoUrl={recording.recording_url}
                      title={recording.title || recording.topic}
                    />
                  ),
                })),
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

  return (
    <div>
      <DashBoardHeader title={`Recording`} searchBar={false} />

      {/* Course Dropdown */}
      {loadingmyCourses ? (
        <div className="p-md bg-white shadow-md border border-black/10 rounded-lg mb-lg flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : myCourses && myCourses.length > 0 ? (
        <div className="p-md bg-white shadow-md border border-black/10 rounded-lg mb-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
          <select
            value={selectedCourseSlug}
            onChange={(e) => setSelectedCourseSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {myCourses.map((course) => (
              <option key={course.course_slug} value={course.course_slug}>
                {course.course_title}{' '}
                {course.batchName && course.batchName !== 'N/A' ? `- ${course.batchName}` : ''}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="p-xl flex gap-xl item-start justify-center flex-wrap rounded-lg border border-black/10 w-full bg-white shadow-md mb-xl">
          <img width={200} src="/assets/no-recording-image.png" alt="No Courses" />
          <div>
            <h2 className="text-3xl text-primary font-bold">
              You haven't enrolled in any courses yet.
            </h2>
            <p className="text-base mt-sm max-w-150">
              Enroll in a course to access class recordings and other learning materials.
            </p>
          </div>
        </div>
      )}

      {/* Recordings Display */}
      {selectedCourseSlug && (
        <>
          {loadingRecordings ? (
            <div className="flex items-center justify-center py-12 bg-white rounded-lg shadow-md border border-black/10">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : recordings.length === 0 ? (
            <div className="p-xl flex gap-xl item-start justify-center flex-wrap rounded-lg border border-black/10 w-full bg-white shadow-md mb-xl">
              <img width={200} src="/assets/no-recording-image.png" alt="No Recording" />
              <div>
                <h2 className="text-3xl text-primary font-bold">No recordings available yet.</h2>
                <p className="text-base mt-sm max-w-150">
                  Class recordings will appear here once they are uploaded by your instructors.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-black/10 p-md mb-lg">
              <ModuleTable
                colEarly={true}
                modules={recordings}
                tableColumns={studentRecordingColumnData}
              />
            </div>
          )}
        </>
      )}

      <div className="px-lg py-md rounded-lg bg-white shadow-sm ml-auto w-fit border border-black/10">
        <PrimaryButton prefixIcon={<TriangleAlert />} text={`Have Any Problem?`} />
      </div>
    </div>
  );
};

export default StudentRecording;
