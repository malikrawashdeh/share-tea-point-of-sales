import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => {
    const signedInUser = signIn("google", { callbackUrl: "/" });
  };

  return (
    <Button
      onClick={loginWithGoogle}
      className="w-full bg-blue-600 hover:bg-blue-900 mb-2"
    >
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
