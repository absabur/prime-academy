import { Radio, AlertTriangle } from 'lucide-react';
import ScheduleSection from '../../../../components/Dashboard/StudentDashboard/StudentClassJoining/ScheduleSection';
import PageHeader from '../../../../components/Dashboard/StudentDashboard/StudentClassJoining/PageHeader';
import PrimaryButton from '../../../../components/common/PrimaryButton';
import HelpSection from '../../../../components/Dashboard/StudentDashboard/StudentClassJoining/HelpSection';

// --- DEMO DATA ---

// You can replace this with data fetched from an API
const demoLiveClasses = [
  {
    id: 1,
    topic: 'Topic Fetching Real-Time Data Using APIs',
    instructor: {
      name: 'Md Nahid Ahosan',
      avatar: 'https://placehold.co/40x40/E2E8F0/333?text=NA',
    },
    schedule: 'Sunday, 5th October at 9 PM',
  },
  {
    id: 2,
    topic: 'Topic Web Scraping with BeautifulSoup',
    instructor: {
      name: 'Md Khondokar',
      avatar: 'https://placehold.co/40x40/FEF9C3/854D0E?text=MK',
    },
    schedule: 'Monday, 6th October at 8 PM',
  },
];

const demoSupportClasses = [
  {
    id: 1,
    topic: 'Topic Module 5 support class',
    instructor: {
      name: 'Md Shourov',
      avatar: 'https://placehold.co/40x40/DBEAFE/1E40AF?text=MS',
    },
    schedule: 'Sunday, 5th October at 9 PM',
  },
  {
    id: 2,
    topic: 'Topic Module 4 support class',
    instructor: {
      name: 'Md Sumon',
      avatar: 'https://placehold.co/40x40/D1D5DB/1F2937?text=MS',
    },
    schedule: 'Monday, 6th October at 8 PM',
  },
];

export default function StudentClassJoining() {
  return (
    <>
      <div className="mx-auto bg-white p-lg rounded-lg border border-black/10 shadow-md">
        <PageHeader />

        {/* Sub-header */}
        <h2 className="text-lg font-semibold mb-lg">Class Schedule for Module 5</h2>
        {/* Live Class Section */}
        <ScheduleSection
          title="Live Class"
          icon={Radio} // Icon is passed as a component
          classes={demoLiveClasses}
          isLive={true}
        />

        {/* Support Class Section */}
        <ScheduleSection
          title="Support Class"
          icon={AlertTriangle} // Icon is passed as a component
          classes={demoSupportClasses}
        />

        {/* Show More Button */}
        <div className="text-center">
          <PrimaryButton text={`Show More`} />
        </div>
      </div>

      <HelpSection />
    </>
  );
}
