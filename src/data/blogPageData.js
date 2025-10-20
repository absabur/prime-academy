import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export const blogImageContent = {
  title: 'The Cost of a Click',
  image: '/assets/imagecontent.jpg', // Replace with actual image path
  video: '', // Optional video URL
  content: `
    Our free guide to why your people are your biggest cybersecurity vulnerability.
    Learn how a simple mistake can lead to a massive cybersecurity failure – and what you can do to reduce your risk.
  `,
  buttonText: 'Explore this site', // Optional button text
  url: '', // Optional button URL
};

export const blogData = {
  share: [
    {
      name: 'Facebook',
      icon: 'FaFacebook',
      url: 'https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=',
      color: 'text-blue-600',
    },
    {
      name: 'Twitter',
      icon: 'FaTwitter',
      url: 'https://twitter.com/intent/tweet?url=',
      text: 'Check this out!',
      color: 'text-sky-500',
    },
    {
      name: 'LinkedIn',
      icon: 'FaLinkedin',
      url: 'https://www.linkedin.com/sharing/share-offsite/?url=',
      color: 'text-blue-700',
    },
    {
      name: 'WhatsApp',
      icon: 'FaWhatsapp',
      url: 'https://api.whatsapp.com/send?text=',
      color: 'text-green-500',
    },
  ],
};
