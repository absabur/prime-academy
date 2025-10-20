/**
 * KnowUs Component
 * ----------------
 * - Highlights key statistics and achievements of Prime Academy
 * - Split layout:
 *    1. Text and CTA on the left
 *    2. Statistics grid on the right
 * - Uses OuterSection + InnerSection for consistent layout
 * - Includes a PrimaryButton for user engagement
 */

import CountUp from 'react-countup';
import PrimaryButton from './PrimaryButton';
import { useEffect, useRef, useState } from 'react';

const KnowUsComponent = ({ content, statsData }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(ref);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting); // true if element is visible
      },
      { threshold: 0.5 } // 50% of element must be visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect(); // cleanup
  }, []);

  return (
    <div className="flex gap-xl flex-col md:flex-row">
      {/* Left Column: Heading, description, and CTA */}
      <div className="flex-1 self-start">
        <h2 className="text-3xl font-bold font-heading text-black mb-md">{content?.title}</h2>
        <p className="font-heading text-black text-base font-normal max-w-90">
          {content?.description}
        </p>
        {content?.button_text && (
          <PrimaryButton
            className="rounded-lg mt-xl"
            text={content?.button_text}
            href={content?.button_url}
          />
        )}
      </div>

      {/* Right Column: Statistics grid */}
      <div className="flex-2 grid grid-cols-1 md:grid-cols-2 gap-lg justify-center items-start">
        {statsData.map((stat, index) => (
          <div ref={ref} key={index} className="space-y-sm">
            {stat.type == 'number' && inView ? (
              <CountUp start={0} duration={1} end={stat.value} delay={0} suffix={stat.extension}>
                {({ countUpRef }) => <h3 ref={countUpRef} className="break-words heading-5xl"></h3>}
              </CountUp>
            ) : (
              <h3 className="break-words heading-5xl">
                {/* Stat value */}
                {stat.value}
              </h3>
            )}

            {/* Decorative progress bar */}
            <div className="bg-secondary h-2 rounded-full w-[250px]"></div>

            {/* Stat description */}
            <p className="text-base text-black font-normal font-heading">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowUsComponent;
