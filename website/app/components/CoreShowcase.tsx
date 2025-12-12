"use client";

import React, { useState } from "react";
import { GamePlayer as KoinPlayer, SYSTEMS } from "koin.js";
import { HOMEBREW_GAMES } from "../data/homebrew-games";
import { createPortal } from "react-dom";

const systemMap = new Map(SYSTEMS.map((s) => [s.key, s]));

export default function CoreShowcase() {
    const [activeGameIndex, setActiveGameIndex] = useState<number | null>(null);

    const handlePlay = (index: number) => {
        setActiveGameIndex(index);
    };

    const handleClose = () => {
        setActiveGameIndex(null);
    };

    const activeGame = activeGameIndex !== null ? HOMEBREW_GAMES[activeGameIndex] : null;
    const activeSystem = activeGame ? systemMap.get(activeGame.systemId) : null;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-black font-display uppercase border-b-4 border-black pb-4">
                Interactive Core Showcase
            </h2>
            <p className="font-mono mb-8">
                Test our supported cores directly in your browser with these legal homebrew
                titles. Click "Launch" to start the emulator in a modal.
            </p>

            {/* Grid of Games */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {HOMEBREW_GAMES.map((game, index) => {
                    const sys = systemMap.get(game.systemId);
                    if (!sys) return null;

                    return (
                        <div
                            key={`${game.systemId} -${index} `}
                            className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col"
                        >
                            {/* Header */}
                            <div
                                className={`p - 3 border - b - 2 border - black flex items - center justify - between bg - zinc - 100`}
                                style={{
                                    backgroundColor: sys.accentHex ? `${sys.accentHex} 20` : undefined // slight tint
                                }}
                            >
                                <div className="font-bold font-mono text-sm uppercase">
                                    {sys.key}
                                </div>
                                <div className="w-3 h-3 rounded-full border-2 border-black bg-red-500"></div>
                            </div>

                            {/* Content Area */}
                            <div className="relative aspect-[4/3] bg-zinc-900 flex items-center justify-center overflow-hidden">
                                <div className="text-center p-6 space-y-4 w-full h-full flex flex-col items-center justify-center">
                                    <div className="font-display font-black text-white text-xl tracking-wider">
                                        {game.title}
                                    </div>
                                    <div className="text-zinc-500 font-mono text-xs">
                                        {sys.label}
                                    </div>
                                    <button
                                        onClick={() => handlePlay(index)}
                                        className="mt-4 px-6 py-2 bg-retro-green text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all uppercase font-mono text-sm"
                                    >
                                        Launch
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 p-6 border-2 border-dashed border-zinc-400 bg-zinc-50 font-mono text-sm text-zinc-600">
                <p>
                    <strong>Note:</strong> All games showcased here are strictly homebrew demos or public domain software sourced from the Libretro buildbot assets.
                    They are used solely for demonstrating the capabilities of the emulation cores.
                </p>
            </div>

            {/* Modal Player */}
            {activeGame && activeSystem && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
                    <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex flex-col bg-black border-4 border-zinc-800 shadow-2xl">
                        {/* Header Bar */}
                        <div className="flex items-center justify-between p-2 bg-zinc-900 border-b border-zinc-800 text-white font-mono text-sm">
                            <div className="flex items-center gap-2">
                                <span className={`w - 3 h - 3 rounded - full`} style={{ backgroundColor: activeSystem.accentHex }}></span>
                                <span>{activeGame.title}</span>
                                <span className="text-zinc-500">/</span>
                                <span className="text-zinc-400">{activeSystem.key}</span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="hover:bg-red-600 hover:text-white px-3 py-1 transition-colors uppercase font-bold text-xs border border-zinc-700 hover:border-red-500"
                            >
                                [ESC] Close
                            </button>
                        </div>

                        {/* Player Container */}
                        <div className="flex-1 relative bg-black overflow-hidden">
                            <KoinPlayer
                                key={activeGameIndex}
                                system={activeGame.systemId}
                                romUrl={activeGame.file}
                                romId={`homebrew - ${activeGame.systemId} -${activeGameIndex} `}
                                title={activeGame.title}
                                core={activeGame.core}
                                onExit={handleClose}
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
