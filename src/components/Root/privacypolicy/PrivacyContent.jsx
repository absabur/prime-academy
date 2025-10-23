import PrivacyHeading from '../../common/PrivacyHeading';
import InnerSection from '../../common/InnerSection';
import OuterSection from '../../common/OuterSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPolicies } from '@/redux/policies/policiesAction';
import DOMPurify from 'dompurify';

const PrivacyContent = () => {
  const { policies } = useSelector((state) => state.policies);
  const [policyData, setPolicyData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  useEffect(() => {
    if (!policies) return;
    const privacy = policies.find((data) => data.page_name === 'privacy');
    setPolicyData(privacy);
  }, [policies]);

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
            <p>No privacy policy found.</p>
          )}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default PrivacyContent;
