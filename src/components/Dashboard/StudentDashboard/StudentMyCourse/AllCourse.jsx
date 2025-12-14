import React, { useEffect, useState } from 'react';
import { LoaderCircle, CheckCircle2 } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';
import SecondaryButton from '../../../common/SecondaryButton';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyCourses } from '../../../../redux/courses/courseAction';
import api from '@/api/axios';
import './css/mycourses.css';

// --- Reusable CourseCard Component (Updated) ---
const CourseCard = ({ course }) => {
  const { course_title, is_completed_status, course_slug, batch_id, id } = course;
  const isOngoing = !is_completed_status;

  let previewSrc = course?.imageUrl;
  if (previewSrc?.startsWith('/')) {
    previewSrc = `${import.meta.env.VITE_API_URL}${previewSrc}`;
  }

  return (
    // ✅ CHANGED: Removed h-50, added sm:h-52. Card is auto-height on mobile.
    <Link
      to={`/student-dashboard/my-course/${course_slug}/${batch_id}`}
      onClick={() => sessionStorage.setItem('currentCourse', id)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row w-full sm:h-52"
    >
      {/* Image Section */}
      {/* ✅ CHANGED: Adjusted width from sm:w-3/6 to sm:w-5/12 */}
      <div className="sm:w-5/12 flex-shrink-0">
        <img className="h-48 w-full object-cover sm:h-full" src={previewSrc} alt={course_title} />
      </div>

      {/* Content Section */}
      {/* ✅ CHANGED: Adjusted width from sm:w-3/6 to sm:w-7/12 */}
      <div className="p-md md:p-sm flex flex-col justify-between sm:w-7/12">
        <div>
          <h3
            className={`hover:text-primary text-lg font-bold line-clamp-3 ${isOngoing ? 'text-black' : 'text-black/50'}`}
          >
            {course_title}
            {course.batchName && course.batchName !== 'N/A' && (
              <span className="text-primary"> - {course.batchName}</span>
            )}
          </h3>
        </div>

        {/* Tags Section */}
        <div className="flex items-center gap-sm mt-4 flex-wrap">
          <span
            className={`inline-flex whitespace-nowrap items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isOngoing
                ? 'bg-secondary/10 text-priamary border border-secondary/30'
                : 'bg-black/10 text-black/70'
            }`}
          >
            {isOngoing ? (
              <>
                <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin-slow" /> <span>Ongoing</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> <span>Completed</span>
              </>
            )}
          </span>

          {/* Payment Status Badge */}
          {course.isInstallment ? (
            <span className="inline-flex whitespace-nowrap items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
              💳 {course.installmentsPaid}/{course.totalInstallments} Installments
            </span>
          ) : (
            course.paymentStatus === 'completed' && (
              <span className="inline-flex whitespace-nowrap items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                ✓ Paid in Full
              </span>
            )
          )}
          {course.batchStartDate && (
            <span className="text-xs text-gray-500">
              Started: {new Date(course.batchStartDate).toLocaleDateString()}
            </span>
          )}
          {/* Next Payment Due - Enhanced Display */}
          {course.isInstallment && course.nextPaymentDue && (
            <span className="inline-flex whitespace-nowrap items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
              📅 Next: ৳{parseFloat(course.nextPaymentAmount || 0).toLocaleString()} on{' '}
              {new Date(course.nextPaymentDue).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

// --- Main AllCourse Component ---
export default function AllCourse() {
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' or 'Ongoing'
  const [coursesWithPayment, setCoursesWithPayment] = useState([]);
  const dispatch = useDispatch();
  const { myCourses, loadingmyCourses } = useSelector((state) => state.course);

  useEffect(() => {
    // Fetch courses based on active filter
    const status = activeFilter === 'Ongoing' ? 'ongoing' : null;
    dispatch(fetchMyCourses(status));
  }, [activeFilter, dispatch]);

  // Fetch payment details for each course
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!myCourses || myCourses.length === 0) {
        setCoursesWithPayment([]);
        return;
      }

      const coursesWithPaymentData = await Promise.all(
        myCourses.map(async (course) => {
          // If order is just a UUID string, fetch the full order details
          if (course.order && typeof course.order === 'string') {
            try {
              const response = await api.get(`/api/orders/${course.order}/`);
              const data = response.data;

              if (data.success && data.data) {
                const orderData = data.data;

                // Extract batch info from order's batch field
                const batchInfo = orderData.batch || {};

                return {
                  ...course, // Preserve all course data
                  paymentStatus: orderData.payment_status || 'unknown',
                  isInstallment: orderData.is_installment || false,
                  installmentsPaid: orderData.installments_paid || 0,
                  totalInstallments: orderData.installment_plan || 0,
                  totalAmount: parseFloat(orderData.total_amount || 0),
                  amountPaid: parseFloat(orderData.paid_amount || 0),
                  nextPaymentDue: orderData.next_installment_date || null,
                  nextPaymentAmount: parseFloat(orderData.installment_amount || 0),
                  // Preserve existing batch info from Redux (already extracted from enrollment.batch_info)
                  // Don't override with order data unless missing
                  batchName:
                    course.batchName && course.batchName !== 'N/A'
                      ? course.batchName
                      : batchInfo.batch_name || batchInfo.display_name || 'N/A',
                  batchNumber: course.batchNumber || batchInfo.batch_number || null,
                  batchStartDate: course.batchStartDate || batchInfo.start_date || null,
                  batchEndDate: course.batchEndDate || batchInfo.end_date || null,
                  batchStatus: course.batchStatus || batchInfo.status || null,
                };
              } else {
                console.warn('⚠️ Order API returned unsuccessful or no data:', data);
              }
            } catch (error) {
              console.error('❌ Error fetching order details:', error);
              console.error('Error response:', error.response?.data);
              console.error('Error status:', error.response?.status);
            }
          } else {
          }

          // Return course with existing batch data (already extracted in Redux from enrollment.batch_info)
          // Add default payment values if order fetch failed or order doesn't exist
          return {
            ...course,
            // Batch info is already in course object from Redux, just preserve it
            batchName: course.batchName || 'N/A',
            batchNumber: course.batchNumber || null,
            batchStartDate: course.batchStartDate || null,
            batchEndDate: course.batchEndDate || null,
            batchStatus: course.batchStatus || null,
            // Add default payment info if not already set
            paymentStatus: course.paymentStatus || 'unknown',
            isInstallment: course.isInstallment || false,
            installmentsPaid: course.installmentsPaid || 0,
            totalInstallments: course.totalInstallments || 0,
            nextPaymentDue: course.nextPaymentDue || null,
            nextPaymentAmount: course.nextPaymentAmount || 0,
          };
        })
      );

      setCoursesWithPayment(coursesWithPaymentData);
    };

    fetchPaymentDetails();
  }, [myCourses]);

  return (
    <>
      {/* ✅ CHANGED: Added max-w-7xl and horizontal padding (px) */}
      <div className="shadow-md rounded-lg border border-black/10 bg-secondary-bg p-lg">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-md flex-wrap">
          <h1 className="text-4xl font-bold text-black mb-4 sm:mb-0">My Course</h1>
          <div className="flex space-x-3">
            <PrimaryButton
              onClick={() => setActiveFilter('All')}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeFilter === 'All'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white text-black/70 hover:bg-black/5'
              }`}
              text={`All Courses`}
            />
            <SecondaryButton
              onClick={() => setActiveFilter('Ongoing')}
              className={`transition-all duration-200 ${
                activeFilter === 'Ongoing'
                  ? 'bg-secondary text-white shadow-md border-secondary'
                  : 'bg-white text-black/70 hover:bg-black/5'
              }`}
              text={`Ongoing Courses`}
            />
          </div>
        </header>

        {/* Courses Grid */}
        {/* ✅ CHANGED: xl:grid-cols-2 -> lg:grid-cols-2 */}
        <main className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-lg">
          {loadingmyCourses ? (
            <div className="col-span-2 flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : coursesWithPayment.length === 0 && myCourses.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">
                No courses found. You haven't enrolled in any courses yet.
              </p>
            </div>
          ) : (
            (coursesWithPayment.length > 0 ? coursesWithPayment : myCourses).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </main>
      </div>
    </>
  );
}
