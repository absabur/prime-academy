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
import { faqsData } from '../../../data/faqsPageData';

const FaqsSections = () => {
  // Track currently opened FAQ by unique ID `${categoryIndex}-${qnaIndex}`
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (categoryIndex, qnaIndex) => {
    const id = `${categoryIndex}-${qnaIndex}`;
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <OuterSection>
      <InnerSection>
        {/* Quick navigation buttons for each FAQ category */}
        <ScrollIntoSectionButtons headings={faqsData} />

        {/* FAQ Categories */}
        {faqsData.map((category, categoryIndex) => (
          <div key={category.category} id={category.category} className="w-full my-xl pt-xl">
            <h2 className="uppercase font-heading font-bold text-3xl mb-sm">{category.category}</h2>

            {/* FAQ Questions */}
            {category.qna.map((qna, qnaIndex) => {
              const id = `${categoryIndex}-${qnaIndex}`;
              const isOpen = activeFaq === id;

              return (
                <div
                  key={qna.question}
                  className="flex w-full flex-col border-b border-black/50 py-md"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFaq(categoryIndex, qnaIndex)}
                    className="flex justify-between items-center cursor-pointer font-bold font-heading text-left w-full"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${id}`}
                  >
                    <span>{qna.question}</span>
                    <span className="text-xl font-bold">{isOpen ? '−' : '+'}</span>
                  </button>

                  {/* Answer with smooth transition */}
                  <div
                    id={`faq-${id}`}
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      {qna.answer.split('\n').map(
                        (answer, index) =>
                          answer.trim().length > 0 && (
                            <p key={index} className="text-heading text-base leading-lg mt-2">
                              {answer}
                            </p>
                          )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </InnerSection>
    </OuterSection>
  );
};

export default FaqsSections;
