import { useState } from 'react';
import { Link } from 'react-router-dom';
import OuterSection from '@/components/common/OuterSection';
import InnerSection from '@/components/common/InnerSection';
import { FiMenu, FiX } from 'react-icons/fi';

const LandingNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { text: 'About', url: '#about' },
    { text: 'Why Us', url: '#why' },
    { text: 'Pricing', url: '#pricing' },
    { text: 'Syllabus', url: '#syllabus' },
    { text: 'Instructor', url: '#instructor' },
  ];

  return (
    <OuterSection className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-black/40 shadow-xl backdrop-blur-md`} style={{ overflow: 'visible' }}>
      <InnerSection Tag="header" className='h-navbar' style={{paddingBlock: "10px"}}>
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:px-0">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={`/assets/prime-academy-logo-full.png`} className="w-[190px]" alt="Prime Logo" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold">
            {navLinks.map(({ text, url }) => (
              <Link key={url} to={url} className={`hover:text-white transition-colors text-white/60`}>
                {text}
              </Link>
            ))}
            <Link
              to="#enroll"
              className="inline-flex h-9 items-center rounded-lg border border-transparent bg-[#f2c94c] px-3 font-bold text-[#1b1b1b] hover:brightness-105 transition"
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(prev => !prev)} aria-label="Toggle Menu">
            {menuOpen ? <FiX className={`w-7 h-7 text-white`} /> : <FiMenu className={`w-7 h-7 text-white`} />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full backdrop-blur-md bg-primary shadow-lg z-40">
            <nav className="flex flex-col items-center gap-4 py-6">
              {navLinks.map(({ text, url }) => (
                <Link
                  key={url}
                  to={url}
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold text-lg text-white hover:text-primary transition-colors"
                >
                  {text}
                </Link>
              ))}
              <Link
                to="#enroll"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 items-center rounded-lg bg-[#f2c94c] px-4 font-bold text-[#1b1b1b] hover:brightness-105 transition"
              >
                Enroll Now
              </Link>
            </nav>
          </div>
        )}
      </InnerSection>
    </OuterSection>
  );
};

export default LandingNavbar;
