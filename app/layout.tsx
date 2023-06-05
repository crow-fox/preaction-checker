import { Noto_Sans_JP as googleNotoSansJP } from "next/font/google";
import Link from "next/link";
import AuthUserAvatar from "@/app/_components/AuthUserAvatar";
import GlobalNav from "@/app/_components/GlobalNav";
import UserProvider from "@/app/_components/UserProvider";
import { appConfig } from "@/app/_consts/appConfig";
import { getHasValidSession } from "@/app/_utils/getHasValidSession";
import "@/app/globals.css";

const inter = googleNotoSansJP({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata = {
  title: appConfig.title,
  description: "アクション前に行うべきことをチェックすることができます。",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasValidSession = await getHasValidSession();

  return (
    <html lang="ja" className="h-full">
      <body
        className={`${inter.className} grid h-full grid-rows-[auto_1fr_auto] break-words leading-normal text-black `}
      >
        <UserProvider>
          <div className=" border-b border-b-black-light py-4 ">
            <div className=" mx-auto box-content grid max-w-container gap-4 px-4">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-bold ">
                  <Link href="/">{appConfig.title}</Link>
                </p>
                <Link href="/auth">
                  <AuthUserAvatar />
                </Link>
              </header>
              {hasValidSession && (
                <div className="-mb-4">
                  <GlobalNav />
                </div>
              )}
            </div>
          </div>
          <div className="py-16">
            <main className="mx-auto box-content max-w-container px-4 ">
              {children}
            </main>
          </div>
          <div className="border-t border-t-black-light py-4">
            <footer className="mx-auto box-content max-w-container px-4 ">
              <p className="flex justify-center">
                <small>©️ 2023 crow-fox</small>
              </p>
            </footer>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
