import { Link } from 'react-router-dom';
import BaseCard from './BaseCard';
import { FaArrowRight } from 'react-icons/fa';

const CourseFeatureCard = ({ course }) => {
  return (
    <BaseCard>
      <div className="space-y-4">
        {course?.image ? (
          <img src={course?.image} alt={course?.title} width={50} />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded" />
        )}
        <h3 className="font-heading font-bold text-xl">{course?.title}</h3>
        <p className="text-base text-black/70 line-clamp-6">{course?.content}</p>
      </div>

      {course?.button_link && (
        <Link
          to={`${course?.button_link}`}
          className="flex items-center gap-2 mt-auto text-primary font-heading font-bold"
        >
          Learn More <FaArrowRight />
        </Link>
      )}
    </BaseCard>
  );
};

export default CourseFeatureCard;
