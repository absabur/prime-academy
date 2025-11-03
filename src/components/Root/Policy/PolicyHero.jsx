import HeroSection from '../../common/HeroSection';

const PolicyHero = ({ hero }) => {
  return (
    <HeroSection
      bannerImage={hero?.banner_image}
      className="relative"
      title={hero?.title}
      description={hero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/privacy-policy', text: 'Policy' },
      ]}
      button1={{
        url: hero?.button1_url,
        text: hero?.button1_text,
      }}
      button2={{
        url: hero?.button2_url,
        text: hero?.button2_text,
      }}
    />
  );
};

export default PolicyHero;
