import PrimaryButton from '@/components/common/PrimaryButton';
import { useSearchParams } from 'react-router-dom';

const DashBoardHeader = ({
  title,
  buttonText,
  prefixIcon = null,
  suffixIcon = null,
  handeleAdd,
  href = null,
  searchBar = true,
}) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex justify-between items-center mb-lg gap-lg">
      <h1 className="font-bold text-primary text-2xl flex-1">{title}</h1>

      <div className="flex gap-xl">
        {buttonText && (
          <PrimaryButton
            text={buttonText}
            prefixIcon={prefixIcon}
            suffixIcon={suffixIcon}
            onClick={handeleAdd}
            href={href}
          />
        )}
      </div>
    </div>
  );
};

export default DashBoardHeader;
