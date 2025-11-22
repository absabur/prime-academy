import { Card, CardContent } from '@/components/ui/card';
import { dateConvertionBlogsPageBlogCard } from '@/utils/timeFormat';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CourseCard = ({ item, index }) => {
  const basePrice = item?.pricing?.base_price;
  const effectivePrice = item?.pricing?.effective_price;
  const isFree = effectivePrice == 0 || effectivePrice == '0' || item?.pricing?.is_free;

  return (
    <Card
      key={index}
      className="relative flex flex-col h-full overflow-hidden rounded-xl transition-shadow duration-300 shadow-lg hover:shadow-2xl"
      style={{ gap: 0 }}
    >
      {/* Top: Image */}
      <img src={item.header_image} alt={item.title} className="w-full h-[180px] object-cover" />

      {/* Content */}
      <CardContent className="flex flex-col flex-1 gap-sm pt-4">
        <p className="font-heading text-base text-black/80">{item.category?.name}</p>

        {/* 1. TITLE: Wrapped in a container with fixed min-height for two lines (min-h-12) */}
        {/* Note: 'h-12' or 'min-h-12' reserves space for roughly two lines of the 'text-xl' title */}
        <div className="min-h-15">
          <Link to={item.slug}>
            <h2 className="text-xl font-heading font-bold line-clamp-2" title={item.title}>
              {item.title}
            </h2>
          </Link>
        </div>

        {/* 2. DATE/DESCRIPTION: Given a fixed height (h-6/h-8 depending on your font scale) */}
        {/* Using a fixed height prevents it from shifting the elements below it */}
        <p className="font-heading text-base text-black/80 line-clamp-1 h-6 flex items-center">
          {/* Changed line-clamp-3 to line-clamp-1 and h-6 for a clean, single-line date alignment */}
          {dateConvertionBlogsPageBlogCard(item.created_at)}
        </p>

        {/* --- Professional Pricing Display --- */}
        {effectivePrice !== undefined && effectivePrice !== null && (
          <div className="flex items-center gap-sm">
            {/* Added for spacing */}
            {isFree ? (
              <span className="text-xl font-bold text-secondary-light bg-primary px-3 py-1 rounded-md">
                FREE
              </span>
            ) : (
              <>
                Price:
                {/* Effective Price (Main, prominent) */}
                {item?.pricing?.installment_available ? (
                  <p className="flex items-center gap-sm line-clamp-1 whitespace-nowrap">
                    <span className="font-bold text-2xl text-primary">
                      {item?.pricing?.installment_amount}
                    </span>
                    x<span>{item?.pricing?.installment_count} Installment</span>
                  </p>
                ) : (
                  <>
                    <span className="font-bold text-2xl text-primary">{effectivePrice}</span>
                    {basePrice && basePrice !== effectivePrice && (
                      <del className="text-gray-500 text-sm">{basePrice}</del>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
        {/* -------------------------------------- */}

        {/* Read More is naturally at the bottom due to 'mt-auto' */}
        <Link
          to={item.slug}
          className="font-bold w-[fit-content] text-base text-black flex gap-sm items-center mt-auto hover:text-primary"
        >
          Read More <FaArrowRight />
        </Link>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
