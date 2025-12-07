# System Compatibility & Edge Cases

**Version:** koin-deck-retro-player v0.1.5  
**Last Updated:** 2025-12-07  
**Total Systems:** 27

---

## How ROM/BIOS Handling Works

### ROM Flow
```
User Upload → R2 Storage (UUID-prefixed filename)
                    ↓
CabinetClient.tsx → romsApi.getPlayUrl() → Presigned R2 URL
                    ↓
GamePlayer Component ← romUrl (presigned URL)
                     ← romFileName (original filename, e.g., "mslug.zip")
                    ↓
useEmulatorCore.ts → Creates ROM option:
   - If romFileName provided: { fileName: romFileName, fileContent: romUrl }
   - Otherwise: just romUrl
                    ↓
Nostalgist.prepare({ rom: romOption }) → Fetches and mounts to /content/
```

**Key Point:** The `romFileName` prop is critical for arcade/MAME systems where the filename determines which game driver to load.

### BIOS Flow (Current State)
```
User uploads BIOS → bios_files table
                    ↓
useBios() hook → biosFiles array available
                    ↓
CabinetClient.tsx → handleBiosSelect() saves to roms.preferred_bios_file_id
                  → BUT: BIOS resolution is COMMENTED OUT (lines 72-133)
                  → resolvedBios state is ALWAYS undefined
                    ↓
GamePlayer ← biosUrl={undefined} ← BIOS NOT PASSED TO EMULATOR
```

**Issue:** The BIOS selection modal works, saves to DB correctly, but the BIOS URL is never resolved and passed to the emulator.

---

## System-by-System Compatibility

### Legend
- ✅ **Working** - Verified functional
- ⚠️ **Partial** - Works with caveats
- ❌ **Broken** - Known issues
- 🔧 **Untested** - Newly added, needs testing

---

## Nintendo Systems

| System | Core | BIOS | Status | Notes |
|--------|------|------|--------|-------|
| **NES** | `fceumm` | ❌ Not needed | ✅ Working | Clean single-file support |
| **SNES** | `snes9x` | ❌ Not needed | ✅ Working | `.snes`, `.smc`, `.sfc` all work |
| **N64** | `mupen64plus_next` | ❌ Not needed | ✅ Working | Prefer `.z64` format (big-endian) |
| **GB** | `gambatte` | ❌ Not needed | ✅ Working | |
| **GBC** | `gambatte` | ❌ Not needed | ✅ Working | |
| **GBA** | `mgba` | ❌ Not needed | ✅ Working | mGBA has built-in BIOS |
| **NDS** | `desmume` | ❌ Not needed | 🔧 Untested | Touch controls may need work |
| **Virtual Boy** | `mednafen_vb` | ❌ Not needed | ✅ Working | |

---

## Sega Systems

| System | Core | BIOS | Status | Notes |
|--------|------|------|--------|-------|
| **Genesis** | `genesis_plus_gx` | ⚠️ For CD only | ⚠️ Partial | Cartridge games work; CD broken |
| **Master System** | `gearsystem` | ❌ Not needed | ✅ Working | |
| **Game Gear** | `gearsystem` | ❌ Not needed | ✅ Working | |
| **Dreamcast** | `flycast` | ✅ Required | ❌ Broken | BIOS not passed; `.gdi` needs multi-file |
| **Saturn** | `yabasanshiro` | ✅ Required | ❌ Broken | BIOS not passed; `.cue` needs multi-file |

### Dreamcast Issues
- **BIOS:** `dc_boot.bin`, `dc_flash.bin` required but not passed
- **Format:** `.gdi` files reference multiple `.bin` tracks
- **Blockers:**
  1. BIOS resolution disabled in CabinetClient
  2. Multi-file ROM support not implemented

### Saturn Issues
- **BIOS:** `sega_101.bin` or `mpr-17933.bin` required but not passed
- **Format:** `.cue` files reference `.bin` tracks
- **Blockers:** Same as Dreamcast

---

## Sony Systems

| System | Core | BIOS | Status | Notes |
|--------|------|------|--------|-------|
| **PS1** | `pcsx_rearmed` | ✅ Required | ❌ Broken | BIOS not passed; `.cue` needs multi-file |
| **PSP** | `ppsspp` | ❌ Not needed | 🔧 Untested | Large files; prefer `.iso` over `.cso` |

### PS1 Issues
- **BIOS:** `scph5500.bin`, `scph5501.bin`, etc. required but not passed
- **Format:** `.cue` references `.bin` tracks
- **Workaround:** `.pbp` format is single-file and should work if BIOS fixed
- **Blockers:**
  1. BIOS resolution disabled
  2. Multi-file ROM support for `.cue` format

---

## SNK Systems

| System | Core | BIOS | Status | Notes |
|--------|------|------|--------|-------|
| **NeoGeo** | `fbalpha2012_neogeo` | ✅ Required | ✅ Working | Fixed in v0.1.5 |
| **NeoGeo Pocket** | `mednafen_ngp` | ❌ Not needed | ✅ Working | |
| **NeoGeo Pocket Color** | `mednafen_ngp` | ❌ Not needed | ✅ Working | |

### NeoGeo Notes
- Uses `biosLocation: 'rom_folder'` - BIOS goes alongside ROM, not in `/system`
- Fixed in v0.1.5: `romFileName` prop ensures correct game identification
- BIOS typically bundled inside ROM zip file

---

## Other Systems

| System | Core | BIOS | Status | Notes |
|--------|------|------|--------|-------|
| **PC Engine** | `mednafen_pce_fast` | ⚠️ For CD | ⚠️ Partial | HuCard works; CD broken |
| **Atari Lynx** | `handy` | ✅ Required | ❌ Broken | BIOS not passed |
| **Atari 2600** | `stella` | ❌ Not needed | ✅ Working | |
| **Atari 7800** | `prosystem` | ❌ Not needed | ✅ Working | |
| **WonderSwan** | `mednafen_wswan` | ❌ Not needed | ✅ Working | |
| **WonderSwan Color** | `mednafen_wswan` | ❌ Not needed | ✅ Working | |
| **Arcade (MAME)** | `mame2003_plus` | ⚠️ Varies | ✅ Working | Fixed in v0.1.5 |
| **C64** | `vice_x64` | ❌ Not needed | 🔧 Untested | Keyboard input may be needed |
| **DOS** | `dosbox_pure` | ❌ Not needed | 🔧 Untested | ZIP format strongly recommended |

---

## Issues Summary

### 🔴 Critical (Blocking)

#### 1. BIOS Resolution Disabled
- **File:** `theretrosaga.com/app/cabinet/[id]/CabinetClient.tsx`
- **Lines:** 72-133 are commented out
- **Impact:** BIOS is never passed to emulator
- **Affected:** PS1, Dreamcast, Saturn, Lynx, PC Engine CD, Genesis CD
- **Fix:** Uncomment and fix the BIOS resolution logic

#### 2. Multi-File ROM Support Missing
- **Impact:** Cannot load disc-based games with `.cue` + `.bin`
- **Affected:** PS1, Saturn, Dreamcast, Sega CD, PC Engine CD
- **Note:** Nostalgist already supports `rom: [file1, file2]`
- **Fix:** Implement multi-file upload UI and pass as array

### ⚠️ High Priority

#### 3. Format Recommendations Needed
- N64: Prefer `.z64` (native byte order)
- PS1: Prefer `.pbp` (single file, multi-track)
- PSP: Prefer `.iso` over `.cso` (better compatibility)
- DOS: Require `.zip` format (contains entire game directory)

### 💡 Medium Priority

#### 4. Untested Systems
- NDS, PSP, C64, DOS were just added in v0.1.5
- Need verification testing with sample ROMs

---

## Nostalgist Capabilities

From source code analysis, Nostalgist supports:

### Multi-File ROMs ✅
```typescript
// Already supported!
rom: ['game.cue', 'track01.bin', 'track02.bin']
```
All files are written to the same `/content/` directory.

### BIOS Files ✅
```typescript
// Already supported!
bios: 'https://example.com/bios.bin'
// or
bios: { fileName: 'bios.bin', fileContent: blobOrUrl }
```
Files are written to `/system/` directory.

### Custom Filenames ✅
```typescript
// Already supported!
rom: { fileName: 'mslug.zip', fileContent: presignedUrl }
```
This is how we fixed NeoGeo/Arcade.

---

## Fix Priority Recommendations

### Phase 1: Enable BIOS (Quick Win)
1. Uncomment BIOS resolution in CabinetClient.tsx
2. Keep `rom_folder` check for NeoGeo/Arcade
3. Test with PS1 + existing BIOS files

### Phase 2: Multi-File Upload
1. Update upload UI to accept multiple files
2. Store file relationships in DB
3. Pass as array to Nostalgist

### Phase 3: Format Validation
1. Warn on suboptimal formats
2. Document recommended formats
3. Add format detection
