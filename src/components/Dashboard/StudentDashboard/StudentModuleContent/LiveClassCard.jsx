import { useState, useEffect, useRef } from 'react';
import api from '@/api/axios';
import { Video, Calendar, Clock, ExternalLink, CheckCircle, AlertCircle, Play } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import Swal from 'sweetalert2';

const LiveClassCard = ({ classData, onAttendanceMarked }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [markingAttendance, setMarkingAttendance] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [attendanceRecord, setAttendanceRecord] = useState(null); // stores returned attendance
  const [joinedAt, setJoinedAt] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [canShowJoinButton, setCanShowJoinButton] = useState(false);
  const newWindowRef = useRef(null);
  const popupCheckerRef = useRef(null);

  // Check if join button should be visible
  useEffect(() => {
    const checkJoinAvailability = () => {
      if (classData.status === 'ongoing') {
        setCanShowJoinButton(true);
        return;
      }

      if (classData.status === 'scheduled' && classData.scheduled_date) {
        const now = new Date();
        const classTime = new Date(classData.scheduled_date);
        const diffInMinutes = (classTime - now) / (1000 * 60);
        const durationMinutes = classData.duration_minutes || 120;

        // Show join button 10 minutes before class starts until class ends (duration + 15 min buffer)
        const canJoinEarly = diffInMinutes <= 10; // 10 minutes before
        const hasEnded = diffInMinutes < -(durationMinutes + 15);
        const shouldShow = canJoinEarly && !hasEnded;

        setCanShowJoinButton(shouldShow);
      } else {
        setCanShowJoinButton(false);
      }
    };

    checkJoinAvailability();

    // Check every 30 seconds if button should appear
    const interval = setInterval(checkJoinAvailability, 30000);

    return () => clearInterval(interval);
  }, [classData.status, classData.scheduled_date, classData.duration_minutes, classData.title]);

  useEffect(() => {
    if (classData.status === 'scheduled') {
      const interval = setInterval(() => {
        const now = new Date();
        const classTime = new Date(classData.scheduled_date);
        const diff = classTime - now;

        if (diff <= 0) {
          setTimeLeft('Starting soon...');
          clearInterval(interval);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          if (days > 0) {
            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
          } else if (hours > 0) {
            setTimeLeft(`${hours}h ${minutes}m`);
          } else {
            setTimeLeft(`${minutes}m`);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [classData.scheduled_date, classData.status]);

  // Auto-mark attendance when user returns to the app and popup is closed
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        // If joined but not yet marked and popup is closed (or never opened), mark attendance
        try {
          const popupClosed = !newWindowRef.current || newWindowRef.current.closed;
          if (joinedAt && !attendanceMarked && popupClosed) {
            handleLeaveClass();
          }
        } catch (e) {
          // ignore
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (popupCheckerRef.current) {
        clearInterval(popupCheckerRef.current);
        popupCheckerRef.current = null;
      }
    };
  }, [joinedAt, attendanceMarked]);

  const handleJoinClass = async () => {
    if (!classData.meeting_url) {
      await Swal.fire({
        icon: 'warning',
        title: 'No Meeting Link',
        text: 'Meeting link is not available yet. Please contact your instructor.',
        confirmButtonColor: '#f59e0b',
      });
      return;
    }

    // Try to mark attendance first (might fail if class hasn't started yet)
    try {
      const joinResp = await api.post(`/api/live-classes/${classData.id}/join/`);
      if (joinResp.data && joinResp.data.success) {
        const attendance = joinResp.data.data || joinResp.data;
        setAttendanceRecord(attendance);
        // record joinedAt (prefer server joined_at if provided)
        const serverJoined = attendance?.joined_at;
        setJoinedAt(serverJoined ? new Date(serverJoined) : new Date());

        // ✅ Notify parent to refetch attendance data
        if (onAttendanceMarked) {
          onAttendanceMarked();
        }
      }
      // Open meeting immediately after successful join
      const newWindow = window.open(classData.meeting_url, '_blank', 'noopener,noreferrer');
      newWindowRef.current = newWindow;

      if (!newWindow) {
        await Swal.fire({
          icon: 'error',
          title: 'Pop-up Blocked',
          html: `
            <p class="mb-3">Unable to open the meeting link. Your browser may be blocking pop-ups.</p>
            <p class="text-sm text-gray-600">Meeting Link:</p>
            <a href="${classData.meeting_url}" target="_blank" rel="noopener noreferrer" 
               class="text-blue-600 hover:underline break-all">
              ${classData.meeting_url}
            </a>
          `,
          confirmButtonColor: '#ef4444',
        });
        return;
      }
    } catch (err) {
      // If join fails, still try to open meeting
      console.error('Join endpoint failed:', err);

      // Open meeting URL immediately (before any async operations)
      const newWindow = window.open(classData.meeting_url, '_blank', 'noopener,noreferrer');
      newWindowRef.current = newWindow;

      if (err.response?.data?.message?.includes('not started')) {
        // Class hasn't started yet, but still allow joining the waiting room
        Swal.fire({
          icon: 'info',
          title: 'Joining Waiting Room',
          text: "The class hasn't officially started yet, but you can join the waiting room. Your attendance will be marked once the class begins.",
          confirmButtonColor: '#3b82f6',
          timer: 3000,
          timerProgressBar: true,
        });
      }

      if (!newWindow) {
        await Swal.fire({
          icon: 'error',
          title: 'Pop-up Blocked',
          html: `
            <p class="mb-3">Unable to open the meeting link. Your browser may be blocking pop-ups.</p>
            <p class="text-sm text-gray-600">Meeting Link:</p>
            <a href="${classData.meeting_url}" target="_blank" rel="noopener noreferrer" 
               class="text-blue-600 hover:underline break-all">
              ${classData.meeting_url}
            </a>
          `,
          confirmButtonColor: '#ef4444',
        });
        return;
      }
    }

    // Set up popup checker to auto-mark attendance when meeting closes
    if (newWindowRef.current) {
      popupCheckerRef.current = setInterval(() => {
        try {
          if (newWindowRef.current && newWindowRef.current.closed) {
            clearInterval(popupCheckerRef.current);
            popupCheckerRef.current = null;
            newWindowRef.current = null;
            // Auto mark attendance when popup closed
            handleLeaveClass();
          }
        } catch (e) {
          // ignore cross-origin access issues
        }
      }, 1000);
    } else {
      // This should not happen as we already handled it above, but keep for safety
      await Swal.fire({
        icon: 'error',
        title: 'Pop-up Blocked',
        html: `
          <p class="mb-3">Unable to open the meeting link. Your browser may be blocking pop-ups.</p>
          <p class="text-sm text-gray-600">Meeting Link:</p>
          <a href="${classData.meeting_url}" target="_blank" rel="noopener noreferrer" 
             class="text-blue-600 hover:underline break-all">
            ${classData.meeting_url}
          </a>
        `,
        confirmButtonText: 'Copy Link',
        showCancelButton: true,
        cancelButtonText: 'Close',
        confirmButtonColor: '#3b82f6',
      }).then((result) => {
        if (result.isConfirmed) {
          navigator.clipboard.writeText(classData.meeting_url);
          Swal.fire({
            icon: 'success',
            title: 'Link Copied!',
            text: 'Meeting link copied to clipboard',
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    }
  };

  const handleLeaveClass = async () => {
    if (!joinedAt) {
      // nothing to do
      return;
    }

    setLeaving(true);
    try {
      // Try server-side leave endpoint first
      try {
        const resp = await api.post(`/api/live-classes/${classData.id}/leave/`);
        if (resp.data && resp.data.success) {
          setAttendanceRecord(resp.data.data || resp.data);
          setAttendanceMarked(true);
          if (onAttendanceMarked) onAttendanceMarked();
          // cleanup popup checker if any
          if (popupCheckerRef.current) {
            clearInterval(popupCheckerRef.current);
            popupCheckerRef.current = null;
          }
          newWindowRef.current = null;
          return;
        }
      } catch (errLeave) {
        // leave endpoint might not exist; fallback to computing duration and calling mark_attendance
        console.warn('Leave endpoint not available, falling back to mark_attendance', errLeave);
      }

      // Fallback: compute duration and call mark_attendance
      const now = new Date();
      const leftAt = now;
      const durationMinutes = Math.max(0, Math.floor((now - new Date(joinedAt)) / 60000));
      const markResp = await api.post(`/api/live-classes/${classData.id}/mark_attendance/`, {
        joined_at: new Date(joinedAt).toISOString(),
        left_at: leftAt.toISOString(),
        duration_minutes: durationMinutes,
      });
      if (markResp.data && markResp.data.success) {
        setAttendanceRecord(markResp.data.data || markResp.data);
        setAttendanceMarked(true);
        if (onAttendanceMarked) onAttendanceMarked();
        // cleanup popup checker if any
        if (popupCheckerRef.current) {
          clearInterval(popupCheckerRef.current);
          popupCheckerRef.current = null;
        }
        newWindowRef.current = null;
      } else {
        console.error('Failed to mark attendance on leave:', markResp.data);
      }
    } catch (err) {
      console.error('Error during leave/mark attendance:', err);
    } finally {
      setLeaving(false);
    }
  };

  const getStatusBadge = () => {
    switch (classData.status) {
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            <Clock className="w-3 h-3" />
            Scheduled
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Live Now
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-black/10 p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getStatusBadge()}
            {classData.status === 'scheduled' && timeLeft && (
              <span className="text-sm font-medium text-orange-600">Starts in {timeLeft}</span>
            )}
            {canShowJoinButton && classData.status === 'scheduled' && (
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Join available
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{classData.title}</h3>
        </div>

        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
          <Video className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formatDate(classData.scheduled_date)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{classData.duration_minutes} minutes</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {canShowJoinButton && (
          <PrimaryButton
            text={joinedAt ? 'Re-Join Class' : 'Join Class'}
            onClick={handleJoinClass}
            className="flex items-center gap-2"
            icon={<ExternalLink className="w-4 h-4" />}
          />
        )}

        {/* Leave button appears if user has joined but not yet marked left */}
        {joinedAt && classData.status === 'ongoing' && (
          <button
            onClick={handleLeaveClass}
            disabled={leaving}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {leaving ? 'Leaving...' : 'Leave Class'}
          </button>
        )}

        {attendanceMarked && (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5" />
            Attendance Marked
          </div>
        )}

        {/* Show attendance info for student */}
        {attendanceRecord && (
          <div className="w-full mt-3 text-sm text-gray-700">
            <div>
              Joined:{' '}
              {attendanceRecord.joined_at
                ? formatDate(attendanceRecord.joined_at)
                : joinedAt?.toLocaleString()}
            </div>
            {attendanceRecord.left_at && <div>Left: {formatDate(attendanceRecord.left_at)}</div>}
            {attendanceRecord.duration_minutes != null && (
              <div>Duration: {attendanceRecord.duration_minutes} minutes</div>
            )}
          </div>
        )}

        {classData.has_recording && classData.recording_url && (
          <button
            onClick={() => window.open(classData.recording_url, '_blank')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            View Recording
          </button>
        )}
      </div>

      {/* Warning for scheduled classes */}
      {classData.status === 'scheduled' && !classData.can_join && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            Join button will be enabled when the class starts
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveClassCard;
