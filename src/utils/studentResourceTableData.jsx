import { Link, Play } from 'lucide-react';

const onWatchClick = (session) => {
  console.log('🎬 Watch Clicked:', session.time);
};

export const studentResourceTableData = [
  {
    moduleNumber: 3,
    sessions: [
      {
        headline: 'Embedding Blog',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Long-Term Memory AI Agent',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Short term memory AI Agent',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
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
        headline: 'Embedding Blog',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Long-Term Memory AI Agent',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Short term memory AI Agent',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
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
        headline: 'Embedding Blog',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Long-Term Memory AI Agent',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Short term memory AI Agent',
        time: 'Sunday, September 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
    ],
  },
  {
    moduleNumber: 4,
    sessions: [
      {
        headline: (
          <span>
            <strong>Hands-on Session:</strong> Debugging & Optimizing
          </span>
        ),
        time: 'Sunday, Sept 21st, 11:07 PM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
      },
      {
        headline: 'Review & Recap',
        time: 'Monday, Sept 22nd, 10:15 AM',
        show1: function () {
          console.log('⏰ Time:', this.time);
          onWatchClick(this);
        },
        show2: function () {
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
      <div className='flex gap-md flex-wrap w-full justify-end'>
        <button
          onClick={() => session.show1.call(session)}
          className="flex gap-sm items-center justify-center w-full lg:w-auto bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200"
        >
          <Play size={20} /> Check It
        </button>
        <button
          onClick={() => session.show2.call(session)}
          className="flex gap-sm items-center justify-center w-full lg:w-auto bg-secondary hover:bg-primary text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-200"
        >
          <Link size={20} /> Browse It
        </button>
      </div>
    ),
  })),
}));
