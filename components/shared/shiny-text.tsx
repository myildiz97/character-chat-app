import { cn } from '@/lib/utils';
import ShinyText from './ShinyText'

interface ShinyTextComponentProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyTextComponent({ text, disabled = false, speed = 3, className = '' }: ShinyTextComponentProps) {
  return (
    <ShinyText 
      text={text} 
      disabled={disabled} 
      speed={speed} 
      className={cn(
        className,
      )} 
    />
  )
}