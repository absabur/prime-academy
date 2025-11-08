import { FaAngleDown, FaChevronUp } from 'react-icons/fa';
import DOMPurify from 'dompurify';

const OutLineData = ({ course, handelOpen, index, length }) => {
  return (
    <div className="flex">
      <div className="flex-2 hidden md:block">
        <p className="font-bold text-lg">{course.title}</p>
      </div>
      <div className="flex-1 hidden md:flex flex-col mt-2 relative">
        <div
          className={`z-1 w-6 h-6 rounded-full border-[3px] border-primary shrink-0 ${
            course.active ? 'bg-primary' : 'bg-white'
          }`}
        ></div>
        {index < length - 1 && (
          <div className="z-0 w-[3px] bg-primary flex-1 absolute left-[11px] h-full top-2"></div>
        )}
      </div>
      <div className="flex-5 bg-white mb-3 px-4 py-3 rounded-2xl space-y-2 containBox relative ">
        <h1
          onClick={() => handelOpen(course.id)}
          className="font-bold text-lg select-none cursor-pointer flex gap-sm flex-wrap wrap"
        >
          <span className="font-bold text-lg block md:hidden">{course.title}: </span>
          {course.heading}
        </h1>
        {/* <p
          className={`${
            course.active ? 'max-h-[500px]' : 'max-h-0 overflow-hidden '
          } text-[16px] transition-all duration-300 ease-in-out `}
        >
          {course.description}
        </p> */}

        <div
          className={`prose prose-sm max-w-none text-black/80 text-justify ${
            course.active ? 'max-h-fit' : 'max-h-0 overflow-hidden '
          }`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(course?.description),
          }}
        />

        <button
          className="flex items-center gap-2 font-bold text-[16px]"
          onClick={() => handelOpen(course.id)}
        >
          Discover More {course.active ? <FaChevronUp /> : <FaAngleDown />}
        </button>
      </div>
    </div>
  );
};

export default OutLineData;
