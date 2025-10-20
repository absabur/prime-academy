import React from 'react';

const CourseQuestionCard = ({ question }) => {
  return (
    <div className="flex flex-col items-center gap-md p-sm">
      <img className="w-[50px] h-[50px] object-cover" src={question.image} alt="" />
      <h1 className="heading-3xl text-center line-clamp-1" title={question.title}>
        {question.title}
      </h1>
      <p className="text-base text-center">{question.content}</p>
    </div>
  );
};

export default CourseQuestionCard;
