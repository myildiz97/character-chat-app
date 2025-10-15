import { signInWithGoogle } from '@/lib/actions/auth-actions';
import { CustomButton } from '../ui/custom/custom-button';
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignin() {
  const handleLoginWithGoogle = async () => {
    await signInWithGoogle();
  }

  return (
    <CustomButton onClick={handleLoginWithGoogle}>
      <FcGoogle className='size-6' />
      Continue with Google
    </CustomButton>
  )
}