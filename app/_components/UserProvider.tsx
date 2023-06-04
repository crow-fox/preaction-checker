import { ReactNode } from "react";
import UserProviderClient from "@/app/_components/UserProviderClient";
import { getUser } from "@/app/_utils/getUser";

type Props = {
  children: ReactNode;
};

export default async function UserProvider({ children }: Props) {
  const user = await getUser();

  return <UserProviderClient user={user}>{children}</UserProviderClient>;
}
