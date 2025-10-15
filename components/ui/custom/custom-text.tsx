import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef, ReactNode } from 'react';

interface ICustomText extends ComponentProps<"div"> {
  variant?: "div" | "p" | "span";
  children: ReactNode;
  className?: string;
}

const CustomText = forwardRef<HTMLDivElement, ICustomText>(({ className, children, variant = "div", ...props }, ref) => {
  const Comp = variant;

  const variants = {
    div: "",
    p: "text-lg w-fit mx-auto",
    span: "text-base text-muted-foreground w-fit",
  }

  return (
    <Comp className={cn(variants[variant], className)} ref={ref} {...props}>
      {children}
    </Comp>
  )
})

CustomText.displayName = 'CustomText';

export { CustomText };