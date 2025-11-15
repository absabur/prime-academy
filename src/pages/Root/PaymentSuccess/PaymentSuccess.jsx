import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../../api/axios';

const PaymentSuccess = () => {
  const [order, setOrder] = useState();
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || '';

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}/`);
        if (response?.data?.data?.status == 'completed') {
          setOrder(response?.data?.data);
        } else {
          navigate('/courses');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getMyOrders();
  }, [orderId]);

  useEffect(() => {
    if (order?.items?.length) {
      order?.items?.map(async (item) => {
        try {
          console.log({
            user: order?.user,
            course: item?.id,
            order: order?.id,
          });
          const response = await api.post(`${import.meta.env.VITE_API_URL}/api/enrollments/`, {
            user: order?.user,
            course: item?.id,
            order: order?.id,
          });
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      });
    }
    setComplete(true);
    // navigate('/student-dashboard');
  }, [order]);

  return (
    <div className="pt-fnavbar">
      {complete ? <h1>Redirecting ... </h1> : <h1>Enrollment in progress. Please Wait.</h1>}
    </div>
  );
};

export default PaymentSuccess;
