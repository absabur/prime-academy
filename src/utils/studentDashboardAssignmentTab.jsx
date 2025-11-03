import { Play } from 'lucide-react';

const onWatchClick = (session) => {
  console.log('🎬 Watch Clicked:', session.time);
};

// --- Module Data ---
export const studentDashboardAssignmentTabTableData = [
  {
    moduleNumber: 1,
    sessions: [
      {
        headline: 'Module 1 Assignment',
        duration: '—', // No duration given
        time: 'Sunday, September 21st, 11:07 PM',
        status: 'Approved',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Object Oriented 01',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        status: 'Approved',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Dart Object Oriented 02',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        status: 'Approved',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Module 1 Assignment',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        status: 'Approved',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Object Oriented 01',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        status: 'Pending',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Dart Object Oriented 02',
        duration: '—',
        time: 'Sunday, September 21st, 11:07 PM',
        status: 'Approved',
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
    status: (
      <button
        onClick={() => session.show.call(session)}
        className={`ml-0 w-full xl:w-fit xl:mx-auto flex gap-sm items-center justify-center ${session.status == "Pending" && "bg-black"} ${session.status == "Approved" && "bg-green-600"} hover:bg-primary text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200`}
      >
        {session.status}
      </button>
    ),
    watch: (
      <button
        onClick={() => session.show.call(session)}
        className="ml-0 w-full xl:w-fit xl:mx-auto flex gap-sm items-center justify-center bg-secondary hover:bg-primary text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200"
      >
        Check
      </button>
    ),
  })),
}));

// --- Column Definition ---

export const studentDashboardAssignmentTabColumnData = [
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
    className: "text-center",
    icon: null,
  },
  {
    header: 'Status',
    accessor: 'status',
    colSpan: 2,
    className: "text-center",
    icon: null
  },
  {
    header: 'Action',
    accessor: 'watch',
    colSpan: 2,
    className: 'text-center',
  },
];
