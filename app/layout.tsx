//this is the primary layout file

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

//this give the StreamTheme the layout for mutiple persons
import '@stream-io/video-react-sdk/dist/css/styles.css';

import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

//this meta data details @ import statement is on all 3 layout.tsx files
export const metadata: Metadata = {
  title: "MADHAN's ZOOM",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
          appearance={{
            layout:{
                logoImageUrl: 'icons/yoom-logo.svg',
                socialButtonsVariant: 'iconButton'
            },
            variables:{
              colorText: '#fff',
              colorPrimary: '#0E78F9',
              colorBackground: '#1c1f2e',
              colorInputBackground: '#252a41',
              colorInputText: '#fff'
            }
          }}    
      >
          <body className={`${inter.className} bg-dark-2`}>
            {children}
            <Toaster />
          </body>
      </ClerkProvider>
    </html>
  );
}
