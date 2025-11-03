import InnerSection from '../../common/InnerSection';
import OuterSection from '../../common/OuterSection';
import DOMPurify from 'dompurify';

const Content = ({ data }) => {
  return (
    <OuterSection>
      <InnerSection>
        <div className="flex flex-col gap-lg">
          <div
            className="policy-wrapper"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.content),
            }}
          />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default Content;
