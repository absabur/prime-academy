import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React from 'react';

const Map = () => {
  return (
    <OuterSection>
      <InnerSection style={{paddingTop: "0"}}>
        <h2 className='heading-3xl my-lg'>Find Us</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d913.0697918622733!2d90.37653050249348!3d23.7374223023844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b939a2fd74d9%3A0x67e5710fa650f8c0!2sShimanto%20Shambhar%20-%20Shopping%20Complex!5e0!3m2!1sen!2sbd!4v1760535627011!5m2!1sen!2sbd"
          height="400"
          style={{ border: 0, width: '100%', borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </InnerSection>
    </OuterSection>
  );
};

export default Map;
