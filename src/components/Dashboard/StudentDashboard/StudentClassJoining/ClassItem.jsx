import PrimaryButton from '../../../common/PrimaryButton';

const ClassItem = ({ classData }) => (
  <article className="px-lg py-md bg-white border border-black/10 shadow-sm mb-md rounded-lg">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-md">
      {/* Left Side: Topic & Instructor */}
      <div className="flex-grow">
        <h4 className="text-xl font-semibold mb-md">{classData.topic}</h4>
        <div className="flex items-center gap-3">
          <img
            src={classData.instructor.avatar}
            alt={classData.instructor.name}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/40x40/E2E8F0/333?text=??';
              e.currentTarget.onerror = null;
            }}
          />
          <div>
            <span className="text-sm text-black/50">Instructor:</span>
            <span className="text-sm font-medium text-black/70"> {classData.instructor.name}</span>
          </div>
        </div>
      </div>

      {/* Right Side: Schedule & Button */}
      <div className="flex-shrink-0 flex flex-col md:items-end gap-md mt-md md:mt-0">
        <span className="text-sm font-medium text-black bg-secondary/20 border border-secondary/40 px-md py-xs rounded-lg w-full md:w-auto text-center">
          {classData.schedule}
        </span>
        <PrimaryButton text={`Join the class`} />
      </div>
    </div>
  </article>
);

export default ClassItem;
