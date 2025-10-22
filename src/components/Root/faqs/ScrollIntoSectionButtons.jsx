/**
 * ScrollIntoSectionButtons Component
 * -----------------------------------
 * - Renders a set of buttons to quickly navigate to different FAQ categories.
 * - Smoothly scrolls to the target section with a configurable offset.
 * - Fully responsive and accessible.
 */

import TabButtons from '@/components/common/TabButtons';
import TabButtonsFaq from '@/components/common/TabButtonsFaq';

const ScrollIntoSectionButtons = ({ headings }) => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; // Keeps 70px space at the top for fixed headers
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <TabButtonsFaq
      data={headings}
      selected={null} // not needed here
      setSelected={(category) => handleScroll(category)}
    />
  );
};

export default ScrollIntoSectionButtons;
