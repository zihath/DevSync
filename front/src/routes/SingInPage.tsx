import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
      <SignIn path="/sign-in" />
    </div>
  );
};

export default SignInPage;
