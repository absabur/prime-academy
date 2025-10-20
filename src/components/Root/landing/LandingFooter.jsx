import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <OuterSection className="bg-primary">
      <InnerSection Tag="footer" className="z-1 ">
        <div className="mx-auto flex w-full items-center justify-between py-5">
          <div>
            <div className="font-extrabold">Prime Academy</div>
            <p className="text-sm text-white/50">
              Why wait? This is the moment to stay ahead in the AI era.
            </p>
          </div>
          <div className="hidden gap-4 text-sm font-semibold text-white/50 md:flex">
            <Link className="hover:text-white" to="#about">
              About
            </Link>
            <Link className="hover:text-white" to="#syllabus">
              Syllabus
            </Link>
            <Link className="hover:text-white" to="#pricing">
              Pricing
            </Link>
            <Link className="hover:text-white" to="#enroll">
              Enroll
            </Link>
          </div>
        </div>
        <div className="border-t border-[#1a2338] py-3 text-center text-xs text-white/50">
          © Prime Academy Bangladesh · Made by 💛 J. R. Polok
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default LandingFooter;
