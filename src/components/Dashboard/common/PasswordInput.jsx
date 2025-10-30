import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * A reusable password input component with a show/hide toggle.
 */
const PasswordInput = ({
  label,
  name,
  register,
  validation,
  error,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div>
      <label className="block mb-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          {...register(name, validation)}
          className={`w-full border ${
            error ? 'border-red-500' : 'border-black/10'
          } px-md py-sm rounded-md focus:outline-none focus:shadow-lg pr-10`} // Added pr-10 for icon
          placeholder={placeholder}
        />
        <button
          type="button" // Prevents form submission
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;