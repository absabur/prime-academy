import React, { useState } from 'react';
import { LoaderCircle, CheckCircle2 } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import SecondaryButton from '../../../common/SecondaryButton';
import course1 from '/assets/course1.jpg';
import course2 from '/assets/course2.jpg';
import { Link } from 'react-router-dom';

// --- Course Data ---
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

// --- Reusable CourseCard Component (Updated) ---
const CourseCard = ({ course }) => {
  const { title, status, batch, imageUrl } = course;
  const isOngoing = status === 'Ongoing';

  return (
    // ✅ CHANGED: Removed h-50, added sm:h-52. Card is auto-height on mobile.
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row w-full sm:h-52">
      {/* Image Section */}
      {/* ✅ CHANGED: Adjusted width from sm:w-3/6 to sm:w-5/12 */}
      <div className="sm:w-5/12 flex-shrink-0">
        <img className="h-48 w-full object-cover sm:h-full" src={imageUrl} alt={title} />
      </div>

      {/* Content Section */}
      {/* ✅ CHANGED: Adjusted width from sm:w-3/6 to sm:w-7/12 */}
      <div className="p-md md:p-sm flex flex-col justify-between sm:w-7/12">
        <div>
          <Link to={`/student-dashboard/my-course/${title}`}>
            <h3
              className={`hover:text-primary text-xl font-bold line-clamp-3 ${isOngoing ? 'text-black' : 'text-black/50'}`}
            >
              {title}
            </h3>
          </Link>
        </div>

        {/* Tags Section */}
        <div className="flex items-center gap-sm mt-4 flex-wrap">
          <span
            className={`inline-flex whitespace-nowrap items-center px-3 py-1 rounded-full text-sm font-medium ${
              isOngoing
                ? 'bg-secondary/10 text-priamary border border-secondary/30'
                : 'bg-black/10 text-black/70'
            }`}
          >
            {isOngoing ? (
              <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin-slow" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
            )}
            {status}
          </span>
          <span className="inline-flex whitespace-nowrap items-center px-3 py-1 rounded-full text-sm font-medium bg-black/10 text-black/70">
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

  // Custom style for slower spin
  const customStyles = `
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 2s linear infinite;
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      {/* ✅ CHANGED: Added max-w-7xl and horizontal padding (px) */}
      <div className="shadow-md rounded-lg border border-black/10 bg-secondary-bg p-lg">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-md flex-wrap">
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
              className={`transition-all duration-200 ${
                activeFilter === 'Ongoing'
                  ? 'bg-secondary text-white shadow-md border-secondary'
                  : 'bg-white text-black/70 hover:bg-black/5'
              }`}
              text={`Ongoing Courses`}
            />
          </div>
        </header>

        {/* Courses Grid */}
        {/* ✅ CHANGED: xl:grid-cols-2 -> lg:grid-cols-2 */}
        <main className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-lg">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </main>
      </div>
    </>
  );
}
