import PrimaryButton from '@/components/common/PrimaryButton';
import { FiInbox } from 'react-icons/fi';

const NotFoundCourses = () => {
  return (
    <div className="flex flex-col items-center col-span-4 text-center py-24 px-4">
      {/* Icon */}
      <FiInbox className="text-7xl sm:text-8xl text-gray-300 mb-6 animate-bounce" />

      {/* Heading */}
      <h3 className="text-4xl font-bold text-primary mb-4">No Courses Found</h3>

      {/* Subtext */}
      <p className="text-black/50 text-lg leading-lg max-w-[400px]">
        We couldn’t find any courses matching your search or filters. Try adjusting your filters or
        check back later for new content.
      </p>

      {/* Optional CTA */}
      <PrimaryButton
        text="View All Courses"
        href="/courses"
        className="mt-xl rounded-lg shadow-md hover:shadow-lg transition"
      />
    </div>
  );
};

export default NotFoundCourses;
