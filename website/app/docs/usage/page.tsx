import { CodeBlock } from "@/components/ui/CodeBlock";
import Link from "next/link";

export default function UsagePage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl md:text-6xl font-display font-black uppercase mb-6">
          Usage Guide
        </h1>
        <p className="text-xl font-mono">
          From basic drop-in to advanced cloud integration.
        </p>
      </section>

      {/* Minimal Example */}
      <section>
        <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-retro-green pb-2 inline-block">
          Minimal Example
        </h2>

        <p className="font-mono text-sm mb-4">
          The simplest possible setup. ROM loads from URL, saves download as files.
        </p>

        <CodeBlock
          filename="App.tsx"
          language="tsx"
          code={`import { GamePlayer } from 'koin.js';
import 'koin.js/styles.css'; // Included styles


export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GamePlayer
        romId="game-123"
        romUrl="https://example.com/roms/mario.nes"
        system="NES"
        title="Super Mario Bros."
      />
    </div>
  );
}`}
        />

        <div className="mt-4 border-4 border-black p-4 bg-zinc-100">
          <h4 className="font-bold uppercase mb-2">Required Props</h4>
          <ul className="font-mono text-sm space-y-1">
            <li><code className="text-retro-pink">romId</code> — Unique identifier for saves</li>
            <li><code className="text-retro-pink">romUrl</code> — URL to the ROM file</li>
            <li><code className="text-retro-pink">system</code> — Console key (NES, GBA, PS1...)</li>
            <li><code className="text-retro-pink">title</code> — Display name</li>
          </ul>
        </div>
      </section>

      {/* Cloud Saves */}
      <section>
        <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-retro-cyan pb-2 inline-block">
          Cloud Save Integration
        </h2>

        <p className="font-mono text-sm mb-4">
          Connect to your backend by providing async handlers. The player manages the UI
          and save queue — you just implement the storage.
        </p>

        <CodeBlock
          filename="CloudExample.tsx"
          language="tsx"
          code={`import { GamePlayer, SaveSlot } from 'koin.js';

export default function CloudExample() {
  // Fetch list of existing saves
  const handleGetSlots = async (): Promise<SaveSlot[]> => {
    const res = await fetch('/api/saves');
    return res.json();
  };

  // Save state to a slot
  const handleSave = async (slot: number, blob: Blob, screenshot?: string) => {
    const formData = new FormData();
    formData.append('state', blob);
    if (screenshot) formData.append('screenshot', screenshot);
    
    await fetch(\`/api/saves/\${slot}\`, {
      method: 'POST',
      body: formData,
    });
  };

  // Load state from a slot
  const handleLoad = async (slot: number): Promise<Blob | null> => {
    const res = await fetch(\`/api/saves/\${slot}\`);
    if (!res.ok) return null;
    return res.blob();
  };

  // Auto-save (runs every 60s by default)
  const handleAutoSave = async (blob: Blob, screenshot?: string) => {
    await fetch('/api/saves/auto', {
      method: 'POST',
      body: blob,
    });
  };

  return (
    <GamePlayer
      romId="game-123"
      romUrl="/roms/game.nes"
      system="NES"
      title="My Game"
      
      // Save hooks
      onGetSaveSlots={handleGetSlots}
      onSaveState={handleSave}
      onLoadState={handleLoad}
      onAutoSave={handleAutoSave}
      autoSaveInterval={60000} // 60 seconds
      
      // Optional: Limit slots for free tier
      maxSlots={3}
      currentTier="Free"
      onUpgrade={() => window.location.href = '/upgrade'}
    />
  );
}`}
        />
      </section>

      {/* BIOS Handling */}
      <section>
        <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-retro-pink pb-2 inline-block">
          BIOS Handling
        </h2>

        <p className="font-mono text-sm mb-4">
          Some systems require BIOS files. The player supports two mounting modes:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border-4 border-black p-4 bg-white">
            <h3 className="font-bold uppercase text-retro-cyan mb-2">System Folder (Default)</h3>
            <p className="font-mono text-xs mb-2">
              BIOS mounts to <code>/system/</code>. Used by most cores.
            </p>
            <CodeBlock
              code={`biosUrl="https://example.com/scph5501.bin"`}
            />
          </div>
          <div className="border-4 border-black p-4 bg-white">
            <h3 className="font-bold uppercase text-retro-pink mb-2">ROM Folder (Arcade/NeoGeo)</h3>
            <p className="font-mono text-xs mb-2">
              BIOS mounts alongside ROM in <code>/content/</code>.
            </p>
            <CodeBlock
              code={`biosUrl={{
  url: "https://example.com/neogeo.zip",
  name: "neogeo.zip",
  location: "rom_folder"
}}`}
            />
          </div>
        </div>

        <div className="border-4 border-black p-4 bg-zinc-900 text-white">
          <h4 className="font-bold uppercase text-retro-green mb-2">Systems Requiring BIOS</h4>
          <div className="font-mono text-xs grid grid-cols-2 md:grid-cols-4 gap-2">
            <span>PlayStation</span>
            <span>Saturn</span>
            <span>Dreamcast</span>
            <span>PC Engine CD</span>
            <span>Sega CD</span>
            <span>Neo Geo *</span>
            <span>Atari Lynx</span>
            <span>Arcade (varies)</span>
          </div>
          <p className="text-xs mt-2 opacity-70">* Neo Geo BIOS is often bundled with ROM</p>
        </div>
      </section>

      {/* RetroAchievements */}
      <section>
        <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-yellow-500 pb-2 inline-block">
          RetroAchievements Integration
        </h2>

        <p className="font-mono text-sm mb-4">
          Enable achievement tracking by providing user credentials and handling login flow.
        </p>

        <CodeBlock
          filename="RAExample.tsx"
          language="tsx"
          code={`<GamePlayer
  // ... core props
  
  // RetroAchievements
  retroAchievementsConfig={{
    username: 'player123',
    token: 'user-api-token',  // NOT password!
    hardcore: false,          // Enable for no saves/rewind
  }}
  
  // UI props (from your RA API calls)
  raUser={raCredentials}
  raGame={gameData}
  raAchievements={achievements}
  raUnlockedAchievements={new Set([1, 2, 5])}
  
  // Handlers
  onRALogin={async (user, pass) => {
    // Call RA API, return true on success
    return await loginToRA(user, pass);
  }}
  onRALogout={() => clearRACredentials()}
  onRAHardcoreChange={(enabled) => setHardcore(enabled)}
/>`}
        />

        <div className="mt-4 border-4 border-yellow-500 p-4 bg-yellow-500/10">
          <h4 className="font-bold uppercase mb-2">Hardcore Mode Restrictions</h4>
          <p className="font-mono text-sm">
            When <code>hardcore: true</code>, the player automatically disables:
          </p>
          <ul className="font-mono text-sm mt-2 space-y-1">
            <li>• Save states (load/save)</li>
            <li>• Rewind</li>
            <li>• Cheats</li>
            <li>• Slow motion ({"<"}1x speed)</li>
          </ul>
        </div>
      </section>

      {/* Web Component */}
      <section>
        <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-black pb-2 inline-block">
          Vanilla HTML (Web Component)
        </h2>

        <p className="font-mono text-sm mb-4">
          No React? No problem. Use the bundled Web Component.
        </p>

        <CodeBlock
          filename="index.html"
          language="html"
          code={`<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/koin.js/dist/web-component.global.js"></script>
</head>
<body>
  <retro-game-player 
    rom-url="./game.nes" 
    system="nes" 
    title="My Game"
    rom-id="game-1"
  ></retro-game-player>

  <script>
    const player = document.querySelector('retro-game-player');
    
    // Advanced properties via JS
    player.onSaveState = async (slot, blob) => {
      console.log('Saved to slot', slot, blob);
    };
  </script>
</body>
</html>`}
        />
      </section>

      {/* Next Steps */}
      <section className="bg-zinc-900 text-white p-6 border-4 border-black">
        <h2 className="text-retro-green font-display text-2xl uppercase mb-4">
          {">"} Next Steps_
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/api"
            className="block border-2 border-retro-cyan p-4 hover:bg-retro-cyan hover:text-black transition-colors"
          >
            <span className="font-bold block">API Reference</span>
            <span className="text-sm opacity-70">Full props documentation</span>
          </Link>
          <Link
            href="/docs/advanced"
            className="block border-2 border-retro-pink p-4 hover:bg-retro-pink hover:text-black transition-colors"
          >
            <span className="font-bold block">Advanced Config</span>
            <span className="text-sm opacity-70">Shaders, recording, controls</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
