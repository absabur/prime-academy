import PrimaryButton from '@/components/common/PrimaryButton';
import { useSearchParams } from 'react-router-dom';

const DashBoardHeader = ({
  title,
  buttonText,
  prefixIcon = null,
  suffixIcon = null,
  handeleAdd,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex justify-between items-center mb-lg gap-lg">
      <h1 className="font-bold text-primary text-2xl flex-1">{title}</h1>

      <div className="flex gap-xl">
        <input
          type="text"
          className=" hidden md:inline-block flex-1 border border-black/10 shadow bg-white w-full px-md py-sm rounded-md focus:outline-none focus:shadow-xl"
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
        <PrimaryButton
          text={buttonText}
          prefixIcon={prefixIcon}
          suffixIcon={suffixIcon}
          onClick={handeleAdd}
        />
      </div>
    </div>
  );
};

export default DashBoardHeader;
