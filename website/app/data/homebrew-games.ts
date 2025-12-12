export interface HomebrewGame {
    systemId: string;
    title: string;
    file: string;
    core?: string;
}

const BASE_URL = 'https://buildbot.libretro.com/assets/cores';
const CORS_PROXY = 'https://corsproxy.io/?';

// Helper to wrap URL in proxy
const proxied = (path: string) => `${CORS_PROXY}${encodeURIComponent(path)}`;

export const HOMEBREW_GAMES: HomebrewGame[] = [
    // ============ Nintendo ============
    {
        systemId: 'NES',
        title: 'Lala The Magical',
        file: 'https://raw.githubusercontent.com/retrobrews/nes-games/master/lala.nes',
    },
    {
        systemId: 'SNES',
        title: 'Astrohawk',
        file: 'https://raw.githubusercontent.com/retrobrews/snes-games/master/astrohawk.smc',
    },
    {
        systemId: 'GBC',
        title: 'Blastah',
        file: 'https://raw.githubusercontent.com/retrobrews/gbc-games/master/blastah.gb',
    },
    {
        systemId: 'GBA',
        title: 'A Werewolf Tale',
        file: 'https://raw.githubusercontent.com/retrobrews/gba-games/master/awerewolftale.gba',
    },
    {
        systemId: 'GB',
        title: 'Deadeus',
        file: proxied(`${BASE_URL}/Nintendo - GameBoy/Deadeus.gb`),
    },
    // ============ Sega ============
    {
        systemId: 'GENESIS',
        title: 'Old Towers',
        file: 'https://raw.githubusercontent.com/retrobrews/md-games/master/oldtowers.bin',
    },
    {
        systemId: 'MASTER_SYSTEM',
        title: 'Astro Force',
        file: 'https://raw.githubusercontent.com/retrobrews/sms-games/master/astroforce.sms',
    },
    {
        systemId: 'GAME_GEAR',
        title: 'Wing Warriors',
        file: proxied(`${BASE_URL}/Sega - Game Gear/Wing Warriors.gg`),
    },
    // ============ Sony ============
    // Keep buildbot + proxy for CD based games as they might not be in the simple repo or too large
    {
        systemId: 'PS1',
        title: '240p Test Suite',
        file: proxied(`${BASE_URL}/Sony - PlayStation/240pTestSuitePS1-EMU.zip`),
    },
    {
        systemId: 'PSP',
        title: 'Cave Story',
        file: proxied(`${BASE_URL}/Sony - PlayStation Portable/Cave Story.iso`),
    },
    // ============ NEC ============
    {
        systemId: 'PC_ENGINE',
        title: 'Pad Test',
        file: proxied(`${BASE_URL}/NEC - PC Engine - TurboGrafx 16/PadTest.pce`),
    },
    // ============ Atari ============
    {
        systemId: 'ATARI_2600',
        title: 'Halo 2600',
        file: 'https://raw.githubusercontent.com/retrobrews/atari2600-games/master/halo2600.bin',
    },
    {
        systemId: 'ATARI_7800',
        title: 'Asteroids',
        file: proxied(`${BASE_URL}/Atari - 7800/Asteroids.a78`),
    },
    {
        systemId: 'LYNX',
        title: 'T-Tris',
        file: proxied(`${BASE_URL}/Atari - Lynx/T-Tris.lnx`),
    },
    // ============ Other ============
    {
        systemId: 'ARCADE',
        title: 'Alien Arena',
        file: proxied(`${BASE_URL}/Arcade/Alien Arena.zip`),
    },
    {
        systemId: 'DOS',
        title: 'Commander Keen 1',
        file: proxied(`${BASE_URL}/DOS/Commander Keen 1 - Marooned on Mars (1990).zip`),
    },
    {
        systemId: 'WONDERSWAN',
        title: 'Judgement Silversword',
        file: proxied(`${BASE_URL}/Bandai - WonderSwan/Judgement Silversword.ws`),
    },
    {
        systemId: 'VIRTUAL_BOY',
        title: 'Blox',
        file: proxied(`${BASE_URL}/Nintendo - Virtual Boy/Blox.vb`),
    },
];
