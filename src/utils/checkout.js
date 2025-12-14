// --- Calculation Helpers ---
export const calculateOrderTotals = (carts, passedState) => {
  // Calculate from actual filtered items (not carts.total which is for all items)
  const originalSubtotal =
    carts?.items?.reduce((acc, item) => acc + parseFloat(item.course.price || 0), 0) || 0;
  
  // Use item subtotals instead of cart total for accurate filtered calculation
  const preCouponTotal = 
    carts?.items?.reduce((acc, item) => acc + parseFloat(item.subtotal || 0), 0) || 0;
  
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
  is_installment,
  installment_plan,
  installment_price
) => {
  return {
    billing_name: billingDetails.name,
    billing_email: billingDetails.email,
    billing_phone: billingDetails.phone,
    billing_address: billingDetails.address,
    billing_city: billingDetails.city,
    billing_country: billingDetails.country,
    billing_postcode: billingDetails.postcode,
    is_installment: is_installment,
    installment_plan: installment_plan,
    installment_amount: is_installment ? installment_price.toFixed(2) : null,
    currency: 'BDT',
    // Always send full amounts (backend validates this against items)
    subtotal: totals.preCouponTotal.toFixed(2),
    total_amount: totals.totalToPay.toFixed(2),
    discount_amount: totals.couponDiscountAmount.toFixed(2),
    tax_amount: '0.00',
    items: carts?.items?.map((item) => ({
      course: item.course.id,
      batch: item.batch?.id || item.batch, // Include batch ID from cart item
      price: parseFloat(item.course.discounted_price).toFixed(2),
      discount: (parseFloat(item.course.price) - parseFloat(item.course.discounted_price)).toFixed(
        2
      ),
      currency: 'BDT',
    })),
  };
};
