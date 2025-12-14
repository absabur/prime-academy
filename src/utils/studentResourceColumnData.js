import { FileText, Calendar } from 'lucide-react';
export const studentResourceColumnData = [
  {
    header: 'Headline', // Text for the <thead>
    accessor: 'headline', // Key from the session object to get data
    colSpan: 3, // lg:col-span-3
    icon: FileText, // Icon component to render
    className: '', // CSS class for the cell content
    mobileLabel: null, // No label for the first item on mobile
  },
  {
    header: 'Time',
    accessor: 'time',
    colSpan: 3,
    icon: Calendar,
    className: 'text-center',
    mobileLabel: null,
  },
  {
    header: 'Action',
    accessor: 'watch',
    colSpan: 3,
    className: 'text-right',
    mobileLabel: null,
  },
];
