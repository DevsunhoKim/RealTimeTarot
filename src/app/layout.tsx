import type { Metadata } from 'next';
import './globals.css';
import GoogleAdsense from '@/components/GoogleAdsense';

export const metadata: Metadata = {
    title: "묘한타로 | AI가 말아주는 소름돋는 운세 🔮",
    description: "너의 운명, 3초컷으로 읽어줌. ⚡ AI 점술가가 팩폭 날리는 실시간 타로 맛집. #타로 #운세 #AI점술 #소름주의",
    robots: "index, follow",
    other: {
        "google-adsense-account": "ca-pub-6511690334281912",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body>
                <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ""} />
                {children}
            </body>
        </html>
    );
}
