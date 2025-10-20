import { Skeleton } from '@/components/ui/skeleton';

const BlogContentSkeleton = () => {
  return (
    <>
      {/* Title Skeleton */}
      <Skeleton className="w-3/4 h-10 rounded" />

      {/* Paragraphs Skeleton */}
      <div className="space-y-4 mt-md">
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-5/6 h-4 rounded" />
        <br />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-2/3 h-4 rounded" />
        <br />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-5/6 h-4 rounded" />
      </div>
    </>
  );
};

export default BlogContentSkeleton;
