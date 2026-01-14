"use client";

// Auto-deployment test
import React from 'react';
import TarotReading from '@/components/TarotReading';
import { TAROT_CARDS } from '@/data/tarotCards';
import TarotCard from '@/components/TarotCard';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-start py-4 sm:py-6 md:py-8 px-4 bg-[var(--background)] overflow-hidden">
            {/* Header Section */}
            <header className="text-center space-y-3 sm:space-y-4 max-w-2xl animate-float mb-6 sm:mb-8 z-10">
                <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs sm:text-sm font-bold tracking-wider mb-2 border border-[var(--primary)]/30 backdrop-blur-md">
                    ✨ DAILY FORTUNE
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF007C] to-[#6A0572] leading-tight filter drop-shadow-lg">
                    묘한타로
                </h1>
                <p className="text-base sm:text-lg text-gray-300 font-light tracking-wide px-4">
                    AI가 말아주는 소름돋는 운세
                </p>
            </header>

            {/* Main Reading Area */}
            <section className="w-full max-w-6xl min-h-[500px] sm:min-h-[600px] mb-12 sm:mb-20">
                <TarotReading />
            </section>



            {/* Footer */}
            <footer className="w-full text-center py-8 text-sm text-gray-500 font-medium">
                © 2026 묘한타로. All rights reserved.
            </footer>
        </main>
    );
}
