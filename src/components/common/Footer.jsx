import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
  FaSpotify,
  FaThreads,
  FaPinterest,
  FaDiscord,
  FaTelegram,
  FaLinkedin,
  FaPhone,
  FaRegEnvelope,
} from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFooters } from '@/redux/footer/footerAction';
import InnerSection from './InnerSection';
import OuterSection from './OuterSection';

const Footer = () => {
  const { footer } = useSelector((state) => state.footer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFooters());
  }, [dispatch]);

  // ✅ Safe fallbacks for all data
  const logoUrl = footer?.logo_url || '/assets/prime-academy-logo-full.png';
  const email = footer?.email || 'info@example.com';
  const phone = footer?.phone || '+880 1234-567890';
  const address = footer?.address || '123 Learning Lane, Dhaka, Bangladesh';
  const description =
    footer?.description ||
    'Your partner in achieving educational excellence and unlocking potential.';
  const linkGroups = footer?.link_groups || [];
  const socialLinks = footer?.social_links || [];
  const copyrightYear = footer?.copyright_year || new Date().getFullYear();
  const copyrightName = footer?.copyright_name || 'Your Company';

  // ✅ Map API social platform to a component for better scalability
  const socialIcons = {
    x: <FaXTwitter />,
    twitter: <FaXTwitter />, // Added "twitter" as an alias for "x"
    facebook: <FaFacebook />,
    linkedin: <FaLinkedin />,
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    tiktok: <FaTiktok />,
    snapchat: <FaSnapchat />,
    spotify: <FaSpotify />,
    thread: <FaThreads />,
    threads: <FaThreads />, // Added "threads" as an alias for "thread"
    pinterest: <FaPinterest />,
    discord: <FaDiscord />,
    telegram: <FaTelegram />,
  };

  return (
    <OuterSection className="mt-auto bg-primary-light">
      <InnerSection
        Tag="footer"
        className="text-white pb-xl" // Standardized vertical padding
      >
        <div className="grid grid-cols-4 gap-xl">
          {/* Brand & Contact Info */}
          <div className="col-span-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" aria-label="Go to Home" className="mb-md inline-block">
              <img className="w-48" src={logoUrl} alt="Footer Logo" />
            </Link>
            <div className="space-y-md">
              <Link
                href={`tel:${phone}`}
                className="flex items-center gap-sm text-base text-white/70 transition hover:text-white"
              >
                <FaPhone /> <span>{phone}</span>
              </Link>
              <Link
                href={`mailto:${email}`}
                className="flex items-center gap-sm text-base text-white/70 transition hover:text-white"
              >
                <FaRegEnvelope /> <span>{email}</span>
              </Link>
              <div className="flex items-center gap-sm flex-wrap">
                {socialLinks.map((item) => (
                  <Link
                    key={item.platform}
                    to={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${item.platform}`}
                    className="bg-white text-primary p-sm rounded-full transition hover:opacity-80"
                  >
                    {socialIcons[item.platform] || '🔗'}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Link Groups */}
          {[...linkGroups]
            .sort((a, b) => a.order - b.order)
            .map((group, idx) => (
              <div className="col-span-4 sm:col-span-2 lg:col-span-1" key={idx}>
                <h3 className="font-bold text-md mb-lg">{group.title}</h3>
                <ul className="space-y-sm">
                  {[...group.links]
                    .sort((a, b) => a.order - b.order)
                    .map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.url}
                          target={link.is_external ? '_blank' : '_self'}
                          className="text-base text-white/70 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}

          <div className="col-span-4 md:col-span-2">
            <h3 className='text-md font-bold'>About</h3>
            <p className="text-white/70 text-base">{description}</p>
          </div>
          <div className="col-span-4 md:col-span-2">
            <h3 className='text-md font-bold'>Address</h3>
            <address className="not-italic text-white/70 text-base">{address}</address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-xl pt-lg text-center">
          <p className="text-base text-white/70">
            &copy; {copyrightYear} {copyrightName}. All rights reserved.
          </p>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default Footer;
