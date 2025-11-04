import { Play } from 'lucide-react';

const onWatchClick = (session) => {
  console.log('🎬 Watch Clicked:', session.time);
};

// --- Module Data ---
export const studentDashboardResourceTabTableData = [
  {
    moduleNumber: 1,
    sessions: [
      {
        headline: 'Module 1 Resource',
        duration: '—', // No duration given
        time: 'Sunday, September 21st, 11:07 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Object Oriented 01',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Dart Object Oriented 02',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Module 1 Resource',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Object Oriented 01',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Dart Object Oriented 02',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
    ],
  },
].map((module) => ({
  ...module,
  sessions: module.sessions.map((session) => ({
    ...session,
    watch: (
      <button
        onClick={() => session.show.call(session)}
        className="w-full xl:w-fit xl:mx-auto bg-secondary hover:bg-primary text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200"
      >
        Check
      </button>
    ),
  })),
}));

// --- Column Definition ---

export const studentDashboardResourceTabColumnData = [
  {
    header: 'Title',
    accessor: 'headline',
    colSpan: 3,
    type: 'data',
    icon: null,
  },
  {
    header: 'Submission Time',
    accessor: 'time',
    colSpan: 3,
    className: 'text-center',
    icon: null,
  },
  {
    header: 'Action',
    accessor: 'watch',
    colSpan: 2,
    className: 'text-center',
  },
];
