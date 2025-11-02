import { Radio } from 'lucide-react';
import ClassItem from './ClassItem';

const ScheduleSection = ({ title, icon: Icon, classes, isLive = false }) => (
  <section className="mb-xl">
    <div className="bg-secondary-bg p-lg rounded-2xl shadow-sm overflow-hidden border border-black/20">
      {/* Section Header */}
      <div className="p-lg pt-0">
        <div className="flex items-center gap-3">
          {isLive ? (
            <span className="flex items-center gap-xs bg-red-100 text-red-600 font-bold text-sm px-sm py-xs rounded-md animate-pulse">
              <Radio className="w-4 h-4" />
              LIVE
            </span>
          ) : (
            <span className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
              <Icon className="w-6 h-6 text-orange-600" />
            </span>
          )}
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Classes List */}
      {classes.map((classData) => (
        <ClassItem key={classData.id} classData={classData} />
      ))}
    </div>
  </section>
);

export default ScheduleSection;
