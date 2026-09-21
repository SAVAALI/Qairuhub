import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QAIRU Hub — Project Board",
  description: "Discover student projects and build your next team.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
