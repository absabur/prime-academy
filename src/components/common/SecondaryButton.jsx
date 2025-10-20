import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { FaSpinner } from "react-icons/fa";

const SecondaryButton = ({
  children,
  text,
  href,
  type = "button",
  className = "",
  onClick,
  disabled = false,
  loading = false,
  from,
  ...props
}) => {
  const content = loading ? (
    <span className="flex items-center gap-2">
      <FaSpinner className="animate-spin" /> Loading...
    </span>
  ) : (
    children || text
  );

  // Exact previous Tailwind CSS
  const baseStyles = `min-w-[150px] rounded-lg p-lg font-bold text-base text-white cursor-pointer 
    transition-colors border-2 border-white inline-flex items-center justify-center bg-transparent
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${from === "hero" ? "hover:bg-secondary hover:border-secondary" : "hover:bg-primary hover:border-primary"}
    ${className}`;

  // External vs internal links
  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <Button asChild className={baseStyles} disabled={disabled || loading} {...props}>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {content}
          </Link>
        </Button>
      );
    } else {
      return (
        <Button asChild className={baseStyles} disabled={disabled || loading} {...props}>
          <Link to={href}>{content}</Link>
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
      {content}
    </Button>
  );
};

export default SecondaryButton;
