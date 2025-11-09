import type { Metadata, Viewport } from 'next';
import './globals.css';

const isProd = process.env.NODE_ENV === 'production';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (isProd ? 'https://smallsteadycodes.github.io' : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '프리랜서 개발자 이은진',
    template: '%s | 이은진 포트폴리오',
  },
  description:
    'Java & Python 기반 ERP·공공 시스템 프리랜서 개발자 포트폴리오',
  openGraph: {
    title: '프리랜서 개발자 이은진',
    description:
      'ERP·공공 시스템 중심 프리랜서 개발자 이은진의 포트폴리오입니다. Java와 Python 기반의 안정적인 시스템 개발 및 성능 최적화를 수행합니다.',
    url: siteUrl,
    siteName: 'Eunjin Lee Portfolio',
    images: [{ url: '/preview.jpg', width: 600, height: 600, alt: '이은진 프로필' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '프리랜서 개발자 이은진',
    description:
      'Java & Python 기반 ERP·공공 시스템 프리랜서 개발자 포트폴리오',
    images: ['/preview.jpg'],
    creator: '@smallsteadycode',
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
