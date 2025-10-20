import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { FaSpinner } from 'react-icons/fa';

const PrimaryButton = ({
  text,
  href,
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  from,
  suffixIcon = null,
  prefixIcon = null,
  ...props
}) => {
  const content = loading ? (
    <span className="flex items-center gap-2">
      <FaSpinner className="animate-spin" /> Loading...
    </span>
  ) : (
    text
  );

  // Exact CSS from your old button
  const baseStyles = `min-w-[150px] bg-secondary p-lg font-bold text-base text-white cursor-pointer 
    transition-colors inline-flex items-center justify-center border-2 border-secondary
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${from === 'hero' ? 'hover:bg-transparent hover:border-white' : 'hover:bg-primary hover:border-primary'}
    ${className}`;

  // External vs internal links
  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <Button asChild className={baseStyles} disabled={disabled || loading} {...props}>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <span>{prefixIcon}</span>
            <span>{content}</span>
            <span>{suffixIcon}</span>
          </Link>
        </Button>
      );
    } else {
      return (
        <Button asChild className={baseStyles} disabled={disabled || loading} {...props}>
          <Link to={href}>
            <span>{prefixIcon}</span>
            <span>{content}</span>
            <span>{suffixIcon}</span>
          </Link>
        </Button>
      );
    }
  }

  // Default button
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseStyles}
      {...props}
    >
      <span>{prefixIcon}</span>
      <span>{content}</span>
      <span>{suffixIcon}</span>
    </Button>
  );
};

export default PrimaryButton;
