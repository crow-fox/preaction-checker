import "@/app/globals.css";

export const metadata = {
  title: "Next.js Tailwindcss App",
  description: "Next.js Tailwindcss App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
