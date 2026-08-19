import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { SavedProvider } from "@/context/SavedContext";

export const metadata: Metadata = {
  title: "UPSC Desk — Personal Current Affairs Hub",
  description:
    "Private UPSC CSE dashboard aggregating news from gov.in, RBI, UN, environment & judiciary sources.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UPSC Desk",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c45c00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SavedProvider>
          <AppShell>{children}</AppShell>
        </SavedProvider>
      </body>
    </html>
  );
}
