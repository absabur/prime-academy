// src/components/common/BaseCard.jsx
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const BaseCard = ({ children, className, shadow = true, bg = true, ...props }) => {
  return (
    <Card
      className={cn(
        'flex flex-col h-full rounded-xl p-6 transition-shadow duration-300',
        shadow && 'shadow-md hover:shadow-lg',
        bg && 'bg-white/25',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

export default BaseCard;
