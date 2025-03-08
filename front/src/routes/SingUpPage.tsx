import { SignUp } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="h-screen w-full bg-black text-white flex items-center justify-center">
      <img src="/bg.svg" alt="bg" className="absolute object-cover w-full" />
      <SignUp path="/sign-up" />
    </div>
  );
};

export default SignInPage;
