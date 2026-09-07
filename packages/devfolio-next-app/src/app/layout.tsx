import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Preahvihear } from 'next/font/google';
import Header from './components/header/Header';
import BackgroundFX from './components/background/BackgroundFX';
import { SITE_DESCRIPTION, SITE_TITLE } from './components/hero/hero-content';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

const preahvihear = Preahvihear({
  weight: '400', // only one weight exists for this font
  subsets: ['latin'],
  variable: '--font-preahvihear',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${preahvihear.variable} antialiased`}>
        {/* Flip either prop to false to kill that effect site-wide. */}
        <BackgroundFX comets spotlight spotlightSizeRem={15}/>
        <a
          href='#content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white'>
          Skip to content
        </a>
        <Header />
        <main id='content' className='pt-[var(--header-h)]'>
          {children}
        </main>
      </body>
    </html>
  );
}

