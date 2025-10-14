'use client'

import { ComponentProps, forwardRef } from 'react';
import { Button } from '../button';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <Button className={cn(
      "w-full max-w-sm mx-auto bg-foreground text-background hover:bg-foreground/90 cursor-pointer active:scale-101 transition-all duration-300 rounded-lg",
      className,
    )} ref={ref} {...props}>
      {children}
    </Button>
  )
})

CustomButton.displayName = 'CustomButton';

export { CustomButton };