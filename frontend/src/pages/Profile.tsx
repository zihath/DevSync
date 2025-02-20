import { useUser } from '@clerk/clerk-react';

export default function Profile() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return "Loading...";
  }

  if (!isSignedIn) {
    return "Sign in to view this page";
  }

  return `Hello firstname : ${user.firstName}! id :  ${user.id} email : ${user.emailAddresses}`;
}