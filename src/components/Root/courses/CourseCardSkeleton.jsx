import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CourseCardSkeleton = ({ index }) => {
  return (
    <Card
      key={index}
      className="flex flex-col h-full overflow-hidden rounded-xl shadow-around-sm animate-pulse"
    >
      {/* Top: Image Placeholder */}
      <Skeleton className="w-full h-[180px]" />

      {/* Content */}
      <CardContent className="flex flex-col flex-1 gap-sm">
        {/* Category */}
        <Skeleton className="w-24 h-4 mt-3" />

        {/* Title */}
        <Skeleton className="w-full h-6 mt-2" />
        <Skeleton className="w-3/4 h-6 mt-1" />

        {/* Date */}
        <Skeleton className="w-32 h-4 mt-sm mb-xl" />

        {/* Read More */}
        <div className="mt-auto flex gap-sm items-center">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-4 h-4 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCardSkeleton;
