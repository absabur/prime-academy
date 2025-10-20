import PrimaryButton from '@/components/common/PrimaryButton';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const DashBoardHeader = ({ title, buttonText, prefixIcon = null, suffixIcon = null }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex justify-between items-center mb-lg">
      <h1 className="font-bold text-primary text-2xl flex-1">{title}</h1>

      <div className="flex gap-xl flex-1 ">
        <input
          type="text"
          className=" flex-1 border border-black/10 shadow bg-white w-full px-md py-sm rounded-md focus:outline-none focus:shadow-xl"
          placeholder="Search Students, Emails, Phones, Ids..."
          value={searchParams.get('search') || ''}
          onChange={(e) =>
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              search: e.target.value,
              page: 1, // optional: reset page when searching
            })
          }
        />
        <PrimaryButton text={buttonText} prefixIcon={prefixIcon} suffixIcon={suffixIcon} />
      </div>
    </div>
  );
};

export default DashBoardHeader;
