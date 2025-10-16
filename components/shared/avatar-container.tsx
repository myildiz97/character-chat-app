import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useUserContext } from '../context/user-context';
import { CustomText } from '../ui/custom/custom-text';
import Image from 'next/image';

interface IAvatarContainerProps {
  src?: string;
  alt?: string;
  name?: string;
  variant?: 'default' | 'user' | 'character';
  label?: {
    text?: string;
    show?: boolean;
    direction?: 'row' | 'column';
    type?: 'short' | 'long';
  };
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  width?: number;
  height?: number;
}

export function AvatarContainer({ src = "", alt = "", name = "", variant = 'default', label = { text: "", show: false, type: 'long' }, size = 'md', className = "", width, height }: IAvatarContainerProps) {
  const { user } = useUserContext();

  if (variant === 'character') {
    return (
      <Image
        src={src || ""}
        alt={alt || ""}
        fill={!width && !height}
        width={width}
        height={height}
        className="aspect-square object-cover sm:object-contain"
        unoptimized
      />
    )
  }

  const avatarSrc = variant === 'user' ? user?.user_metadata?.avatar_url : src;
  const avatarAlt = variant === 'user' ? (user?.user_metadata?.name || "User") : alt;
  const avatarName = variant === 'user' ? (user?.user_metadata?.name?.charAt(0)?.toUpperCase() || "U") : name;
  const avatarLabel = variant === 'user' ? (label.type === 'long' ? user?.user_metadata?.name || "You" : "You") : label.text;

  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`flex items-center justify-center gap-1 ${label.direction === 'column' ? 'flex-col' : 'flex-row'} ${className}`}>
      <Avatar className={sizes[size]}>
        <AvatarImage src={avatarSrc} alt={avatarAlt}/>
        <AvatarFallback>{avatarName}</AvatarFallback>
      </Avatar>
      {label.show && (
        <>
          <CustomText variant='span' className='text-center'>{avatarLabel}</CustomText>
        </>
      )}
    </div>
  )
}