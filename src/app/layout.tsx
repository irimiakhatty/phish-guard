"use client";

import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import ClerkClientProvider from "./_components/ClerkClientProvider";

import { Inter } from "next/font/google";
import { TopNav } from "./_components/topnav";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Server layout: we avoid forcing a 'dark' class here so the ThemeProvider can
// control the document class at client mount. The body uses a helper `.bg-app`
// which is defined in globals.css for both light and dark modes.
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkClientProvider>
      <CSPostHogProvider>
        <html lang="en">
          <body className={`font-sans ${inter.variable} bg-app`}> 
            <div className="grid h-screen grid-rows-[auto,1fr]">
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
              {modal}
            </div>
      {/* UploadThing SSR plugin is temporarily disabled here to avoid
        a build-time server/client validation issue. Re-enable via
        the server -> client wrapper when ready. */}
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkClientProvider>
  );
}
