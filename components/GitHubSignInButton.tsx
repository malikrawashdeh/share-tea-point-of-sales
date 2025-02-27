import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

interface GitHubSignInButtonProps {
  children: ReactNode;
}
const GitHubSignInButton: FC<GitHubSignInButtonProps> = ({ children }) => {
  const loginWithGitHub = () => signIn("github", { callbackUrl: "/" });

  return (
    <Button
      onClick={loginWithGitHub}
      className="w-full bg-black hover:bg-blue-900"
    >
      {children}
    </Button>
  );
};

export default GitHubSignInButton;
