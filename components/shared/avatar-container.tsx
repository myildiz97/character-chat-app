import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useUserContext } from '../context/user-context';
import { CustomText } from '../ui/custom/custom-text';

interface IAvatarContainerProps {
  src?: string;
  alt?: string;
  name?: string;
  variant?: 'default' | 'user';
  label?: {
    text?: string;
    show?: boolean;
    direction?: 'row' | 'column';
  };
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function AvatarContainer({ src = "", alt = "", name = "", variant = 'default', label = { text: "", show: false }, size = 'md' }: IAvatarContainerProps) {
  const { user } = useUserContext();

  const avatarSrc = variant === 'user' ? user?.user_metadata?.avatar_url : src;
  const avatarAlt = variant === 'user' ? (user?.user_metadata?.name || "User") : alt;
  const avatarName = variant === 'user' ? (user?.user_metadata?.name?.charAt(0)?.toUpperCase() || "U") : name;
  const avatarLabel = variant === 'user' ? (user?.user_metadata?.name || "You") : label.text;

  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`flex items-center gap-2 ${label.direction === 'column' ? 'flex-col' : 'flex-row'}`}>
      <Avatar className={sizes[size]}>
        <AvatarImage src={avatarSrc} alt={avatarAlt}/>
        <AvatarFallback>{avatarName}</AvatarFallback>
      </Avatar>
      {label.show && <CustomText variant='span'>{avatarLabel}</CustomText>}
    </div>
  )
}