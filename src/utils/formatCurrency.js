// --- Helper Functions ---
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) {
    amount = 0;
  }
  const number = parseFloat(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT', // You can change this to BDT
  }).format(number);
};
