import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { Loader2 } from 'lucide-react';

const formatDateShort = (dateString) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  return d.toLocaleString();
};

const StudentCourseAttendance = ({ courseSlug }) => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAttendance = async () => {
      setLoading(true);
      try {
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

                  // Try dedicated student attendance endpoint
                  try {
                    const attResp = await api.get(
                      `/api/live-classes/${lc.id}/attendances/?student=true`
                    );
                    if (attResp.data?.success && attResp.data.data.length > 0) {
                      return { ...lc, my_attendance: attResp.data.data[0] };
                    }
                  } catch (e) {
                    // ignore
                  }

                  // Fallback to attendances list and pick probable self record
                  try {
                    const attResp2 = await api.get(`/api/live-classes/${lc.id}/attendances/`);
                    if (attResp2.data?.success && attResp2.data.data.length > 0) {
                      const found =
                        attResp2.data.data.find((a) => a.is_self) || attResp2.data.data[0];
                      return { ...lc, my_attendance: found };
                    }
                  } catch (e) {
                    // ignore
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
  }, [courseSlug]);

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
                    <div className="truncate">
                      <div className="font-medium">{c.title || c.name || 'Class'}</div>
                      <div className="text-xs text-gray-500">
                        {scheduled ? new Date(scheduled).toLocaleString() : 'No schedule'}
                      </div>
                    </div>

                    <div className="ml-3 text-xs text-right">
                      {isPast ? (
                        attended ? (
                          <div className="text-green-600">
                            Present —{' '}
                            {formatDateShort(c.my_attendance.joined_at || c.my_attendance.joinedAt)}
                          </div>
                        ) : (
                          <div className="text-red-600">Missed</div>
                        )
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
