"use client";

import { useEffect, useRef } from "react";

type Props = {
    dataAdSlot: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
};

export default function AdBanner({
    dataAdSlot,
    dataAdFormat = "auto",
    dataFullWidthResponsive = true,
}: Props) {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            if (adRef.current && (window as any).adsbygoogle) {
                // 중복 로드 방지: 이미 광고가 채워져 있는지 확인
                if (adRef.current.innerHTML === "") {
                    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                }
            }
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    return (
        <div className="my-8 w-full flex justify-center overflow-hidden" ref={adRef}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", width: '100%' }}
                data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            />
        </div>
    );
}
