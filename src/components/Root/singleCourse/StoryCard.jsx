import BaseCard from '@/components/common/BaseCard';
import SecondaryButton from '@/components/common/SecondaryButton';
import DOMPurify from 'dompurify';

const StoryCard = ({ story }) => {
  return (
    <BaseCard className={`bg-transparent`}>
      <div className="space-y-xl">
        {story?.icon ? (
          <img src={story?.icon} alt={'success story'} width={50} />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded" />
        )}
        <div
          className="prose prose-sm max-w-none text-black/80 text-left text-white"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(story?.description),
          }}
        />
      </div>
    </BaseCard>
  );
};

export default StoryCard;
