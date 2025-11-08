import { fetchFootersAdmin } from '@/redux/footer/footerAction';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const footerDisplay = () => {
  const { adminPanelFooter } = useSelector((state) => state.footer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFootersAdmin());
  }, []);

  if (!adminPanelFooter) {
    return <p>Loading data...</p>;
  }

  // Destructure the data for easier access
  const {
    logo_url,
    description,
    address,
    email,
    phone,
    copyright_name,
    link_groups,
    social_links,
  } = adminPanelFooter;

  // Helper styles for the tables
  const thStyle =
    'p-3 text-left text-sm font-semibold text-gray-700 bg-gray-100 border-b border-black/20';
  const tdStyle = 'p-3 text-sm text-black/70 border-b border-black/20';
  const tableContainerStyle = 'shadow-md rounded-lg overflow-x-auto';
  const tableTitleStyle = 'text-xl font-bold text-black/70 mb-sm mt-xl';

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
    <div className="bg-gray-50 min-h-screen">
      {/* --- Main Details Table --- */}
      <h2 className={tableTitleStyle} style={{ marginTop: 0 }}>
        Main Details
      </h2>
      <div className={tableContainerStyle}>
        <table className="min-w-full bg-white">
          <tbody>
            <tr className="border-b border-black/20 bg-primary">
              <td className={`${tdStyle} font-medium w-1/4 text-white`}>Logo</td>
              <td className={`${tdStyle}`}>
                <img src={logo_url} alt="Footer Logo" width={150} className="p-sm rounded" />
              </td>
            </tr>
            <tr className="border-b border-black/20">
              <td className={`${tdStyle} font-medium`}>Description</td>
              <td className={tdStyle}>{description}</td>
            </tr>
            <tr className="border-b border-black/20">
              <td className={`${tdStyle} font-medium`}>Address</td>
              <td className={tdStyle}>{address}</td>
            </tr>
            <tr className="border-b border-black/20">
              <td className={`${tdStyle} font-medium`}>Email</td>
              <td className={tdStyle}>
                <Link to={`mailto:${email}`} className="text-blue-600">
                  {email}
                </Link>
              </td>
            </tr>
            <tr className="border-b border-black/20">
              <td className={`${tdStyle} font-medium`}>Phone</td>
              <td className={tdStyle}>
                <Link to={`tel:${phone}`} className="text-blue-600">
                  {phone}
                </Link>
              </td>
            </tr>
            <tr className="border-b border-black/20">
              <td className={`${tdStyle} font-medium`}>Copyright</td>
              <td className={tdStyle}>&copy; {copyright_name}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Social Links Table --- */}
      <h2 className={tableTitleStyle}>Social Links</h2>
      <div className={tableContainerStyle}>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className={`${thStyle} text-white bg-primary`}>Platform</th>
              <th className={`${thStyle} text-white bg-primary`}>URL</th>
              <th className={`${thStyle} text-white bg-primary`}>Order</th>
            </tr>
          </thead>
          <tbody>
            {social_links?.length &&
              social_links?.map((link) => (
                <tr key={link.platform}>
                  <td className={tdStyle}>
                    <span className="flex items-center gap-sm">
                      {socialIcons[link.platform]} {link.platform}
                    </span>
                  </td>
                  <td className={tdStyle}>
                    <Link
                      to={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {link.url}
                    </Link>
                  </td>
                  <td className={tdStyle}>{link.order}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* --- Link Groups Section --- */}
      <h2 className={tableTitleStyle}>Link Groups</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {link_groups?.length &&
          link_groups?.map((group) => (
            <div key={group.title} className={`${tableContainerStyle} mb-0`}>
              <h3 className="sticky left-0 top-0 text-lg font-semibold p-md bg-primary text-white rounded-t-lg">
                {group.title} (Order: {group.order})
              </h3>
              <table className="w-full bg-white">
                <thead>
                  <tr>
                    <th className={thStyle}>Label</th>
                    <th className={thStyle}>URL</th>
                    <th className={thStyle}>Order</th>
                  </tr>
                </thead>
                <tbody>
                  {group.links.map((link) => (
                    <tr key={link.label}>
                      <td className={tdStyle}>{link.label}</td>
                      <td className={tdStyle}>{link.url}</td>
                      <td className={tdStyle}>{link.order}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
};

export default footerDisplay;
