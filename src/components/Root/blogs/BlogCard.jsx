import { Card, CardContent } from '@/components/ui/card';
import { dateConvertionBlogsPageBlogCard } from '@/utils/timeFormat';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogCard = ({ item, index }) => {
  return (
    <Card
      key={index}
      className="flex flex-col h-full overflow-hidden rounded-xl transition-shadow duration-300 shadow-lg hover:shadow-2xl"
    >
      {/* Top: Image */}
      <img src={item.featured_image} alt={item.title} className="w-full h-[180px] object-cover" />

      {/* Content */}
      <CardContent className="flex flex-col flex-1 gap-sm">
        <p className="font-heading text-base text-black/80">{item.category?.name}</p>
        <Link to={item.slug}>
          <h2 className="text-xl font-heading font-bold line-clamp-2" title={item.title}>
            {item.title}
          </h2>
        </Link>

        <p className="font-heading text-base text-black/80 mb-xl line-clamp-3">
          {dateConvertionBlogsPageBlogCard(item.published_at)}
        </p>

        {/* Read More at bottom */}
        <Link
          to={item.slug}
          className="font-bold w-[fit-content] text-base text-black flex gap-sm items-center mt-auto"
        >
          Read More <FaArrowRight />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
