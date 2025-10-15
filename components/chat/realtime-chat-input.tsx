import { SendHorizonal } from 'lucide-react';
import { CustomButton } from '../ui/custom/custom-button';
import { CustomInput } from '../ui/custom/custom-input';
import { motion } from 'motion/react';

interface RealtimeChatInputProps {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function RealtimeChatInput({ disabled, value, onChange }: RealtimeChatInputProps) {
  return (
    <div className='flex items-center gap-2 w-full relative'>
      <CustomInput 
        placeholder="Type a message..."
        className="rounded-full bg-background transition-all duration-300 h-12"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type='text'
      />
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        className="absolute right-1"
      >
        <CustomButton
          type="submit"
          disabled={disabled}
          className="aspect-square rounded-full w-10 h-10"
        >
          <SendHorizonal className="size-4" />
        </CustomButton>
      </motion.div>
    </div>
  )
}