import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef, ReactNode } from 'react';

interface ICustomHeading extends ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  className?: string;
}

const CustomHeading = forwardRef<HTMLHeadingElement, ICustomHeading>(({ className, variant = "h1", children, ...props }, ref) => {
  const Comp = variant;

  const variants = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base",
  }
  
  return (
    <Comp className={cn(variants[variant], className)} ref={ref} {...props}>
      {children}
    </Comp>
  )
})

CustomHeading.displayName = 'CustomHeading';

export { CustomHeading };