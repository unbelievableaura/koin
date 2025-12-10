# koin.js

## Browser Retro Game Emulation for React

> **27 systems. Cloud saves. Zero backend required.**

[![Try the Demo](https://img.shields.io/badge/PLAY-TRY%20THE%20DEMO-FFD600?style=for-the-badge&logoColor=black&labelColor=black)](https://koin.js.org/)
[![NPM Version](https://img.shields.io/npm/v/koin.js?style=for-the-badge&color=white&labelColor=black)](https://www.npmjs.com/package/koin.js)
[![License](https://img.shields.io/npm/l/koin.js?style=for-the-badge&color=white&labelColor=black)](LICENSE)

The drop-in React component for browser-based retro game emulation. Built on [Nostalgist.js](https://github.com/arianrhodsandlot/nostalgist), adding production-ready features like cloud saves, touch controls, gameplay recording, and RetroAchievements.

![koin.js](./koin-player.png)

## Features

- 🎮 **27 Systems** — NES to PlayStation, Game Boy to Arcade
- ☁️ **Cloud-Ready Saves** — Slot-based saves with screenshots, auto-save, emergency saves
- ⏪ **Rewind Time** — Go back in time (auto-enabled for 8/16-bit systems)
- 🏆 **RetroAchievements** — Official RA integration with hardcore mode
- 📱 **Touch Controls** — GPU-accelerated virtual D-pad and buttons
- 📹 **Gameplay Recording** — VP9 WebM capture at 30fps
- 🎨 **10 CRT Shaders** — Lottes, Geom, zFast, LCD Grid, and more

## Installation

```bash
npm install koin.js
# or
yarn add koin.js
# or
pnpm add koin.js
```

## Quick Start

```tsx
import { GamePlayer } from 'koin.js';

export default function App() {
  return (
    <GamePlayer
      romId="game-123"
      romUrl="/roms/mario.nes"
      system="NES"
      title="Super Mario Bros."
    />
  );
}
```

## Cloud Integration

```tsx
import { GamePlayer } from 'koin.js';

<GamePlayer
  romId="game-123"
  romUrl="/roms/game.nes"
  system="NES"
  title="My Game"
  
  // Your backend handlers
  onSaveState={async (slot, blob, screenshot) => { /* save to your API */ }}
  onLoadState={async (slot) => { /* return Blob or null */ }}
  onAutoSave={async (blob, screenshot) => { /* periodic save */ }}
  
  // Optional theming
  systemColor="#FF3333"
  shader="crt/crt-lottes"
/>
```

## Web Component

```html
<script src="https://unpkg.com/koin.js/dist/web-component.global.js"></script>

<retro-game-player
  rom-url="./game.nes"
  system="nes"
  title="My Game"
  rom-id="game-1"
></retro-game-player>
```

## Supported Systems

| System | Key | Core |
|--------|-----|------|
| NES / Famicom | `NES` | fceumm |
| Super Nintendo | `SNES` | snes9x |
| Nintendo 64 | `N64` | mupen64plus_next |
| Game Boy / Color / Advance | `GB`, `GBC`, `GBA` | gambatte, mgba |
| Nintendo DS | `NDS` | desmume |
| PlayStation | `PS1` | pcsx_rearmed |
| PSP | `PSP` | ppsspp |
| Genesis / Mega Drive | `GENESIS` | genesis_plus_gx |
| Master System | `MASTER_SYSTEM` | gearsystem |
| Game Gear | `GAME_GEAR` | gearsystem |
| Saturn | `SATURN` | yabasanshiro |
| Dreamcast | `DREAMCAST` | flycast |
| Neo Geo | `NEOGEO` | fbalpha2012_neogeo |
| Arcade (MAME) | `ARCADE` | mame2003_plus |
| ...and 13 more | [See full list](https://koin.js.org/docs/systems) |

## Requirements

**COOP/COEP Headers Required** for `SharedArrayBuffer`:

```js
// next.config.js
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
    ],
  }];
}
```

## Documentation

Full documentation at **[koin.js.org](https://koin.js.org/docs)**

## License

MIT © Mudit Juneja
