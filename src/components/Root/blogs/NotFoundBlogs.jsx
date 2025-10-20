import PrimaryButton from '@/components/common/PrimaryButton';
import { FiInbox } from 'react-icons/fi';

const NotFoundBlogs = () => {
  return (
    <div className="flex flex-col items-center col-span-3 text-center p-lg">
      {/* Icon */}
      <FiInbox className="text-6xl text-gray-400 mb-6 animate-bounce" />

      {/* Heading */}
      <h3 className="text-4xl font-bold text-primary mb-4">No Blogs Found</h3>

      {/* Subtext */}
      <p className="text-black/50 text-lg leading-lg max-w-[400px]">
        We couldn’t find any blogs matching your search or filters. Try adjusting your filters or
        check back later for new posts.
      </p>

      {/* Optional CTA */}
      <PrimaryButton
        text="View All Blogs"
        to="/blogs"
        className="mt-xl rounded-lg shadow-md hover:shadow-lg transition"
      />
    </div>
  );
};

export default NotFoundBlogs;
