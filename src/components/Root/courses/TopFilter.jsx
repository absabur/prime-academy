import PrimaryButton from '@/components/common/PrimaryButton';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const TopFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.course);
  const category = searchParams.get('category') || '';

  return (
    <div className="p-lg rounded-md shadow-lg flex flex-col gap-md mb-xl bg-white">
      <p className="text-base font-semibold">Courses Filter</p>

      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-md lg:gap-lg items-stretch lg:items-end">
        {/* 🔹 Search Input */}

        <input
          type="text"
          className="flex-1 px-md py-sm rounded-md border border-black/10 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition"
          placeholder="Search Course"
          value={searchParams.get('search') || ''}
          onChange={(e) =>
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              search: e.target.value,
              page: 1,
            })
          }
        />

        {/* 🔹 Category Dropdown */}
        <div className="flex-1">
          <select
            value={category}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              const params = Object.fromEntries(searchParams.entries());
              setSearchParams({ ...params, category: selectedCategory, page: 1 });
            }}
            className="w-full px-md py-sm rounded-md border border-black/10 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Reset Button */}
        <div className="w-full lg:w-auto">
          <PrimaryButton
            text="Reset Filter"
            href="/courses"
            className="w-full lg:w-auto hover:bg-red-500 text-white border-none transition"
          />
        </div>
      </div>
    </div>
  );
};

export default TopFilter;
