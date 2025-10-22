import UpperFooterSection from '../../common/UpperFooterSection';
import bg from '/assets/blog-bottom-banner.jpg';

const UpperFooterFaq = () => {
  return (
    <UpperFooterSection
      backgroundImage={bg}
      title="NOT SURE WHAT YOUR NEXT STEPS ARE?"
      description="There is never just one way to reach a destination. We offer an alternative career path and a different route to developing skills."
      buttons={[
        {
          text: 'Explore This Site',
          type: 'primary',
          url: '/',
        },
        {
          text: 'Talk To Us Today',
          type: 'secondary',
          url: '/contact',
        },
      ]}
      layout="row"
    />
  );
};

export default UpperFooterFaq;
