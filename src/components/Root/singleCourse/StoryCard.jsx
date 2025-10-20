import BaseCard from '@/components/common/BaseCard';
import SecondaryButton from '@/components/common/SecondaryButton';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const StoryCard = ({ story }) => {
  return (
    <BaseCard className={`bg-transparent`}>
      <div className="space-y-xl">
        {story.logo ? (
          <img src={story.logo} alt={'success story'} width={50} />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded" />
        )}
        <ReactMarkdown>{story?.content || ''}</ReactMarkdown>
        <p className='text-xs'>{story?.paragraph || ''}</p>
      </div>

      <SecondaryButton className='mt-lg w-[fit-content]' text={'Learn More'} href={'#'} from={'hero'} />
    </BaseCard>
  );
};

export default StoryCard;
