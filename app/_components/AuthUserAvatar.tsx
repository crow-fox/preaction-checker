import Avatar from "@/app/_components/Avatar";
import { getUser } from "@/app/_utils/getUser";

export default async function AuthUserAvatar() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return <Avatar imgUrl={user.avatar_url} size={48} alt={user.name} />;
}
