import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/utils/sessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Website',
  description:
    'Created by vaarun-kamath(Github), vaarun-c(Github), RockerBot(Github) and VishalMGodi(Github)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>E-Commerce-Website</title>
      </head>
      <body className={inter.className + ' vsc-initialized'}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
