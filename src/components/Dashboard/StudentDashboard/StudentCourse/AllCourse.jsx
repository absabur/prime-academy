import React, { useState } from 'react';
import { LoaderCircle, CheckCircle2 } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import SecondaryButton from '../../../common/SecondaryButton';
import course1 from '/assets/course1.jpg';
import course2 from '/assets/course2.jpg';

// --- Course Data ---
// Using placeholder images to match the content
const coursesData = [
  {
    id: 1,
    title: 'AI Agent Development Bootcamp for Programmers',
    status: 'Ongoing',
    batch: 4,
    imageUrl: course1,
  },
  {
    id: 2,
    title: 'AllCourse Development',
    status: 'Finished',
    batch: 3,
    imageUrl: course2,
  },
  {
    id: 3,
    title: 'Digital Marketting',
    status: 'Finished',
    batch: 3,
    imageUrl: course1,
  },
];

// --- Reusable CourseCard Component ---
const CourseCard = ({ course }) => {
  const { title, status, batch, imageUrl } = course;
  const isOngoing = status === 'Ongoing';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row w-full h-50">
      {/* Image Section */}
      <div className="sm:w-3/6 flex-shrink-0">
        <img className="h-48 w-full object-cover sm:h-full" src={imageUrl} alt={title} />
      </div>

      {/* Content Section */}
      <div className="p-sm flex flex-col justify-between sm:w-3/6">
        <div>
          <h3 className={`text-xl font-bold ${isOngoing ? 'text-black' : 'text-black/50'}`}>
            {title}
          </h3>
        </div>

        {/* Tags Section */}
        <div className="flex items-center space-x-3 mt-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isOngoing ? 'bg-secondary/10 text-priamary border border-secondary/30' : 'bg-black/10 text-black/70'
            }`}
          >
            {isOngoing ? (
              <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin-slow" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
            )}
            {status}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black/10 text-black/70">
            Batch {batch}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Main AllCourse Component ---
export default function AllCourse() {
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' or 'Ongoing'

  const filteredCourses = coursesData.filter((course) => {
    if (activeFilter === 'Ongoing') {
      return course.status === 'Ongoing';
    }
    return true; // 'All'
  });

  // Custom style for slower spin, as lucide's default spin is fast
  const customStyles = `
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .animate-spin-slow {
      animation: spin-slow 2s linear infinite;
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="mx-auto">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4 sm:mb-0">My Course</h1>
          <div className="flex space-x-3">
            <PrimaryButton
              onClick={() => setActiveFilter('All')}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeFilter === 'All'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white text-black/70 hover:bg-black/5'
              }`}
              text={`All Courses`}
            />
            <SecondaryButton
              onClick={() => setActiveFilter('Ongoing')}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeFilter === 'Ongoing'
                  ? 'bg-secondary text-white shadow-md border-secondary'
                  : 'bg-white text-black/70 hover:bg-black/5'
              }`}
              text={`Ongoing Courses`}
            />
          </div>
        </header>

        {/* Courses Grid */}
        <main className="grid grid-cols-1 xl:grid-cols-2 gap-lg">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </main>
      </div>
    </>
  );
}
