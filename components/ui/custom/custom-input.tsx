import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { Input } from '../input';

interface CustomInputProps extends React.ComponentProps<"input"> {
  className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ className, ...props }, ref) => {
  return (
    <Input className={cn(className)} ref={ref} {...props} />
  )
})

CustomInput.displayName = 'CustomInput';

export { CustomInput };