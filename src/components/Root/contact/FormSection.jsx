/**
 * FormSection Component
 * ---------------------
 * - Renders the contact form section for the website.
 * - Includes company contact info and a form to submit user inquiries.
 * - Fully responsive for mobile and desktop.
 * - Accessibility-friendly with proper labels, types, and required fields.
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../common/PrimaryButton';

const FormSection = () => {
  return (
    <OuterSection>
      <InnerSection className="flex gap-xl lg:gap-lg flex-col lg:flex-row">
        {/* Contact Information Section */}
        <div className="flex-1 flex gap-lg flex-col">
          <h2 className="text-3xl font-bold font-heading leading-xl">Get in touch</h2>
          <p className="text-heading text-base leading-lg max-w-[320px]">
            Complete the form and a member of our team will be in touch within 48 hours.
          </p>

          {/* Phone Contact */}
          <div className="flex gap-md items-center">
            <BsTelephoneFill />
            <Link to={`tel:+8801325731050`} className="hover:text-primary-light">
              01325 731 050
            </Link>
          </div>

          {/* Email Contact */}
          <div className="flex gap-md items-center">
            <MdEmail />
            <Link to={`mailto:example@gmail.com`} className="hover:text-primary-light">
              example@gmail.com
            </Link>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-2">
          <form className="w-full space-y-md">
            {/* First Name & Last Name */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="fname" className="font-heading font-bold text-base">
                  First Name*
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lname" className="font-heading font-bold text-base">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email" className="font-heading font-bold text-base">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="font-heading font-bold text-base">
                  Phone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex gap-md w-full flex-col">
              <label htmlFor="message" className="font-heading font-bold text-base">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Privacy Policy Agreement */}
            <div className="flex gap-md w-full items-center">
              <input
                type="checkbox"
                id="check"
                name="check"
                required
                aria-required="true"
                className="text-secondary rounded border-2 border-black/10 w-5 h-5"
              />
              <label htmlFor="check" className="font-heading font-bold text-base">
                I agree to the Privacy Policy.*
              </label>
            </div>

            {/* Submit Button */}
            <PrimaryButton type="submit" text={`Submit`} className="rounded-lg" />
          </form>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default FormSection;
