import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SecondaryButton from '@/components/common/SecondaryButton';

const LetStartFrom = () => {
  return (
    <OuterSection
      className="w-full min-h-[800px] bg-cover bg-center"
      style={{ backgroundImage: `url(/assets/course-page-form-bg.jpg)` }}
    >
      <InnerSection className="flex gap-xl lg:gap-lg flex-col lg:flex-row text-white">
        {/* Contact Information Section */}
        <div className="flex-1 flex gap-lg flex-col">
          <h2 className="text-3xl font-bold font-heading leading-xl">LET’S GET STARTED</h2>
          <p className="text-heading text-base leading-lg max-w-[320px]">
            Complete the form and a member of our team will be in touch in the next 48 hours.
          </p>

          {/* Phone Contact */}
          <div className="flex gap-md items-center">
            <BsTelephoneFill />
            <Link to={`tel:+8801325731050`} className="hover:text-white">
              01325 731 050
            </Link>
          </div>

          {/* Email Contact */}
          <div className="flex gap-md items-center">
            <MdEmail />
            <Link to={`mailto:info@primeacademy.org`} className="hover:text-white">
              info@primeacademy.org
            </Link>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-2">
          <form className="w-full space-y-md">
            {/* First Name & Last Name */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="question" className="font-heading font-bold text-base">
                  How can we help you?*
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="I'm looking to recruit a new apprentice"
                />
              </div>
            </div>
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="fname" className="font-heading font-bold text-base">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="jobtitle" className="font-heading font-bold text-base">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="jobtitle"
                  name="jobtitle"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="Enter your job title"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email" className="font-heading font-bold text-base">
                  Work Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="font-heading font-bold text-base">
                  Mobile/Telephone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex w-full flex-col">
              <label htmlFor="message" className="font-heading font-bold text-base">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Privacy Policy Agreement */}
            <div className="flex gap-md w-full items-center">
              <label className="font-heading text-xs">
                By submitting this form, you are consenting to opt-in to receive marketing
                communications from us. You may unsubscribe from our communications at any time. For
                more information on how we store your data, view our Privacy Policy.
              </label>
            </div>

            {/* Submit Button */}
            <SecondaryButton from={'hero'} type="submit" text={`Let's go!`} className="rounded-lg mt-md" />
          </form>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default LetStartFrom;
