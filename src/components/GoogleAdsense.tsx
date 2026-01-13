"use client";

import Script from "next/script";

type Props = {
    pId: string;
};

export default function GoogleAdsense({ pId }: Props) {
    if (process.env.NODE_ENV !== "production") {
        // 개발 모드에서는 광고 스크립트를 로드하지 않음 (선택 사항)
        // return null; 
    }

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
