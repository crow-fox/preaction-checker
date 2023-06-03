import Avatar from "@/app/_components/Avatar";
import { getUser } from "@/app/_utils/getUser";

export default async function AccountData() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <dl className="">
      <div className="-mt-[1px] flex flex-wrap gap-2 border-y border-y-slate-300 px-2 py-2  first:mt-0 ">
        <dt className=" flex-[0_0_6rem] font-bold">名前</dt>
        <dd className=" min-w-[70%] flex-[999_0_0]">{user.name}</dd>
      </div>
      <div className="-mt-[1px] flex flex-wrap gap-2 border-y border-y-slate-300 px-2  py-2 ">
        <dt className=" flex-[0_0_6rem] font-bold">メール</dt>
        <dd className=" min-w-[70%] flex-[999_0_0]">{user?.email}</dd>
      </div>
      <div className="-mt-[1px] flex flex-wrap gap-2 border-y border-y-slate-300 px-2  py-2 ">
        <dt className=" flex-[0_0_6rem] font-bold">アバター</dt>
        <dd className=" min-w-[70%] flex-[999_0_0]">
          <Avatar
            imgUrl={user.avatar_url}
            size={80}
            alt={`${user.name}のアバター画像`}
          />
        </dd>
      </div>
    </dl>
  );
}
