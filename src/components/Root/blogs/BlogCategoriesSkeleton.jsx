import { Skeleton } from '@/components/ui/skeleton';

const CategoryListSkeleton = ({ count = 5 }) => {
  return (
    <ul className="space-y-xs mt-md">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <Skeleton className="w-full h-8 rounded px-2 py-1" />
        </li>
      ))}
    </ul>
  );
};

export default CategoryListSkeleton;
