"use client";

import React from 'react';
import { TarotCardData } from '@/data/tarotCards';

interface TarotCardProps {
    card: TarotCardData;
    isRevealed?: boolean;
    onClick?: () => void;
}

export default function TarotCard({ card, isRevealed = true, onClick }: TarotCardProps) {
    return (
        <div
            onClick={onClick}
            className="relative w-full h-full perspective-1000 transition-all duration-500"
            style={{ willChange: 'transform' }}
        >
            <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isRevealed ? 'rotate-y-0' : 'rotate-y-180'}`}>

                {/* --- CARD FRONT --- */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-2xl bg-white flex flex-col items-center">
                    <div className="w-full h-3/4 overflow-hidden relative">
                        <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            style={{ willChange: 'auto' }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1e293b/FFD700?text=${card.nameKr}`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    </div>

                    <div className="w-full h-1/4 p-3 flex flex-col justify-center items-center bg-white border-t-2 border-[#FFD700]/30">
                        <div className="text-[#FFD700] text-[10px] font-bold tracking-widest uppercase mb-1 drop-shadow-sm">
                            No.{String(card.id).padStart(2, '0')}
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-gray-800 mb-0.5 tracking-tight">{card.nameKr}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{card.name}</p>
                    </div>

                    {/* Decorative Border */}
                    <div className="absolute inset-2 border border-[#FFD700]/20 rounded-lg pointer-events-none" />
                </div>

                {/* --- CARD BACK --- */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-2xl overflow-hidden p-2 bg-[#0F172A]">
                    {/* Premium Card Back Design */}
                    <div className="w-full h-full rounded-lg border-2 border-[#FFD700]/40 bg-gradient-to-br from-[#1e293b] via-[#0F172A] to-[#1e293b] flex flex-col items-center justify-center relative overflow-hidden">

                        {/* Geometric Pattern Background */}
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }} />

                        {/* Center Emblem */}
                        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 border-2 border-[#FFD700]/60 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
                            <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 text-[#FFD700] fill-current animate-pulse">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>

                        {/* Outer Glow */}
                        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,215,0,0.1)] pointer-events-none" />

                        {/* Decorative Corners */}
                        {[0, 90, 180, 270].map(deg => (
                            <div key={deg} className="absolute w-8 h-8 border-t-2 border-l-2 border-[#FFD700]/30" style={{
                                transform: `rotate(${deg}deg)`,
                                top: deg === 0 || deg === 270 ? '8px' : 'auto',
                                bottom: deg === 90 || deg === 180 ? '8px' : 'auto',
                                left: deg === 0 || deg === 90 ? '8px' : 'auto',
                                right: deg === 180 || deg === 270 ? '8px' : 'auto',
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
