import { PlayCircle, Clock, Calendar } from 'lucide-react';
export const studentRecordingColumnData = [
  {
    header: 'Headline', // Text for the <thead>
    accessor: 'headline', // Key from the session object to get data
    colSpan: 3, // lg:col-span-3
    type: 'data', // 'data' or 'action'
    icon: PlayCircle, // Icon component to render
    className: '', // CSS class for the cell content
    mobileLabel: null, // No label for the first item on mobile
  },
  {
    header: 'Duration',
    accessor: 'duration',
    colSpan: 2,
    icon: Clock,
    className: '',
    mobileLabel: 'Duration: ', // Label for mobile view
  },
  {
    header: 'Time',
    accessor: 'time',
    colSpan: 3,
    icon: Calendar,
    className: '',
    mobileLabel: null,
  },
  {
    header: 'Watch',
    accessor: 'watch',
    colSpan: 2,
    className: 'text-right',
    mobileLabel: null,
  },
];
