// --- Calculation Helpers ---
export const calculateOrderTotals = (carts, passedState) => {
  const originalSubtotal =
    carts?.items?.reduce((acc, item) => acc + parseFloat(item.course.price), 0) || 0;
  const preCouponTotal = parseFloat(carts?.total) || 0;
  const finalTotalFromCart = passedState.final_total;
  const totalToPay =
    finalTotalFromCart !== null && finalTotalFromCart !== undefined
      ? finalTotalFromCart
      : preCouponTotal;
  const totalDiscount = originalSubtotal - totalToPay;
  const couponDiscountAmount = preCouponTotal - totalToPay;

  return {
    originalSubtotal,
    preCouponTotal,
    totalToPay,
    totalDiscount,
    couponDiscountAmount,
  };
};

export const buildOrderPayload = (
  billingDetails,
  carts,
  totals,
  couponCode,
) => {
  return {
    billing_name: billingDetails.name,
    billing_email: billingDetails.email,
    billing_phone: billingDetails.phone,
    billing_address: billingDetails.address,
    billing_city: billingDetails.city,
    billing_country: billingDetails.country,
    billing_postcode: billingDetails.postcode,
    currency: 'BDT',
    subtotal: totals.preCouponTotal.toFixed(2),
    discount_amount: totals.couponDiscountAmount.toFixed(2),
    tax_amount: '0.00',
    total_amount: totals.totalToPay.toFixed(2),
    items: carts?.items?.map((item) => ({
      course: item.course.id,
      price: parseFloat(item.course.discounted_price).toFixed(2),
      discount: (parseFloat(item.course.price) - parseFloat(item.course.discounted_price)).toFixed(
        2
      ),
      currency: 'BDT',
    })),
  };
};
