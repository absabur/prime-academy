import InnerSection from '../../common/InnerSection';
import OuterSection from '../../common/OuterSection';
import DOMPurify from 'dompurify';

const PolicyContent = ({ policyData }) => {
  return (
    <OuterSection>
      <InnerSection>
        <div className="flex flex-col gap-lg">
          {policyData ? (
            <div
              className="policy-wrapper"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(policyData.content),
              }}
            />
          ) : (
            <p>No policy found.</p>
          )}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default PolicyContent;
