import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import blogReducer from './blogs/blogSlice';
import courseReducer from './courses/courseSlice';
import heroReducer from './hero/heroSlice';
import seoReducer from './seo/seoSlice';
import brandReducer from './brands/brandsSlice';
import footerReducer from './footer/footerSlice';
import commonReducer from './common/commonSlice';
import studentReducer from './students/studentSlice';
import teacherReducer from './teachers/teacherSlice';
import employeeReducer from './employee/employeeSlice';
import imgIconContentReducer from './imgIconContent/imgIconContentSlice';
import faqReducer from './faqs/faqsSlice';
import policiesReducer from './policies/policiesSlice';
import departmentReducer from './department/departmentSlice';
import skillReducer from './skill/skillSlice';
import messageReducer from './messages/messagesSlice';
import cartReducer from './cart/cartSlice';
import overviewReducer from './adminDashbroadOverView/overviewSlice';

import { setupAxiosInterceptors } from '@/api/setupAxiosInterceptors';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    course: courseReducer,
    hero: heroReducer,
    seo: seoReducer,
    brands: brandReducer,
    footer: footerReducer,
    common: commonReducer,
    student: studentReducer,
    teacher: teacherReducer,
    employee: employeeReducer,
    imgIconContent: imgIconContentReducer,
    faq: faqReducer,
    policies: policiesReducer,
    department: departmentReducer,
    skill: skillReducer,
    message: messageReducer,
    cart: cartReducer,
    overview: overviewReducer,
  },
});

setupAxiosInterceptors(store);

export default store;
