/**
 * BlogCardsSection Component
 * --------------------------
 * - Wraps the blog listing section
 * - Displays a sidebar filter (LeftFilter) and the blog cards (BlogCards)
 * - Fully responsive: flex-column on mobile, flex-row on desktop
 * - Uses OuterSection + InnerSection for consistent layout spacing
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import LeftFilter from './LeftFilter';
import BlogCards from './BlogCards';
import TopFilter from './TopFilter';
import { useSearchParams } from 'react-router-dom';

const BlogCardsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order') || null;
  return (
    <OuterSection>
      <InnerSection>
        {/* Top Filter form */}
        <TopFilter />

        <div className="hidden lg:flex w-full flex-col">
          <div className="flex gap-lg items-center justify-end">
            {/* Search Input */}
            <input
              type="text"
              className="border border-black/10 shadow bg-white px-md py-sm rounded-md focus:outline-none focus:shadow-xl"
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

            <div className="relative">
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
                className="w-fit px-lg py-sm shadow-sm border border-primary/20 rounded-lg outline-none"
              >
                <option value="">Newest Arrivals</option>
                <option value="-published_at">Oldest Listings</option>
                <option value="title">Name: A → Z</option>
                <option value="-title">Name: Z → A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-lg mt-lg">
          {/* Sidebar filter section */}
          <LeftFilter />

          {/* Blog cards listing */}
          <BlogCards />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default BlogCardsSection;
