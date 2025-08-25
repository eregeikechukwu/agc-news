import type { Metadata } from "next";
import "../styles/global.css";
import { euclide } from "../styles/fonts";
import { AppHeader } from "../components/layout";
import { Providers } from "./providers";
import { Footer } from "../components/sections";
import BackDrop from "../components/UI/Backdrop";

export const metadata: Metadata = {
  title: "AGC",
  description:
    "Stay updated with the latest news and insights around Africa on AGC news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${euclide.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen justify-between">
            <AppHeader />
            <main className="container px-padding-general-x">{children}</main>
            <BackDrop />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
