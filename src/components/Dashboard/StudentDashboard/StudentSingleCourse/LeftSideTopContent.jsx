import React, { useEffect, useState } from 'react';
import { RotateCw, Download, Share2, Sparkle } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import SecondaryButton from '../../../common/SecondaryButton';
import { useSearchParams } from 'react-router-dom';

/**
 * Reset Course Card
 * Component for resetting the course and joining a new batch.
 */
export const ResetCourseCard = () => (
  <div className="bg-white p-md rounded-2xl shadow-lg w-full border border-primary/10 flex flex-col xl:flex-row items-start md:items-center justify-between gap-4">
    <div className="flex items-start gap-3 flex-grow">
      <RotateCw className="h-6 w-6 text-primary-light flex-shrink-0 mt-1 md:mt-0" />
      <p className="text-gray-800 text-sm md:text-base leading-relaxed">
        Reset your course and join a new batch for only 779 taka, get lifetime access to both old
        and new batches.
      </p>
    </div>
    <div className="mx-auto flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center sm:items-center md:items-start lg:items-center gap-3 md:gap-4 md:ml-4 flex-shrink-0">
      <div className="text-center lg:text-left">
        <p className="text-sm text-gray-600">Next Batch:</p>
        <p className="text-base font-semibold text-gray-800">Sun, 30 Nov, 2025</p>
      </div>
      <PrimaryButton text={`Start New`} />
    </div>
  </div>
);

/**
 * Certificate Card
 * Component for displaying and sharing the certificate of completion.
 */
export const CertificateCard = () => (
  <div className="max-w-130 bg-primary p-5 md:p-6 rounded-2xl shadow-lg w-full flex flex-col sm:flex-row items-center justify-between gap-6">
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
      <h2 className="text-white text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
        Certificate of
        <br />
        Completion
        <Sparkle className="h-6 w-6 text-yellow-300 fill-yellow-300 flex-shrink-0" />
      </h2>
      <p className="text-white/70 text-sm md:text-base">Share on your social media</p>
    </div>
    <div className="flex flex-col gap-3 w-full sm:w-auto">
      <PrimaryButton
        from={`hero`}
        prefixIcon={<Download className="h-4 w-4" />}
        text={`Download`}
      />
      <SecondaryButton from={`hero`} prefixIcon={<Share2 className="h-4 w-4" />} text={`Share`} />
    </div>
  </div>
);

/**
 * Navigation Tabs Component
 * Component for course navigation tabs.
 */
export const NavigationTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab');

  useEffect(() => {
    if (!currentTab) {
      setSearchParams({ tab: 'Modules' });
    }
  }, [currentTab, setSearchParams]);

  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg w-full border-2 border-primary">
      <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
        {[
          { key: 'Modules', text: 'Modules' },
          { key: 'Assignment', text: 'Assignment' },
          { key: 'Recording', text: 'Recording' },
          { key: 'Resource', text: 'Resource' },
          { key: 'Attendance', text: 'Attendance' },
          { key: 'Certificate', text: 'Certificate' },
        ].map((item, index) => {
          if (searchParams.get('tab') == item.key) {
            return (
              <PrimaryButton
                onClick={() => setSearchParams({ tab: item.key })}
                key={item.key}
                text={item.text}
                minWidth="fit"
              />
            );
          } else {
            return (
              <SecondaryButton
                onClick={() => setSearchParams({ tab: item.key })}
                key={item.key}
                text={item.text}
                minWidth="fit"
                className="text-primary border-primary hover:text-white"
              />
            );
          }
        })}
      </div>
    </div>
  );
};
