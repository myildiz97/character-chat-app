import { cn } from '@/lib/utils'
import { IChatMessage } from '@/lib/types/chat'
import { ICharacterDB } from '@/lib/types/character'
import { useUserContext } from '../context/user-context'
import LoadingThreeDotsJumping from '../shared/jumping-dots'

interface ChatMessageItemProps {
  message: IChatMessage;
  character: ICharacterDB;
  isOwnMessage: boolean;
  showHeader: boolean;
}

export const ChatMessageItem = ({ message, character, isOwnMessage, showHeader }: ChatMessageItemProps) => {
  return (
    <div className={`flex mt-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={cn('max-w-[75%] w-fit flex flex-col gap-1', {
          'items-end': isOwnMessage,
        })}
      >
        {showHeader && <ChatMessageHeader message={message} isOwnMessage={isOwnMessage} character={character} />}
        <div
          className={cn(
            'py-2 px-3 rounded-xl text-sm w-fit',
            isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}

const ChatMessageHeader = ({ message, isOwnMessage, character }: { message: IChatMessage, isOwnMessage: boolean, character: ICharacterDB }) => {
  const { user } = useUserContext();
  
  const name = message.role === 'user' ? user?.email?.split('@')[0] : character.name;
  return (
    <div className={cn('flex items-center gap-2 text-xs px-3', {
      'justify-end flex-row-reverse': isOwnMessage,
    })}>
      <span className={'font-medium'}>{name}</span>
      <span className="text-foreground/50 text-xs">
        {new Date(message.created_at).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}
      </span>
    </div>
  )
}

export const ChatMessageItemWaitingForResponse = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%] w-fit flex flex-col gap-1">
        <div className="py-2 px-3 rounded-xl text-sm w-fit bg-muted text-foreground">
          <LoadingThreeDotsJumping />
        </div>
      </div>
    </div>
  )
}