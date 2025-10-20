import { Card, CardContent } from '@/components/ui/card';
import { dateConvertionHomePageBlogCard } from '@/utils/timeFormat';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <Card className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl bg-white">
      {/* Image section */}
      <div className="relative">
        <img src={blog.featured_image} alt={blog.title} className="w-full h-[250px] object-cover" />
        {blog?.category && (
          <p className="absolute top-3 left-3 bg-secondary px-3 py-1 rounded-full text-black font-semibold font-heading text-xs">
            {blog?.category?.name}
          </p>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex flex-col flex-1 justify-start p-lg gap-sm">
        <p className="font-heading text-base text-black/50">
          {dateConvertionHomePageBlogCard(blog.published_at)}
        </p>
        <Link to={`/blogs/${blog?.slug}`}>
          <h3 className="font-heading font-bold text-primary text-xl line-clamp-2 min-h-[56px]">
            {blog.title}
          </h3>
        </Link>
        <p className="font-heading text-base text-black/50 line-clamp-3 min-h-[66px]">
          {blog.excerpt}
        </p>
      </CardContent>

      {/* Button */}
      <div className="p-lg pt-0 mt-auto">
        <Link
          to={`/blogs/${blog?.slug}`}
          className="flex w-[fit-content] items-center gap-sm text-primary font-heading font-bold text-base"
        >
          Read More <FaArrowRight />
        </Link>
      </div>
    </Card>
  );
};

export default BlogCard;
