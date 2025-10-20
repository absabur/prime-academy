import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const TableHeading = ({ col }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderKey = searchParams.get('order') || '';
  const nonSortable = ['id', 'education', 'skills'];
  const isSortable = !nonSortable.includes(col.key);
  const sortKey = col.key === 'full_name' ? 'first_name' : col.key;

  const isAsc = orderKey === sortKey;
  const isDesc = orderKey === `-${sortKey}`;

  const handleSort = () => {
    if (!isSortable) return;
    const newOrder = isAsc ? `-${sortKey}` : sortKey;
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      order: newOrder,
    });
  };

  return (
    <th
      onClick={handleSort}
      key={col.key}
      className={`py-md px-xl text-left font-semibold whitespace-nowrap select-none ${
        isSortable ? 'cursor-pointer' : ''
      }`}
    >
      <span className="inline-flex items-center gap-1">
        {col.label}
        {isSortable && (
          <span className="flex flex-col leading-none">
            <FaCaretUp
              size={16}
              className={`relative -bottom-[2px] ${isAsc ? 'text-primary' : 'text-black/20'}`}
            />
            <FaCaretDown
              size={16}
              className={`relative -top-[2px] ${isDesc ? 'text-primary' : 'text-black/20'}`}
            />
          </span>
        )}
      </span>
    </th>
  );
};

export default TableHeading;
