import PolicyHero from '../../../components/Root/policies/PolicyHero';
import PolicyContent from '../../../components/Root/policies/PolicyContent';
import { fetchPolicies } from '@/redux/policies/policiesAction';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Policy = () => {
  const { page_name } = useParams();
  const { policies, loadingPolicies } = useSelector((state) => state.policies);
  const [policyData, setPolicyData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  useEffect(() => {
    if (!policies) return;
    const policy = policies.find((data) => data.page_name === page_name);
    setPolicyData(policy);
  }, [policies]);

  return (
    <>
      <PolicyHero policyData={policyData} />
      <PolicyContent policyData={policyData} />
    </>
  );
};

export default Policy;
