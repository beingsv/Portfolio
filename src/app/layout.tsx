import type { Metadata } from "next";
import { Nunito, Varela_Round } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { DEFAULT_THEME, THEME_INIT_SCRIPT } from "@/lib/themes";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700", "800", "900"],
});

const varelaRound = Varela_Round({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Shiwam Vishwakarma | Portfolio",
  description: "Full-Stack Engineer · AI Systems · System Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${nunito.variable} ${varelaRound.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the saved palette during HTML parsing, before the first
            paint, so a non-default theme never flashes the default one. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased font-body">
        <CustomCursor />
        <GrainOverlay />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
