import DOMPurify from 'dompurify';

const CourseQuestionCard = ({ question }) => {
  return (
    <div className="flex flex-col items-center gap-md p-sm">
      <img className="w-[50px] h-[50px] object-contain" src={question.image} alt="" />
      <h1 className="heading-3xl text-center line-clamp-1" title={question.title}>
        {question.title}
      </h1>
      <div
        className="prose prose-sm max-w-none text-black/80 text-center"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(question?.content),
        }}
      />
    </div>
  );
};

export default CourseQuestionCard;
