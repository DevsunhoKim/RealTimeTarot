"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TAROT_CARDS, TarotCardData } from '@/data/tarotCards';
import TarotCard from './TarotCard';
import AdBanner from './AdBanner'; // Import AdBanner
import ShareButtons from './ShareButtons'; // Import ShareButtons
import { generateTarotReading } from '@/utils/tarotReadingGenerator';

const TOTAL_CARDS = 22;
type ReadingStep = 'intro' | 'shuffling' | 'spread' | 'selecting' | 'transitioning' | 'revealing';

export default function TarotReading() {
    const [step, setStep] = useState<ReadingStep>('intro');
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [finalCards, setFinalCards] = useState<TarotCardData[]>([]);
    const [mounted, setMounted] = useState(false);
    const [aiReading, setAiReading] = useState("");
    const [isReadingLoading, setIsReadingLoading] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (step === 'revealing' && finalCards.length === 3) {
            const fetchReading = async () => {
                setIsReadingLoading(true);
                setAiReading("");
                
                try {
                    // API를 먼저 시도
                    const response = await fetch('/api/tarot-reading', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cards: finalCards })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.reading) {
                            setAiReading(data.reading);
                            setIsReadingLoading(false);
                            return;
                        }
                    }
                } catch (error) {
                    console.log("API 호출 실패, 클라이언트 사이드 생성으로 폴백:", error);
                }

                // API 실패 시 클라이언트 사이드에서 운세 생성 (토큰 소진 없음)
                try {
                    const reading = generateTarotReading(finalCards);
                    setAiReading(reading);
                } catch (error: any) {
                    console.error("Failed to generate reading", error);
                    setAiReading("운명을 읽어오는데 실패했습니다. 다시 시도해주세요.");
                } finally {
                    setIsReadingLoading(false);
                }
            };
            
            setTimeout(fetchReading, 2000);
        }
    }, [step, finalCards]);

    // Scroll to top on revealing
    useEffect(() => {
        if (step === 'revealing') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [step]);

    const startReading = () => {
        setStep('shuffling');
        setTimeout(() => {
            setStep('spread');
            setTimeout(() => setStep('selecting'), 1000);
        }, 2000);
    };

    const handleCardSelect = (index: number) => {
        if (step !== 'selecting' || selectedIndices.includes(index) || selectedIndices.length >= 3) return;

        const newSelected = [...selectedIndices, index];
        setSelectedIndices(newSelected);

        if (newSelected.length === 3) {
            setTimeout(() => {
                setStep('transitioning');
                const selectedCards = newSelected.map(idx => TAROT_CARDS[idx % TAROT_CARDS.length]);
                setFinalCards(selectedCards);
                setTimeout(() => setStep('revealing'), 3000);
            }, 800);
        }
    };

    const getCardStyle = (index: number) => {
        const isMobile = windowSize.width < 640;
        const isTablet = windowSize.width >= 640 && windowSize.width < 768;
        const columns = isMobile ? 4 : isTablet ? 6 : 11;
        const spacingX = isMobile ? 50 : isTablet ? 65 : 85;
        const spacingY = isMobile ? 75 : isTablet ? 100 : 130;

        const col = index % columns;
        const row = Math.floor(index / columns);

        // 중앙 정렬을 위한 offset 계산
        const xOffset = (col - (columns - 1) / 2) * spacingX;
        const yOffset = (row - (isMobile ? 1.5 : isTablet ? 1 : 0.5)) * spacingY;

        return {
            x: xOffset,
            y: yOffset,
            rotate: (col - (columns - 1) / 2) * (isMobile ? 3 : isTablet ? 3.5 : 2)
        };
    };

    const resetReading = () => {
        setSelectedIndices([]);
        setFinalCards([]);
        setAiReading("");
        setStep('intro');
    };

    if (!mounted) return <div className="min-h-screen bg-black" />;

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-[var(--background)] overflow-x-hidden relative">

            {/* --- Left Side Ad (Desktop Only) --- */}
            <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 w-[160px] h-[600px] z-50 flex-col items-center justify-center">
                <div className="w-full h-full bg-white/5 border border-white/10 rounded-lg overflow-hidden relative">
                    <p className="text-white/20 text-[10px] absolute top-1 left-1/2 -translate-x-1/2 w-full text-center">Ad</p>
                    <AdBanner dataAdSlot="LEFT_SIDE_ID" dataAdFormat="vertical" />
                </div>
            </div>

            {/* --- Right Side Ad (Desktop Only) --- */}
            <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 w-[160px] h-[600px] z-50 flex-col items-center justify-center">
                <div className="w-full h-full bg-white/5 border border-white/10 rounded-lg overflow-hidden relative">
                    <p className="text-white/20 text-[10px] absolute top-1 left-1/2 -translate-x-1/2 w-full text-center">Ad</p>
                    <AdBanner dataAdSlot="RIGHT_SIDE_ID" dataAdFormat="vertical" />
                </div>
            </div>

            {/* 0. DRAMATIC FLASH OVERLAY */}
            <AnimatePresence>
                {step === 'transitioning' && (
                    <motion.div
                        key="flash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
                        className="fixed inset-0 z-[300] bg-white flex flex-col items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="text-3xl md:text-5xl font-extrabold text-[#FFD700] tracking-widest drop-shadow-2xl text-center px-4"
                            style={{ textShadow: "0 0 20px rgba(255,215,0,0.8)" }}
                        >
                            ⚡ 소름 돋을 준비 되셨나요?
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. HEADER */}
            <div className="w-full h-[120px] flex items-center justify-center shrink-0 z-50">
                <AnimatePresence mode="wait">
                    {step === 'selecting' ? (
                        <motion.div
                            key="msg-select"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center px-4"
                        >
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                                ✨ 너의 직관을 믿고 3장만 골라봐
                            </h2>
                            <div className="flex gap-2 justify-center">
                                {[0, 1, 2].map(i => (
                                    <div key={i}
                                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 border border-white/30 
                                        ${i < selectedIndices.length ? 'bg-[#FFD700]' : 'bg-white/10'}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ) : (step === 'shuffling' || step === 'spread') ? (
                        <motion.div
                            key="msg-shuffle"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-lg sm:text-xl font-bold text-[var(--primary)] animate-pulse tracking-widest px-4"
                        >
                            🌀 본격 운명 셔플 중...
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            {/* 2. CARD STAGE */}
            <div className="relative w-full flex-grow flex items-center justify-center">

                {/* Intro Group */}
                {step === 'intro' && (
                    <>
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="cursor-pointer relative z-10 mb-8"
                                onClick={startReading}
                            >
                            <div className="relative w-36 h-52 sm:w-40 sm:h-60 md:w-56 md:h-80 mx-auto group perspective-1000">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 rounded-xl shadow-2xl border border-[var(--primary)]/40 bg-[#0F172A]"
                                        style={{
                                            zIndex: -i,
                                            transform: `translateZ(${-i * 5}px) translateY(${-i * 5}px)`,
                                            backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
                                        }}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="w-full h-full border-2 border-[#FFD700] rounded-xl flex items-center justify-center opacity-50">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#FFD700] rotate-45" />
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer" onClick={startReading}>
                                    <span className="bg-black/60 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-[#FFD700] font-bold border border-[#FFD700] animate-pulse backdrop-blur-md shadow-[0_0_15px_rgba(255,215,0,0.5)] text-sm sm:text-base active:scale-95 transition-transform">
                                        🔮 복채는 공짜! 시작하기
                                    </span>
                                </div>
                            </div>
                            </motion.div>

                            {/* Share Buttons */}
                            <div className="z-10 mb-20">
                                <ShareButtons />
                            </div>
                        </div>

                        {/* Intro Page Ad Banner */}
                        <div className="absolute bottom-4 left-0 w-full flex justify-center z-50 px-4">
                            <div className="w-full max-w-[728px] h-[90px] bg-white/5 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                                <p className="text-white/20 text-xs absolute">Sponsored</p>
                                <AdBanner dataAdSlot="INTRO_PAGE_SLOT_ID" />
                            </div>
                        </div>
                    </>
                )}

                {/* Main Cards Loop */}
                {(step === 'shuffling' || step === 'spread' || step === 'selecting' || step === 'transitioning') && Array.from({ length: TOTAL_CARDS }).map((_, i) => {
                    const layout = getCardStyle(i);
                    const isSelected = selectedIndices.includes(i);
                    const isFull = selectedIndices.length === 3;
                    const cardKey = `card-${step}-${i}`;

                    return (
                        <motion.div
                            key={cardKey}
                            initial={step === 'spread' || step === 'selecting' ? { ...layout, scale: 0, opacity: 0 } : { x: 0, y: 0, scale: 0, opacity: 0 }}
                            animate={
                                step === 'shuffling' ? {
                                    x: Math.cos(i) * 10,
                                    y: Math.sin(i) * 10,
                                    rotate: i * 360 + 180,
                                    scale: 1,
                                    opacity: 1,
                                    transition: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                                } : step === 'transitioning' ? {
                                    x: isSelected ? 0 : layout.x * 5,
                                    y: isSelected ? 0 : layout.y * 5,
                                    scale: isSelected ? 2 : 0,
                                    opacity: isSelected ? 1 : 0,
                                    rotate: isSelected ? 360 : 0,
                                    zIndex: isSelected ? 200 : 0,
                                    transition: { duration: 1.5, ease: "easeInOut" }
                                } : {
                                    ...layout,
                                    scale: 1,
                                    opacity: 1,
                                    transition: step === 'spread' ? { type: 'spring', stiffness: 50, damping: 15, delay: i * 0.02 } : { duration: 0.3 }
                                }
                            }
                            whileHover={step === 'selecting' && !isSelected && !isFull ? {
                                scale: 1.15,
                                y: layout.y - 20,
                                zIndex: 100,
                                transition: { type: 'tween', ease: "backOut", duration: 0.3 }
                            } : {}}
                            onClick={() => handleCardSelect(i)}
                            className={`absolute cursor-pointer transition-shadow duration-300
                                ${isSelected ? 'ring-4 ring-[#FFD700] shadow-[0_0_30px_#FFD700] rounded-xl z-50' : ''}
                                ${step === 'selecting' && !isSelected && !isFull ? 'hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]' : ''}
                            `}
                            style={{ willChange: step === 'selecting' ? 'transform' : 'auto' }}
                        >
                            <div className="w-14 h-20 sm:w-16 sm:h-24 md:w-28 md:h-44">
                                <TarotCard
                                    card={TAROT_CARDS[i % TAROT_CARDS.length]}
                                    isRevealed={false}
                                />
                            </div>
                        </motion.div>
                    );
                })}

                {/* Revelation Step */}
                {step === 'revealing' && (
                    <div className="w-full max-w-6xl px-4 py-12 flex flex-col items-center gap-12 sm:gap-16">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.8 } }
                            }}
                            className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 w-full px-4"
                        >
                            {finalCards.map((card, idx) => (
                                <motion.div
                                    key={`final-${idx}`}
                                    variants={{
                                        hidden: { opacity: 0, y: 50, scale: 0.8 },
                                        visible: {
                                            opacity: 1, y: 0, scale: 1,
                                            transition: { type: 'spring', stiffness: 40, damping: 12 }
                                        }
                                    }}
                                    className="flex flex-col items-center bg-white/5 backdrop-blur-xl p-4 sm:p-6 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl w-full sm:w-[280px] md:w-[300px]"
                                >
                                    <div className="text-[#FFD700] font-bold text-base sm:text-lg mb-4 sm:mb-6 tracking-[0.2em] uppercase">
                                        {idx === 0 ? 'Past' : idx === 1 ? 'Present' : 'Future'}
                                    </div>

                                    <div className="relative w-full aspect-[2/3] max-w-[200px] sm:max-w-[240px] mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                                        <TarotCard card={card} isRevealed={true} />
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">{card.nameKr}</h3>
                                    <p className="text-gray-400 text-xs sm:text-sm">{card.name}</p>
                                    <p className="text-gray-300 mt-3 sm:mt-4 text-center leading-relaxed text-xs sm:text-sm px-2">
                                        {card.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* AI Interpretation Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2, duration: 1 }}
                            className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl md:rounded-3xl border border-[#FFD700]/30 p-6 md:p-8 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden mb-8 md:mb-10"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />

                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#FFD700] mb-6 md:mb-8 text-center drop-shadow-lg flex items-center justify-center gap-2 md:gap-3">
                                <span className="text-3xl md:text-4xl">🔮</span> 운명의 심층 해석
                            </h3>

                            <div className="min-h-[200px] text-gray-200 leading-7 md:leading-8 text-base md:text-lg font-light tracking-wide whitespace-pre-wrap">
                                {isReadingLoading ? (
                                    <div className="flex flex-col items-center justify-center space-y-4 py-10">
                                        <div className="w-12 h-12 border-4 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin" />
                                        <p className="text-[#FFD700] animate-pulse text-center px-4">우주의 기운을 모아 운명을 해석하고 있습니다...</p>
                                    </div>
                                ) : aiReading ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="text-base md:text-lg leading-relaxed"
                                    >
                                        {aiReading}
                                    </motion.div>
                                ) : (
                                    <p className="text-center text-gray-400 opacity-60 text-sm px-4">
                                        운명을 읽는 중입니다...
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Result Page Share Buttons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 4.5 }}
                            className="z-10"
                        >
                            <ShareButtons />
                        </motion.div>

                        {/* Google AdSens Unit */}
                        <div className="w-full max-w-4xl mx-auto mb-12 min-h-[100px] flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                            <p className="text-white/20 text-sm absolute">Advertisement</p>
                            <AdBanner dataAdSlot="1234567890" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}
                            className="mt-12 md:mt-16 text-center"
                        >
                            <button
                                onClick={resetReading}
                                className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-extrabold text-base md:text-lg rounded-full shadow-[0_0_20px_#FFD700] hover:scale-105 active:scale-95 transition-transform"
                            >
                                다시 뽑기
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
