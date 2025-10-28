import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { FaSpinner } from 'react-icons/fa';

const SecondaryButton = ({
  children,
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
  minWidth = '',
  ...props
}) => {
  const content = loading ? (
    <span className="flex items-center gap-2">
      <FaSpinner className="animate-spin" /> Loading...
    </span>
  ) : (
    children || text
  );

  let widthCss = 'min-w-[150px]';
  if (minWidth == 'fit') {
    widthCss = 'min-w-fit';
  }

  const baseStyles = `${widthCss}  rounded-lg p-lg font-bold text-base text-white cursor-pointer 
    transition-colors border-2 border-white inline-flex items-center justify-center bg-transparent
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${from === 'hero' ? 'hover:bg-secondary hover:border-secondary' : 'hover:bg-primary hover:border-primary'}
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

export default SecondaryButton;
