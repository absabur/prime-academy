import { Play } from 'lucide-react';

const onWatchClick = (session) => {
  // এখানে তুমি চাইলে অন্য কোনো লজিকও দিতে পারো
  console.log('🎬 Watch Clicked:', session.time);
};

// --- 4 Module Data ---
export const studentRecordingTableData = [
  {
    moduleNumber: 4,
    sessions: [
      {
        headline: (
          <span>
            <strong>Hands-on Session:</strong> Debugging & Optimizing
          </span>
        ),
        duration: '25 minutes',
        time: 'Sunday, Sept 21st, 11:07 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Review & Recap',
        duration: <span className="text-red-500 font-bold">55 minutes</span>,
        time: 'Monday, Sept 22nd, 10:15 AM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
    ],
  },
  {
    moduleNumber: 3,
    sessions: [
      {
        headline: 'Short-term vs. Long-term Memory in AI Agents',
        duration: '1 hour 15 minutes',
        time: 'Tuesday, Sept 23rd, 5:45 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Practical Agent Memory Implementation',
        duration: '40 minutes',
        time: 'Tuesday, Sept 23rd, 8:00 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
    ],
  },
  {
    moduleNumber: 2,
    sessions: [
      {
        headline: 'Prompt Engineering Fundamentals',
        duration: '50 minutes',
        time: 'Wednesday, Sept 24th, 2:00 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Building Context-aware Prompts',
        duration: '35 minutes',
        time: 'Wednesday, Sept 24th, 4:10 PM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
    ],
  },
  {
    moduleNumber: 1,
    sessions: [
      {
        headline: 'Introduction to AI Agents',
        duration: '30 minutes',
        time: 'Thursday, Sept 25th, 11:00 AM',
        show: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Understanding LLM-based Workflows',
        duration: '45 minutes',
        time: 'Thursday, Sept 25th, 12:30 PM',
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
        className="flex gap-sm items-center justify-center w-full lg:w-auto bg-secondary hover:bg-primary text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200"
      >
        <Play size={20} /> Play
      </button>
    ),
  })),
}));
