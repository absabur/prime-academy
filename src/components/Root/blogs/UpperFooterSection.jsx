import UpperFooterSection from '../../common/UpperFooterSection';
import bg from '/assets/blog-bottom-banner.jpg';

const UpperFooterBlogs = () => {
  return (
    <UpperFooterSection
      backgroundImage={bg}
      title="NOT SURE WHAT YOUR NEXT STEPS ARE?"
      description="There is never just one way to reach a destination. We offer an alternative career path and a different route to developing skills."
      buttons={[
        {
          text: 'Search Course',
          type: 'primary'
        },
        {
          text: 'Talk To Us Today',
          type: 'secondary'
        }
      ]}
      layout="column"
      className="bg-cover bg-center h-[400px] relative"
    />
  );
};

export default UpperFooterBlogs