import { useSEO } from '@/hooks/usePageSeo';
import { useEffect, useState } from 'react';
import { fetchSeos } from '@/redux/seo/seoAction';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiSeoToUseSEO } from '@/utils/mapApiSeoToUseSEO';
import Content from '../../../components/Root/Policy/PolicyContent';
import PolicyHero from '../../../components/Root/Policy/PolicyHero';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchHeros } from '@/redux/hero/heroAction';
import { fetchPolicies } from '@/redux/policies/policiesAction';
import LoadingDashboard from '../../../components/Dashboard/common/LoadingDashboard';
// Assuming you have a loading component
// import LoadingSpinner from '@/components/common/LoadingSpinner';

const Policy = () => {
  const { policies, loadingPolicies } = useSelector((state) => state.policies);
  const { seos } = useSelector((state) => state.seo);
  const { heros } = useSelector((state) => state.hero);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const policyName = pathname.replace('/', '');

  // --- Local State ---
  // Use `null` to represent "not yet processed"
  const [policyData, setPolicyData] = useState(null);
  const [pageSeo, setPageSeo] = useState(null);
  const [hero, setHero] = useState(null); // Start as null

  // --- Data Fetching ---
  useEffect(() => {
    dispatch(fetchPolicies());
    dispatch(fetchSeos());
    dispatch(fetchHeros());
  }, [dispatch]);

  // --- Data Processing (Hero) ---
  useEffect(() => {
    if (heros && heros.length > 0) {
      const current = heros.find((item) => item.page_name === policyName);
      setHero(current); // This will be `undefined` if not found, or an object
    }
  }, [heros, policyName]);

  // --- Data Processing (SEO) ---
  useEffect(() => {
    if (seos && seos.length > 0) {
      const current = seos.find((item) => item.page_name === policyName);
      setPageSeo(current); // `undefined` or an object
    }
  }, [seos, policyName]);

  // --- Data Processing (Policy) ---
  useEffect(() => {
    // Wait until loading is finished
    if (loadingPolicies) {
      return; // Still loading, don't do anything
    }

    // Loading is finished. Now, do we have policies?
    if (policies && policies.length > 0) {
      const privacy = policies.find((data) => data.page_name === policyName);
      setPolicyData(privacy); // This will be `undefined` if not found, or an object
    } else if (!loadingPolicies) {
      // Loading finished, but policies array is empty or null
      setPolicyData(undefined); // Treat as "not found"
    }
  }, [policies, policyName, loadingPolicies]); // Depend on loadingPolicies

  // --- SEO Hook ---
  useSEO(pageSeo ? mapApiSeoToUseSEO(pageSeo) : {});

  // --- Render Logic ---

  // 1. Show loading if policies are fetching OR if policyData is still `null`
  //    (meaning the processing effect hasn't run yet).
  if (loadingPolicies || policyData === null) {
    // You can return a loading spinner component here
    return <LoadingDashboard loading={true} />;
    // return <LoadingSpinner />;
  }

  // 2. If loading is done and policyData is `undefined`, it means
  //    the `find` method ran and found nothing.
  if (!loadingPolicies && policyData === undefined) {
    return <Navigate replace to={'/404'} />;
  }

  // 3. If we are here, it means:
  //    - `loadingPolicies` is false
  //    - `policyData` is not `null`
  //    - `policyData` is not `undefined`
  //    - Therefore, `policyData` must be the object we want.
  return (
    <>
      <PolicyHero hero={hero} />
      <Content data={policyData} />
    </>
  );
};

export default Policy;
