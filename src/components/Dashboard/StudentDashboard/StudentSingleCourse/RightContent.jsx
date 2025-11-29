import React from 'react';
import { ClipboardList, Facebook, MessageCircle, Phone, Target } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';

export const JobPlacementCard = () => (
  <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg w-full mb-md">
    {/* Header Section */}
    <div className="flex items-center gap-3 mb-4">
      <ClipboardList className="h-10 w-10 text-black/70 flex-shrink-0" strokeWidth={1.5} />
      <h2 className="text-lg font-bold text-black/80">Job Placement Team এর সাথে যোগাযোগ করুন।</h2>
    </div>

    {/* Button Section */}
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-black/40 py-2.5 px-4 text-black/70 font-semibold hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30">
        <Phone className="h-4 w-4" />
        Call
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-black/40 py-2.5 px-4 text-black/70 font-semibold hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30">
        <MessageCircle className="h-4 w-4" />
        Whatsapp
      </button>
    </div>
  </div>
);

/**
 * Card 2: Join the private group
 * A component showing links to join private social media groups.
 */
export const PrivateGroupCard = () => (
  <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg w-full mb-md">
    {/* Header Section */}
    <h2 className="text-lg font-bold text-black/80 mb-4">Join the private group</h2>

    {/* Button Section */}
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-black/40 py-2.5 px-4 text-black/70 font-semibold hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30">
        <Facebook className="h-4 w-4 text-blue-600" />
        Facebook
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-black/40 py-2.5 px-4 text-black/70 font-semibold hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30">
        <MessageCircle className="h-4 w-4 text-green-500" />
        Whatsapp
      </button>
    </div>
  </div>
);

/**
 * Card 3: Course Completed
 * A component displaying course completion status and a progress bar.
 */
export const CourseCompletedCard = () => (
  <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg w-full mb-md flex flex-col items-center gap-4 text-center">
    {/* Icon */}
    <Target className="h-20 w-20 text-red-600" strokeWidth={1.5} />

    {/* Text Content */}
    <h2 className="text-2xl font-bold text-black/80">Course Completed</h2>
    <p className="text-black/60">
      All live classes, assignments, quizzes, tests have been completed.
    </p>

    {/* Progress Bar Section */}
    <div className="border border-black/20 bg-white rounded-lg p-3 w-full text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-black/70">Overall Score</span>
        <span className="text-sm font-bold text-blue-700">93.5%</span>
      </div>
      <div className="w-full bg-black/20 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: '93.5%',
            // This gradient approximates the blue bar with a yellow tip
            backgroundImage:
              'linear-gradient(to right, var(--color-primary) 97%, var(--color-secondary) 100%)',
          }}
        ></div>
      </div>
    </div>

    {/* Button */}
    <PrimaryButton className="w-full" text={`Report Details`} />
  </div>
);
