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
          <div className="self-end">
            <label htmlFor="order" className="text-sm mr-xs">
              Sort By:{' '}
            </label>
            <select
              onChange={(e) => {
                const selectedOrder = e.target.value;
                const params = Object.fromEntries(searchParams.entries());
                setSearchParams({ ...params, order: selectedOrder });
              }}
              value={order || ''}
              className="px-md py-xs shadow-xl text-sm border border-primary/20 rounded-xl outline-none"
              name="order"
              id="order"
            >
              <option value="">Newest Arrivals</option>
              <option value="-published_at">Oldest Listings</option>
              <option value="title">Name: A → Z</option>
              <option value="-title">Name: Z → A</option>
            </select>
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
