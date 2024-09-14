"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { storeOrUpdateUser, ClerkUser } from "../lib/user-management";

export function AuthChangeHandler() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const clerkUser: ClerkUser = {
        id: user.id,
        emailAddresses: user.emailAddresses.map((email) => ({
          emailAddress: email.emailAddress,
        })),
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        externalAccounts: user.externalAccounts.map((account) => ({
          provider: account.provider,
          externalId: account.externalId,
        })),
      };
      storeOrUpdateUser(clerkUser);
    }
  }, [isLoaded, user]);

  return null;
}
