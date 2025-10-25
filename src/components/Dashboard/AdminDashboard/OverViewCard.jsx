import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaBookOpen, FaGraduationCap, FaWallet } from 'react-icons/fa6';

const OverViewCard = ({ overview }) => {
  const icons = {
    'graduation-cap': FaGraduationCap,
    'book-open': FaBookOpen,
    'chalkboard-teacher': FaChalkboardTeacher,
    wallet: FaWallet,
  };
  const Icon = icons[overview.icon];
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-lg shadow-around-sm">
      <div className="space-y-xs">
        <h2 className="text-black/50 text-lg">{overview.title}</h2>
        <p className="font-bold text-primary text-3xl">{overview.value}</p>
        <div className="flex items-center gap-xs">
          {/* <span className="text-sm text-green-500">{overview.growth}</span> */}
          <p className="text-sm text-green-500">{overview.growthText}</p>
        </div>
      </div>
      <div className="text-primary text-2xl bg-primary/10 p-sm rounded-md">
        <Icon />
      </div>
    </div>
  );
};

export default OverViewCard;
