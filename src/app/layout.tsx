import type { Metadata } from "next";
import { Nunito, Varela_Round } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
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
    <html lang="en" className={`${nunito.variable} ${varelaRound.variable}`}>
      <body className="antialiased font-body">
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
