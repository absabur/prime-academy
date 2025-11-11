import PrimaryButton from '@/components/common/PrimaryButton';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const TopFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.blog);
  const category = searchParams.get('category') || null;
  const order = searchParams.get('order') || null;

  return (
    <div className="lg:hidden p-lg rounded-md shadow-lg flex flex-col gap-md mb-xl">
      <p className="text-base font-semibold">Blogs Filter</p>

      {/* Search Input & Order */}
      <div className="mb-sm w-full flex flex-col sm:flex-row gap-lg items-stretch">
        <div className="relative w-full sm:flex-1">
          <label
            htmlFor="search"
            className="absolute left-4 -top-2 px-1 bg-white text-black text-sm"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            className="w-full border border-black/10 shadow bg-white px-lg py-sm rounded-md focus:outline-none focus:shadow-xl"
            placeholder="Search Blogs"
            value={searchParams.get('search') || ''}
            onChange={(e) =>
              setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                search: e.target.value,
                page: 1,
              })
            }
          />
        </div>

        <div className="relative sm:w-[150px] w-full">
          <label
            htmlFor="order"
            className="absolute left-4 -top-2 px-1 bg-white text-black text-sm"
          >
            Sort Blogs
          </label>
          <select
            id="order"
            onChange={(e) => {
              const selectedOrder = e.target.value;
              const params = Object.fromEntries(searchParams.entries());
              setSearchParams({ ...params, order: selectedOrder });
            }}
            value={order || ''}
            className="w-full px-lg py-sm shadow-sm border border-primary/20 rounded-lg outline-none"
          >
            <option value="">Newest Arrivals</option>
            <option value="-published_at">Oldest Listings</option>
            <option value="title">Name: A → Z</option>
            <option value="-title">Name: Z → A</option>
          </select>
        </div>
      </div>

      {/* Category Filter & Reset Button */}
      <div className="mb-sm w-full flex flex-col sm:flex-row gap-lg items-stretch">
        <div className="relative w-full sm:flex-1">
          <label
            htmlFor="category"
            className="absolute left-4 -top-2 px-1 bg-white text-black text-sm"
          >
            Select Category
          </label>
          <select
            id="category"
            value={category || ''}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              const params = Object.fromEntries(searchParams.entries());
              setSearchParams({ ...params, category: selectedCategory, page: 1 });
            }}
            className="w-full px-lg py-sm rounded-md border border-black/10 bg-white text-black hover:border-primary focus:outline-none focus:shadow-xl transition-colors shadow"
          >
            <option value="">All Blogs</option>
            {categories.map((item) => {
              if (item?.is_active) {
                return (
                  <option key={item.id} value={item.slug}>
                    {item.name}
                  </option>
                );
              }
            })}
          </select>
        </div>

        <PrimaryButton
          text="Reset Filter"
          to="/blogs"
          className="sm:w-[150px] w-full hover:bg-[red] border-none"
        />
      </div>
    </div>
  );
};

export default TopFilter;
