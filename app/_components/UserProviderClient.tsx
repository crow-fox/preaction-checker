"use client";
import { ReactNode, createContext, useContext } from "react";
import { User } from "@/app/_types/user";

type Props = {
  user: User | undefined;
  children: ReactNode;
};

const UserContext = createContext<User | undefined>(undefined);

export default function UserProviderClient({ user, children }: Props) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const user = useContext(UserContext);

  return user;
};
