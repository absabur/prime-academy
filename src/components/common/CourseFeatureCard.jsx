import { Link } from 'react-router-dom';
import BaseCard from './BaseCard';
import { FaArrowRight } from 'react-icons/fa';

const CourseFeatureCard = ({ course }) => {
  return (
    <BaseCard
      className={`gap-xl hover:bg-gradient-to-br hover:from-primary hover:to-primary-light transition-colors duration-300 hover:text-white`}
    >
      <div className="space-y-4">
        {course?.header_image ? (
          <img
            src={`${import.meta.env.VITE_API_URL}${course?.header_image}`}
            alt={course?.title}
            width={50}
            height={50}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded" />
        )}
        <Link to={`/courses/${course.slug}`}>
          <h3 className="font-heading font-bold text-xl line-clamp-2">{course?.title}</h3>
        </Link>
        <p className="text-base opacity-75 mt-md line-clamp-6">{course?.short_description}</p>
      </div>

      <Link
        to={`/courses/${course.slug}`}
        className="flex items-center gap-2 mt-auto font-heading font-bold"
      >
        Learn More <FaArrowRight />
      </Link>
    </BaseCard>
  );
};

export default CourseFeatureCard;
