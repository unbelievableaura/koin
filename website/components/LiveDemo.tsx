"use client";

import dynamic from 'next/dynamic';

// Dynamically import GamePlayer to avoid SSR issues
const GamePlayer = dynamic(
    () => import('koin.js').then((mod) => mod.GamePlayer),
    {
        ssr: false,
        loading: () => (
            <div className="w-full aspect-video bg-zinc-900 border-4 border-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-pulse text-retro-green font-display text-2xl">
                        LOADING EMULATOR...
                    </div>
                    <div className="font-mono text-zinc-500 text-sm">
                        Initializing WASM cores
                    </div>
                </div>
            </div>
        )
    }
);

export function LiveDemo() {
    return (
        <div className="relative w-full aspect-video border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-zinc-900">
            <GamePlayer
                romId="demo-flappybird"
                romUrl="/flappybird.nes"
                system="NES"
                title="Flappy Bird (NES Homebrew)"
                systemColor="#FF3333"
            />
        </div>
    );
}
