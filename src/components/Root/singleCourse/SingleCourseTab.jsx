import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { tabs } from '@/data/singleCoursePageData';
import TabBuuton from './TabBuuton';

const SingleCourseTab = ({ openTab, setOpenTab }) => {
  return (
    <OuterSection className="border-b-2 border-transparent md:border-secondary">
      <InnerSection
        className="flex justify-between gap-10 items-center flex-wrap"
        style={{ paddingBottom: '0px' }}
      >
        {/* ✅ Desktop View */}
        <div className="hidden md:flex justify-between gap-6 w-full">
          {tabs.map((button) => (
            <TabBuuton
              key={button.id}
              button={button}
              isActive={button.id === openTab}
              onClick={() => setOpenTab(button.id)}
            />
          ))}
        </div>

        {/* ✅ Mobile View */}
        <div className="w-full md:hidden mb-md space-y-sm">
          <label htmlFor="contenttab" className='text-primary font-bold text-base'>Please select content for apprentice or employer</label>
          <select
            id="contenttab"
            value={openTab}
            onChange={(e) => setOpenTab(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            {tabs.map((button) => (
              <option key={button.id} value={button.id}>
                {button.title}
              </option>
            ))}
          </select>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default SingleCourseTab;
