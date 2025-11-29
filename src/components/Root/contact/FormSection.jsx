import { useForm } from 'react-hook-form';
import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../common/PrimaryButton';
import axios from 'axios';
import SwalUtils from '@/utils/sweetAlert';
import { useSelector } from 'react-redux';

const FormSection = () => {
  const { footer } = useSelector((state) => state.footer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //form submit handeler
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact/`, data);
      if (response.data.success) {
        SwalUtils.success(
          response.data.message || 'Thank you for reaching out! We’ll get back to you soon',
          'Thank You!'
        );
        reset();
      } else {
        SwalUtils.error(response.data.message || 'Unable to send message');
      }
    } catch (error) {
      SwalUtils.error(error.response.data.message || 'Unable to send message');
    }
  };

  return (
    <OuterSection>
      <InnerSection className="flex gap-xl lg:gap-lg flex-col lg:flex-row">
        {/* Contact Information Section */}
        <div className="flex-1 flex gap-lg flex-col">
          <h2 className="text-3xl font-bold font-heading leading-xl">Get in touch</h2>
          <p className="text-heading text-base leading-lg max-w-[320px]">
            Complete the form and a member of our team will be in touch within 48 hours.
          </p>

          <div className="flex gap-md items-center">
            <BsTelephoneFill />
            <Link to={`tel:${footer?.phone}`} className="hover:text-primary-light">
              {footer?.phone}
            </Link>
          </div>

          <div className="flex gap-md items-center">
            <MdEmail />
            <Link to={`mailto:${footer?.email}`} className="hover:text-primary-light">
              {footer?.email}
            </Link>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-2">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-md">
            {/* First Name & Last Name */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="first_name" className="font-heading font-bold text-base">
                  First Name*
                </label>
                <input
                  id="first_name"
                  type="text"
                  {...register('first_name', { required: 'First name is required' })}
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your first name"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor="last_name" className="font-heading font-bold text-base">
                  Last Name*
                </label>
                <input
                  id="last_name"
                  type="text"
                  {...register('last_name', { required: 'Last name is required' })}
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your last name"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email" className="font-heading font-bold text-base">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Enter a valid email',
                    },
                  })}
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor="phone" className="font-heading font-bold text-base">
                  Phone*
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    minLength: { value: 10, message: 'Enter a valid phone number' },
                  })}
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="flex w-full flex-col">
              <label htmlFor="message" className="font-heading font-bold text-base">
                Message*
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message', { required: 'Message is required' })}
                className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                placeholder="Enter your message"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Privacy Policy Agreement */}
            <div className="flex gap-md w-full items-center">
              <input
                id="agree_to_policy"
                type="checkbox"
                {...register('agree_to_policy', {
                  required: 'You must agree to the Privacy Policy',
                })}
                className="text-secondary rounded border-2 border-black/10 w-5 h-5"
              />
              <label htmlFor="agree_to_policy" className="font-heading font-bold text-base">
                I agree to the{' '}
                <Link className="text-primary-light" to={`/privacy`}>
                  Privacy Policy
                </Link>
                .*
              </label>
            </div>
            {errors.agree_to_policy && (
              <p className="text-red-500 text-sm mt-1">{errors.agree_to_policy.message}</p>
            )}

            {/* Submit Button */}
            <PrimaryButton type="submit" text={`Send`} className="rounded-lg" />
          </form>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default FormSection;
