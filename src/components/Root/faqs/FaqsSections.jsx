/**
 * FaqsSections Component
 * ----------------------
 * - Displays FAQs grouped by categories (Apprentice, Employer, Levy, etc.).
 * - Includes an accordion-style toggle for each question.
 * - Integrates ScrollIntoSectionButtons for quick navigation to categories.
 * - Fully responsive and accessible.
 */

import { useState } from 'react';
import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ScrollIntoSectionButtons from './ScrollIntoSectionButtons';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';

const FaqsSections = () => {
  // Track currently opened FAQ by unique ID `${categoryIndex}-${qnaIndex}`
  const { faqs } = useSelector((state) => state.faq);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <OuterSection>
      <InnerSection>
        {/* Quick navigation buttons for each FAQ category */}
        <ScrollIntoSectionButtons headings={faqs} />

        {/* FAQ Categories */}
        {faqs.length &&
          [...faqs]
            ?.sort((a, b) => a.faq_nav_order - b.faq_nav_order)
            ?.map((category) => {
              if (category.is_active)
                return (
                  <div
                    key={category.faq_nav_slug}
                    id={category.faq_nav_slug}
                    className="w-full my-xl pt-xl"
                  >
                    <h2 className="uppercase font-heading font-bold text-3xl mb-sm">
                      {category.faq_nav}
                    </h2>

                    {/* FAQ Questions */}
                    {[...category?.faqs]
                      ?.sort((a, b) => a.order - b.order)
                      ?.map((qna) => {
                        const isOpen = activeFaq === qna?.id;
                        if (qna.is_active)
                          return (
                            <div
                              key={qna?.id}
                              className="flex w-full flex-col border-b border-black/50"
                            >
                              {/* Question Header */}
                              <button
                                onClick={() => toggleFaq(qna?.id)}
                                className={`flex justify-between gap-lg items-center text-lg cursor-pointer font-bold font-heading text-left w-full py-md px-md ${isOpen ? 'shadow-md bg-secondary-bg' : ''}`}
                                aria-expanded={isOpen}
                                aria-controls={`faq-${qna?.id}`}
                              >
                                <span>{qna?.question}</span>
                                <span className="text-xl font-bold">{isOpen ? '−' : '+'}</span>
                              </button>

                              {/* Answer with smooth transition */}
                              <div
                                id={`faq-${qna?.id}`}
                                className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                                  isOpen
                                    ? 'grid-rows-[1fr] opacity-100 mt-2'
                                    : 'grid-rows-[0fr] opacity-0'
                                }`}
                              >
                                <div className={`overflow-hidden pl-md ${isOpen ? 'pb-lg' : ''}`}>
                                  <div
                                    className="prose prose-sm leading-relaxed max-w-none"
                                    dangerouslySetInnerHTML={{
                                      __html: DOMPurify.sanitize(qna?.answer),
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                      })}
                  </div>
                );
            })}
      </InnerSection>
    </OuterSection>
  );
};

export default FaqsSections;
