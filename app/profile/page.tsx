"use client";

import { useUser } from "@clerk/nextjs";

export default function Profile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      {/* Add more profile information here */}
    </div>
  );
}
