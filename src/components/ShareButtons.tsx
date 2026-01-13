"use client";

import React from 'react';
import { Share2, Facebook, Copy } from 'lucide-react';

export default function ShareButtons() {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareTitle = "묘한타로 | AI가 말아주는 소름돋는 운세 🔮";
    const shareDesc = "너의 운명, 3초컷으로 읽어줌. ⚡ AI 점술가가 팩폭 날리는 실시간 타로 맛집.";

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`, '_blank');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(siteUrl).then(() => {
            alert("링크가 복사되었습니다! 🎉 친구에게 공유해보세요.");
        });
    };

    const handleNativeShare = () => {
        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                text: shareDesc,
                url: siteUrl,
            });
        } else {
            copyToClipboard();
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 py-8">
            <p className="text-[#FFD700] text-sm font-bold tracking-widest animate-pulse">
                SHARE YOUR DESTINY
            </p>

            <div className="flex gap-4">
                {/* 페이스북/메타 */}
                <button
                    onClick={shareToFacebook}
                    className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title="페이스북 공유"
                >
                    <Facebook className="text-white fill-current w-6 h-6" />
                </button>

                {/* 네이티브 공유 (모바일용) */}
                <button
                    onClick={handleNativeShare}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title="공유하기"
                >
                    <Share2 className="text-white w-5 h-5" />
                </button>

                {/* 링크 복사 */}
                <button
                    onClick={copyToClipboard}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title="링크 복사"
                >
                    <Copy className="text-white w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
