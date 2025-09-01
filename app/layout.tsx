import './globals.css';
import '@coinbase/onchainkit/styles.css';
import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://habitflow.base.app';
  return {
    title: 'HabitFlow',
    description: 'Intelligent reminders for your best habits',
    other: {
      'fc:frame': JSON.stringify({
        version: 'next',
        imageUrl: `${URL}/og-image.png`,
        button: {
          title: 'Launch HabitFlow',
          action: {
            type: 'launch_frame',
            name: 'HabitFlow',
            url: URL,
            splashImageUrl: `${URL}/splash.png`,
            splashBackgroundColor: '#1a1a1a',
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
