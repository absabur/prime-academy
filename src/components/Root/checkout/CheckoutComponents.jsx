import { Loader2, AlertTriangle, ShoppingCart } from 'lucide-react';
import OuterSection from '../../../components/common/OuterSection';
import InnerSection from '../../../components/common/InnerSection';

// --- Helper Components ---
export const PriceLine = ({ label, value, className = '' }) => (
  <div className={`flex justify-between text-gray-700 ${className}`}>
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <Loader2 className="w-12 h-12 animate-spin text-primary" />
  </div>
);

export const EmptyCart = () => (
  <OuterSection className="pt-fnavbar">
    <InnerSection
      className="flex flex-col justify-center items-center min-h-[50vh] text-center"
      style={{ paddingTop: 0 }}
    >
      <ShoppingCart className="w-16 h-16 text-gray-300" />
      <h1 className="text-2xl font-semibold mt-4">Your cart is empty.</h1>
      <p className="text-gray-600 mt-2">Redirecting ...</p>
    </InnerSection>
  </OuterSection>
);

export const ErrorAlert = ({ message }) => (
  <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
    <AlertTriangle size={20} />
    <span className="flex-1">{message}</span>
  </div>
);
