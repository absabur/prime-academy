import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React from 'react';

const Map = () => {
  return (
    <OuterSection>
      <InnerSection style={{ paddingTop: "0" }}>
        <h2 className='heading-3xl my-lg'>Find Us</h2>
        <iframe className='rounded-lg' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14609.11668127631!2d90.3592139554199!3d23.737422200000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b939a2fd74d9%3A0x67e5710fa650f8c0!2sShimanto%20Shambhar%20-%20Shopping%20Complex!5e0!3m2!1sen!2suk!4v1753960686040!5m2!1sen!2suk" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </InnerSection>
    </OuterSection>
  );
};

export default Map;
