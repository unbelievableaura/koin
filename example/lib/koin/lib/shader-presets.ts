/**
 * Available CRT Shader Presets
 * ----------------------------
 * These are loaded from libretro/glsl-shaders via Nostalgist.
 * Format: { id: shader_path, name: display_name, description: tooltip }
 */
export const SHADER_PRESETS = [
    { id: '', name: 'None', description: 'No shader - sharp pixels' },
    { id: 'crt/crt-lottes', name: 'CRT Lottes', description: 'High-quality arcade monitor look' },
    { id: 'crt/crt-easymode', name: 'CRT Easy', description: 'Popular, performant CRT effect' },
    { id: 'crt/crt-geom', name: 'CRT Geom', description: 'Classic CRT shader with curvature' },
    { id: 'crt/crt-hyllian', name: 'CRT Hyllian', description: 'Attractive with minimal tweaking' },
    { id: 'crt/crt-nes-mini', name: 'NES Mini', description: 'Simple scanlines like NES Classic' },
    { id: 'crt/zfast-crt', name: 'zFast CRT', description: 'Lightweight, great for mobile' },
    { id: 'crt/crt-potato-cool', name: 'CRT Potato', description: 'Fast and good for weak devices' },
    { id: 'handheld/lcd-grid-v2', name: 'LCD Grid', description: 'Game Boy style LCD effect' },
    { id: 'scanlines', name: 'Scanlines', description: 'Simple horizontal scanlines' },
] as const;

export type ShaderPresetId = typeof SHADER_PRESETS[number]['id'];
