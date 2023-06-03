import { redirect } from "next/navigation";
import { getHasValidSession } from "@/app/_utils/getHasValidSession";

export default async function Home() {
  const hasSession = await getHasValidSession();

  if (!hasSession) {
    redirect("/auth");
  }

  return <div>home</div>;
}
