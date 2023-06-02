import { Metadata } from "next";
import { Noto_Sans_JP as googleNotoSansJP } from "next/font/google";
import GlobalNav from "@/app/_components/GlobalNav";
import "@/app/globals.css";

const inter = googleNotoSansJP({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const _title = "プレアクションチェッカー";

export const metadata: Metadata = {
  title: _title,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body
        className={`${inter.className} grid h-full grid-rows-[auto_1fr_auto] leading-normal text-black`}
      >
        <div className=" border-b border-b-black-light pt-4 ">
          <header className=" mx-auto box-content flex max-w-container flex-wrap items-center justify-between gap-2 px-4">
            <p className="text-lg font-bold ">{_title}</p>
            <div>user</div>
          </header>
          <GlobalNav />
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
      </body>
    </html>
  );
}
