import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { Loader2 } from 'lucide-react';

const formatDateShort = (dateString) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  return d.toLocaleString();
};

const StudentCourseAttendance = ({ courseSlug, moduleId, refreshTrigger }) => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAttendance = async () => {
      setLoading(true);
      try {
        // If moduleId is provided, fetch only that module's attendance
        if (moduleId) {
          const classesRes = await api.get(`/api/live-classes/?module_id=${moduleId}`);
          if (!classesRes.data?.success) {
            if (mounted)
              setSummary({ modules: [], totalClasses: 0, totalAttended: 0, percentage: 0 });
            return;
          }

          const classes = classesRes.data.data || [];

          const classesWithAttendance = await Promise.all(
            classes.map(async (lc) => {
              // Prefer attendance included in class object
              if (lc.my_attendance) return { ...lc, my_attendance: lc.my_attendance };

              // Use student-specific endpoint to get own attendance
              try {
                const attResp = await api.get(`/api/live-classes/${lc.id}/my-attendance/`);
                if (attResp.data?.success && attResp.data.data) {
                  return { ...lc, my_attendance: attResp.data.data };
                }
              } catch (e) {
                // ignore - attendance not available
              }

              return { ...lc, my_attendance: null };
            })
          );

          const total = classesWithAttendance.length;
          const attended = classesWithAttendance.filter(
            (c) => c.my_attendance?.attended
          ).length;
          const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;

          if (mounted) {
            setSummary({
              modules: [
                {
                  module_title: 'Current Module',
                  classes: classesWithAttendance,
                },
              ],
              totalClasses: total,
              totalAttended: attended,
              percentage,
            });
          }
          return;
        }

        // Otherwise, fetch all modules (for course-level attendance)
        const modulesRes = await api.get(`/api/courses/${courseSlug}/modules/`);
        if (!modulesRes.data?.success) {
          if (mounted)
            setSummary({ modules: [], totalClasses: 0, totalAttended: 0, percentage: 0 });
          return;
        }

        const modules = modulesRes.data.data;

        const moduleDetails = await Promise.all(
          modules.map(async (m) => {
            try {
              const classesRes = await api.get(`/api/live-classes/?module_id=${m.id}`);
              const classes = classesRes.data?.success ? classesRes.data.data : [];

              const classesWithAttendance = await Promise.all(
                classes.map(async (lc) => {
                  // Prefer attendance included in class object
                  if (lc.my_attendance) return { ...lc, my_attendance: lc.my_attendance };

                  // Use student-specific endpoint to get own attendance
                  try {
                    const attResp = await api.get(
                      `/api/live-classes/${lc.id}/my-attendance/`
                    );
                    if (attResp.data?.success && attResp.data.data) {
                      return { ...lc, my_attendance: attResp.data.data };
                    }
                  } catch (e) {
                    // ignore - attendance not available
                  }

                  return { ...lc, my_attendance: null };
                })
              );

              const total = classesWithAttendance.length;
              const attended = classesWithAttendance.filter(
                (c) => c.my_attendance && (c.my_attendance.attended || c.my_attendance.joined_at)
              ).length;

              return {
                moduleId: m.id,
                moduleTitle: m.title || m.name || `Module ${m.order || m.id}`,
                total,
                attended,
                classes: classesWithAttendance,
              };
            } catch (err) {
              return {
                moduleId: m.id,
                moduleTitle: m.title || `Module`,
                total: 0,
                attended: 0,
                classes: [],
              };
            }
          })
        );

        const totalClasses = moduleDetails.reduce((s, m) => s + (m.total || 0), 0);
        const totalAttended = moduleDetails.reduce((s, m) => s + (m.attended || 0), 0);
        const percentage =
          totalClasses === 0 ? 0 : Math.round((totalAttended / totalClasses) * 100);

        if (mounted)
          setSummary({ modules: moduleDetails, totalClasses, totalAttended, percentage });
      } catch (err) {
        console.error('Error fetching course attendance:', err);
        if (mounted) setSummary({ modules: [], totalClasses: 0, totalAttended: 0, percentage: 0 });
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAttendance();

    return () => {
      mounted = false;
    };
  }, [courseSlug, moduleId, refreshTrigger]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Attendance Summary</h3>
      <div className="text-sm text-gray-600 mb-3">
        {summary.totalAttended} / {summary.totalClasses} attended — {summary.percentage}%
      </div>

      <div className="space-y-3">
        {summary.modules.map((m, idx) => (
          <div key={m.moduleId} className="border border-black/5 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">
                Module {idx + 1}: {m.moduleTitle}
              </div>
              <div className="text-sm text-gray-600">
                {m.attended} / {m.total}
              </div>
            </div>

            <ul className="text-sm text-gray-700 space-y-1">
              {m.classes.map((c) => {
                const scheduled = c.scheduled_at || c.scheduledAt || null;
                const isPast = scheduled ? new Date(scheduled) <= new Date() : false;
                const attended =
                  c.my_attendance &&
                  (c.my_attendance.attended ||
                    c.my_attendance.joined_at ||
                    c.my_attendance.joinedAt);

                return (
                  <li key={c.id} className="flex items-center justify-between">
                    <div className="truncate flex-1">
                      <div className="font-medium">{c.title || c.name || 'Class'}</div>
                      {scheduled && (
                        <div className="text-xs text-gray-500">
                          {new Date(scheduled).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="ml-3 text-xs text-right whitespace-nowrap">
                      {attended ? (
                        <div className="text-green-600">Present</div>
                      ) : !scheduled ? (
                        <div className="text-blue-600">Upcoming</div>
                      ) : isPast ? (
                        <div className="text-red-600">Missed</div>
                      ) : (
                        <div className="text-blue-600">Upcoming</div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourseAttendance;
