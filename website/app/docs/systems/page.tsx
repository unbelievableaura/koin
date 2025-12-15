export default function SystemsPage() {
    return (
        <div className="space-y-12">
            <section>
                <h1 className="text-4xl md:text-6xl font-display font-black uppercase mb-6">
                    System Compatibility
                </h1>
                <p className="text-xl font-mono">
                    27 supported systems with automatic core selection.
                </p>
            </section>

            {/* Nintendo */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-[#FF3333] pb-2 inline-block">
                    Nintendo
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full font-mono text-sm border-4 border-black">
                        <thead className="bg-zinc-900 text-white">
                            <tr>
                                <th className="p-3 text-left">System</th>
                                <th className="p-3 text-left">Key</th>
                                <th className="p-3 text-left">Extensions</th>
                                <th className="p-3 text-left">Core</th>
                                <th className="p-3 text-left">BIOS</th>
                                <th className="p-3 text-left">Tier</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y-2 divide-black">
                            <tr>
                                <td className="p-3 font-bold">NES / Famicom</td>
                                <td className="p-3 text-retro-pink">NES</td>
                                <td className="p-3">.nes</td>
                                <td className="p-3">fceumm</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-green">Zero Lag</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Super Nintendo</td>
                                <td className="p-3 text-retro-pink">SNES</td>
                                <td className="p-3">.snes, .smc, .sfc</td>
                                <td className="p-3">snes9x</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-green">Zero Lag</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Nintendo 64</td>
                                <td className="p-3 text-retro-pink">N64</td>
                                <td className="p-3">.n64, .z64, .v64</td>
                                <td className="p-3">mupen64plus_next</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-pink">Smooth</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Game Boy</td>
                                <td className="p-3 text-retro-pink">GB</td>
                                <td className="p-3">.gb</td>
                                <td className="p-3">gambatte</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-green">Zero Lag</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Game Boy Color</td>
                                <td className="p-3 text-retro-pink">GBC</td>
                                <td className="p-3">.gbc</td>
                                <td className="p-3">gambatte</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-green">Zero Lag</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Game Boy Advance</td>
                                <td className="p-3 text-retro-pink">GBA</td>
                                <td className="p-3">.gba</td>
                                <td className="p-3">mgba</td>
                                <td className="p-3 text-zinc-400">Optional</td>
                                <td className="p-3 text-retro-pink">Smooth</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Nintendo DS</td>
                                <td className="p-3 text-retro-pink">NDS</td>
                                <td className="p-3">.nds</td>
                                <td className="p-3">desmume</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-pink">Smooth</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Virtual Boy</td>
                                <td className="p-3 text-retro-pink">VIRTUAL_BOY</td>
                                <td className="p-3">.vb</td>
                                <td className="p-3">mednafen_vb</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-green">Zero Lag</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Sega */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-[#2979FF] pb-2 inline-block">
                    Sega
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full font-mono text-sm border-4 border-black">
                        <thead className="bg-zinc-900 text-white">
                            <tr>
                                <th className="p-3 text-left">System</th>
                                <th className="p-3 text-left">Key</th>
                                <th className="p-3 text-left">Extensions</th>
                                <th className="p-3 text-left">Core</th>
                                <th className="p-3 text-left">BIOS</th>
                                <th className="p-3 text-left">Tier</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y-2 divide-black">
                            <tr>
                                <td className="p-3 font-bold">Master System</td>
                                <td className="p-3 text-retro-cyan">MASTER_SYSTEM</td>
                                <td className="p-3">.sms</td>
                                <td className="p-3">gearsystem</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-green">Zero Lag</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Genesis / Mega Drive</td>
                                <td className="p-3 text-retro-cyan">GENESIS</td>
                                <td className="p-3">.gen, .md, .smd, .bin</td>
                                <td className="p-3">genesis_plus_gx</td>
                                <td className="p-3 text-yellow-600">CD only</td>
                                <td className="p-3 text-retro-green">Zero Lag</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Game Gear</td>
                                <td className="p-3 text-retro-cyan">GAME_GEAR</td>
                                <td className="p-3">.gg</td>
                                <td className="p-3">gearsystem</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-green">Zero Lag</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Saturn</td>
                                <td className="p-3 text-retro-cyan">SATURN</td>
                                <td className="p-3">.cue, .chd, .iso</td>
                                <td className="p-3">yabasanshiro</td>
                                <td className="p-3 text-retro-pink font-bold">Required</td>
                                <td className="p-3 text-retro-pink">Smooth</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Dreamcast</td>
                                <td className="p-3 text-retro-cyan">DREAMCAST</td>
                                <td className="p-3">.cdi, .gdi, .chd</td>
                                <td className="p-3">flycast</td>
                                <td className="p-3 text-retro-pink font-bold">Required</td>
                                <td className="p-3 text-retro-pink">Smooth</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Sony */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-[#448AFF] pb-2 inline-block">
                    Sony
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full font-mono text-sm border-4 border-black">
                        <thead className="bg-zinc-900 text-white">
                            <tr>
                                <th className="p-3 text-left">System</th>
                                <th className="p-3 text-left">Key</th>
                                <th className="p-3 text-left">Extensions</th>
                                <th className="p-3 text-left">Core</th>
                                <th className="p-3 text-left">BIOS</th>
                                <th className="p-3 text-left">Tier</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y-2 divide-black">
                            <tr>
                                <td className="p-3 font-bold">PlayStation</td>
                                <td className="p-3 text-purple-600">PS1</td>
                                <td className="p-3">.iso, .cue, .pbp</td>
                                <td className="p-3">pcsx_rearmed</td>
                                <td className="p-3 text-retro-pink font-bold">Required</td>
                                <td className="p-3 text-retro-pink">Smooth</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">PlayStation Portable</td>
                                <td className="p-3 text-purple-600">PSP</td>
                                <td className="p-3">.iso, .cso</td>
                                <td className="p-3">ppsspp</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-retro-pink">Smooth</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Other */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-black pb-2 inline-block">
                    Other Systems
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full font-mono text-sm border-4 border-black">
                        <thead className="bg-zinc-900 text-white">
                            <tr>
                                <th className="p-3 text-left">System</th>
                                <th className="p-3 text-left">Key</th>
                                <th className="p-3 text-left">Core</th>
                                <th className="p-3 text-left">BIOS</th>
                                <th className="p-3 text-left">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y-2 divide-black">
                            <tr>
                                <td className="p-3 font-bold">PC Engine / TurboGrafx-16</td>
                                <td className="p-3">PC_ENGINE</td>
                                <td className="p-3">mednafen_pce_fast</td>
                                <td className="p-3 text-yellow-600">CD only</td>
                                <td className="p-3 text-xs">syscard3.pce for CD games</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Neo Geo</td>
                                <td className="p-3">NEOGEO</td>
                                <td className="p-3">fbalpha2012_neogeo</td>
                                <td className="p-3 text-retro-pink font-bold">Required</td>
                                <td className="p-3 text-xs">neogeo.zip in ROM folder</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Neo Geo Pocket (Color)</td>
                                <td className="p-3">NEOGEO_POCKET</td>
                                <td className="p-3">mednafen_ngp</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-xs">.ngp, .ngc</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Atari 2600</td>
                                <td className="p-3">ATARI_2600</td>
                                <td className="p-3">stella</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-xs">.a26</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Atari 7800</td>
                                <td className="p-3">ATARI_7800</td>
                                <td className="p-3">prosystem</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-xs">.a78</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Atari Lynx</td>
                                <td className="p-3">LYNX</td>
                                <td className="p-3">handy</td>
                                <td className="p-3 text-retro-pink font-bold">Required</td>
                                <td className="p-3 text-xs">lynxboot.img</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">WonderSwan (Color)</td>
                                <td className="p-3">WONDERSWAN</td>
                                <td className="p-3">mednafen_wswan</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-xs">.ws, .wsc</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Commodore 64</td>
                                <td className="p-3">C64</td>
                                <td className="p-3">vice_x64</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-xs">.d64, .t64, .tap, .prg</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">MS-DOS</td>
                                <td className="p-3">DOS</td>
                                <td className="p-3">dosbox_pure</td>
                                <td className="p-3 text-zinc-400">—</td>
                                <td className="p-3 text-xs">.zip, .exe</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-bold">Arcade (FBNeo)</td>
                                <td className="p-3">ARCADE</td>
                                <td className="p-3">fbneo</td>
                                <td className="p-3 text-yellow-600">Varies</td>
                                <td className="p-3 text-xs">ROM filename critical</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* BIOS Note */}
            <section className="border-4 border-black p-6 bg-zinc-100">
                <h3 className="font-display font-bold uppercase text-xl mb-4">BIOS Files Reference</h3>
                <div className="font-mono text-sm space-y-2">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="font-bold">PlayStation:</span>
                        <span>scph5500.bin, scph5501.bin, scph5502.bin, scph1001.bin</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="font-bold">Saturn:</span>
                        <span>sega_101.bin, mpr-17933.bin</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="font-bold">Dreamcast:</span>
                        <span>dc_boot.bin, dc_flash.bin</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="font-bold">Sega CD:</span>
                        <span>bios_CD_U.bin, bios_CD_E.bin, bios_CD_J.bin</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="font-bold">PC Engine CD:</span>
                        <span>syscard3.pce</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="font-bold">Neo Geo:</span>
                        <span>neogeo.zip (place in ROM folder)</span>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                        <span className="font-bold">Atari Lynx:</span>
                        <span>lynxboot.img</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
