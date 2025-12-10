import Link from "next/link";

export default function IntroPage() {
    return (
        <div className="space-y-12">
            {/* Hero */}
            <section>
                <h1 className="text-4xl md:text-6xl font-display font-black uppercase mb-6">
                    <span className="text-retro-green drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">koin</span>.js
                </h1>
                <p className="text-xl font-mono leading-relaxed max-w-3xl">
                    A batteries-included React component for browser-based retro game emulation.
                    Built on top of{" "}
                    <a
                        href="https://github.com/arianrhodsandlot/nostalgist"
                        className="font-bold border-b-4 border-retro-cyan hover:bg-retro-cyan hover:text-black transition-colors"
                        target="_blank"
                    >
                        Nostalgist.js
                    </a>
                    , adding production-ready features like cloud saves, touch controls,
                    gameplay recording, and RetroAchievements integration.
                </p>
            </section>

            {/* What You Get */}
            <section className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-display font-black uppercase mb-6 border-b-4 border-retro-pink pb-2 inline-block">
                    What You Get
                </h2>
                <div className="grid md:grid-cols-2 gap-6 font-mono text-sm">
                    <div className="space-y-4">
                        <h3 className="font-bold text-retro-green uppercase">Core Emulation</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-retro-pink font-bold">[✓]</span>
                                <span><strong>27 Systems</strong> — NES to PlayStation, Game Boy to Arcade</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-retro-pink font-bold">[✓]</span>
                                <span><strong>Automatic Core Selection</strong> — Detects system from file extension</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-retro-pink font-bold">[✓]</span>
                                <span><strong>BIOS Support</strong> — Flexible mounting (system or ROM folder)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-retro-pink font-bold">[✓]</span>
                                <span><strong>10 CRT Shaders</strong> — Lottes, Geom, zFast, LCD Grid, and more</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-retro-cyan uppercase">Save System</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-retro-cyan font-bold">[✓]</span>
                                <span><strong>Slot-Based Saves</strong> — Multiple save slots with screenshots</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-retro-cyan font-bold">[✓]</span>
                                <span><strong>Auto-Save</strong> — Configurable interval with progress indicator</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-retro-cyan font-bold">[✓]</span>
                                <span><strong>Emergency Saves</strong> — Automatic save on tab close/hide</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-retro-cyan font-bold">[✓]</span>
                                <span><strong>Save Queue</strong> — Prevents corruption from concurrent operations</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-yellow-500 uppercase">Controls</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-500 font-bold">[✓]</span>
                                <span><strong>Touch Controls</strong> — GPU-accelerated virtual D-pad and buttons</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-500 font-bold">[✓]</span>
                                <span><strong>Gamepad Support</strong> — Xbox, PlayStation, Switch detection</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-500 font-bold">[✓]</span>
                                <span><strong>Key Remapping</strong> — Per-system keyboard layouts</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-500 font-bold">[✓]</span>
                                <span><strong>Multi-Touch</strong> — Combo inputs (e.g., diagonal + A+B)</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-purple-400 uppercase">Extras</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400 font-bold">[✓]</span>
                                <span><strong>Gameplay Recording</strong> — VP9 WebM capture at 30fps</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400 font-bold">[✓]</span>
                                <span><strong>RetroAchievements</strong> — Login, unlock tracking, hardcore mode</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400 font-bold">[✓]</span>
                                <span><strong>Rewind</strong> — Go back in time (Tier 1 systems)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400 font-bold">[✓]</span>
                                <span><strong>Speed Control</strong> — 0.5x to 4x playback speed</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Performance Tiers */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-6 border-b-4 border-black pb-2 inline-block">
                    Performance Optimization
                </h2>
                <p className="font-mono mb-6 max-w-2xl">
                    The player automatically applies optimized RetroArch settings based on system complexity:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-4 border-black p-6 bg-retro-green/20">
                        <h3 className="font-display font-bold uppercase text-xl mb-4">
                            Tier 1 — Zero Lag
                        </h3>
                        <p className="font-mono text-sm mb-4">
                            8-bit/16-bit systems get <strong>Run-Ahead</strong> enabled, cutting 1 frame (~16ms)
                            of input latency for near-instant response.
                        </p>
                        <div className="font-mono text-xs bg-black text-retro-green p-3">
                            NES, SNES, Genesis, GB, GBC, Master System, Game Gear, PC Engine, Atari 2600/7800,
                            Lynx, Neo Geo Pocket, WonderSwan
                        </div>
                    </div>
                    <div className="border-4 border-black p-6 bg-retro-pink/20">
                        <h3 className="font-display font-bold uppercase text-xl mb-4">
                            Tier 2 — Max Smoothness
                        </h3>
                        <p className="font-mono text-sm mb-4">
                            32-bit+ systems get <strong>Threaded Video</strong> for smooth, stutter-free gameplay.
                            Rewind is disabled to save memory.
                        </p>
                        <div className="font-mono text-xs bg-black text-retro-pink p-3">
                            PlayStation, N64, GBA, Saturn, Dreamcast, Nintendo DS, PSP, Arcade, DOS, Neo Geo
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="bg-zinc-900 text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-retro-green font-display text-2xl uppercase mb-6">
                    {">"} Get Started_
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <Link
                        href="/docs/installation"
                        className="block border-2 border-retro-green p-4 hover:bg-retro-green hover:text-black transition-colors"
                    >
                        <span className="font-bold block">Installation</span>
                        <span className="text-sm opacity-70">npm install + headers setup</span>
                    </Link>
                    <Link
                        href="/docs/usage"
                        className="block border-2 border-retro-cyan p-4 hover:bg-retro-cyan hover:text-black transition-colors"
                    >
                        <span className="font-bold block">Basic Usage</span>
                        <span className="text-sm opacity-70">Drop-in React component</span>
                    </Link>
                    <Link
                        href="/docs/api"
                        className="block border-2 border-retro-pink p-4 hover:bg-retro-pink hover:text-black transition-colors"
                    >
                        <span className="font-bold block">API Reference</span>
                        <span className="text-sm opacity-70">All 30+ props documented</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
