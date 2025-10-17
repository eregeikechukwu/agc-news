import type { Metadata } from "next";
import "../styles/global.scss";
import { euclide, nunito, montserrat } from "../styles/fonts";
import { AppHeader } from "../components/layout";
import { Providers } from "./providers";
import { Footer } from "../components/sections";
import BackDrop from "../components/UI/Backdrop";
import { metaJson, main_metadata } from "../utils/metadata";
import Script from "next/script";

export const metadata: Metadata = main_metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="googlea264a916086e83a6"
        />
        <Script
          type="application/ld+json"
          id="jsonld"
          dangerouslySetInnerHTML={metaJson()}
        />
      </head>

      <body
        className={` ${nunito.variable} ${montserrat.variable} ${euclide.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen justify-between">
            <AppHeader />
            <main className="container px-padding-general-x-mobile lg:px-padding-general-x">
              {children}
            </main>
            <BackDrop />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
