import CountUp from 'react-countup';
import PrimaryButton from './PrimaryButton';
import { useEffect, useRef, useState } from 'react';

const KnowUsComponent = ({ data }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.5,
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex gap-xl flex-col md:flex-row">
      {/* Left Column */}
      <div className="flex-1 self-start">
        <h2 className="text-3xl font-bold font-heading text-black mb-md">{data?.title}</h2>
        <p className="font-heading text-black text-base font-normal max-w-90">
          {data?.description}
        </p>
        {data?.button_text && (
          <PrimaryButton
            className="rounded-lg mt-xl"
            text={data?.button_text}
            href={data?.button_url}
          />
        )}
      </div>

      {/* Right Column */}
      <div
        ref={ref}
        className="flex-2 grid grid-cols-1 md:grid-cols-2 gap-lg justify-center items-start"
      >
        {/* Learners Count */}
        <div className="space-y-sm">
          <h3 className="break-words heading-5xl">
            <CountUp
              start={0}
              end={data?.learners_count || 0}
              duration={2}
              suffix="+"
              enableScrollSpy
              scrollSpyOnce
            >
              {({ countUpRef }) => <span ref={countUpRef}></span>}
            </CountUp>
          </h3>
          <div className="bg-secondary h-2 rounded-full w-[250px]"></div>
          <p className="text-base text-black font-normal font-heading">{data?.learners_short}</p>
        </div>

        {/* Partners Count */}
        <div className="space-y-sm">
          <h3 className="break-words heading-5xl">
            <CountUp
              start={0}
              end={data?.partners_count || 1}
              duration={2}
              suffix="+"
              enableScrollSpy
              scrollSpyOnce
            >
              {({ countUpRef }) => <span ref={countUpRef}></span>}
            </CountUp>
          </h3>
          <div className="bg-secondary h-2 rounded-full w-[250px]"></div>
          <p className="text-base text-black font-normal font-heading">{data?.partners_short}</p>
        </div>

        {/* Static Blocks */}
        <div className="space-y-sm">
          <h3 className="break-words heading-5xl">{data?.outstanding_title}</h3>
          <div className="bg-secondary h-2 rounded-full w-[250px]"></div>
          <p className="text-base text-black font-normal font-heading">{data?.outstanding_short}</p>
        </div>

        <div className="space-y-sm">
          <h3 className="break-words heading-5xl">{data?.partnerships_title}</h3>
          <div className="bg-secondary h-2 rounded-full w-[250px]"></div>
          <p className="text-base text-black font-normal font-heading">
            {data?.partnerships_short}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KnowUsComponent;
