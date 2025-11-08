import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CategoryListSkeleton from './BlogCategoriesSkeleton';
import PrimaryButton from '@/components/common/PrimaryButton';

const LeftFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, loadingBlogCategory } = useSelector((state) => state.blog);
  const category = searchParams.get('category') || null;

  return (
    <aside className="hidden lg:flex flex-col w-80 bg-secondary-bg px-lg py-sm rounded-md">
      {/* Title */}
      <p className="text-base font-semibold mb-sm">Filter Blogs</p>

      {/* Search Input */}
      <input
        type="text"
        className="border border-black/10 shadow bg-white w-full px-md py-sm rounded-md focus:outline-none focus:shadow-xl"
        placeholder="Search Blogs"
        value={searchParams.get('search') || ''}
        onChange={(e) =>
          setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            search: e.target.value,
            page: 1, // optional: reset page when searching
          })
        }
      />

      {loadingBlogCategory && <CategoryListSkeleton count={5} />}

      {/* Filter List */}
      <ul className="space-y-sm mt-md">
        <li>
          <button
            onClick={() =>
              setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                category: '',
              })
            }
            className={`cursor-pointer text-left w-full px-2 py-1 rounded focus:outline-none ${
              category == null
                ? 'text-white bg-primary-light font-semibold'
                : 'bg-black/5 hover:bg-black/15'
            }`}
          >
            All
          </button>
        </li>
        {categories.map((item, index) => {
          if (item?.is_active) {
            return (
              <li key={index}>
                <button
                  onClick={() =>
                    setSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      category: item.slug,
                    })
                  }
                  className={`cursor-pointer text-left w-full px-2 py-1 rounded focus:outline-none ${
                    String(category) === String(item.slug)
                      ? 'text-white bg-primary-light font-semibold'
                      : 'bg-black/5 hover:bg-black/15'
                  }`}
                >
                  {item.name}
                </button>
              </li>
            );
          }
        })}
      </ul>
      <PrimaryButton
        text={`Reset Filter`}
        href={`/blogs`}
        className="mt-md w-[fit-content] self-end rounded-full hover:bg-red-500 border-none"
      />
    </aside>
  );
};

export default LeftFilter;
