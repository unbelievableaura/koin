import { CodeBlock } from "@/components/ui/CodeBlock";

export default function InstallationPage() {
    return (
        <div className="space-y-12">
            <section>
                <h1 className="text-4xl md:text-6xl font-display font-black uppercase mb-6">
                    Installation
                </h1>
                <p className="text-xl font-mono">
                    Get up and running in under 5 minutes.
                </p>
            </section>

            {/* Package Install */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-black pb-2 inline-block">
                    1. Install the Package
                </h2>

                <div className="space-y-4">
                    <CodeBlock
                        filename="npm"
                        code="npm install koin.js"
                    />
                    <CodeBlock
                        filename="yarn"
                        code="yarn add koin.js"
                    />
                    <CodeBlock
                        filename="pnpm"
                        code="pnpm add koin.js"
                    />
                </div>
            </section>

            {/* COOP/COEP Headers */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-retro-pink pb-2 inline-block">
                    2. Configure Security Headers
                </h2>

                <div className="border-4 border-black p-6 bg-retro-pink/10 mb-6">
                    <h3 className="font-bold uppercase mb-2">⚠️ Required for Performance</h3>
                    <p className="font-mono text-sm">
                        The emulator uses <code>SharedArrayBuffer</code> for high-performance audio and video threading.
                        Modern browsers require specific security headers to enable this feature.
                    </p>
                </div>

                <h3 className="font-bold uppercase mb-4 text-retro-cyan">Next.js (next.config.js)</h3>
                <CodeBlock
                    filename="next.config.js"
                    language="javascript"
                    code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
                />

                <h3 className="font-bold uppercase mb-4 mt-8 text-retro-green">Vercel (vercel.json)</h3>
                <CodeBlock
                    filename="vercel.json"
                    language="json"
                    code={`{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" }
      ]
    }
  ]
}`}
                />

                <h3 className="font-bold uppercase mb-4 mt-8 text-yellow-500">Cloudflare Pages (_headers)</h3>
                <CodeBlock
                    filename="public/_headers"
                    code={`/*
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp`}
                />

                <h3 className="font-bold uppercase mb-4 mt-8 text-purple-400">Nginx</h3>
                <CodeBlock
                    filename="nginx.conf"
                    code={`location / {
    add_header Cross-Origin-Opener-Policy "same-origin";
    add_header Cross-Origin-Embedder-Policy "require-corp";
}`}
                />
            </section>

            {/* External Resources */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-black pb-2 inline-block">
                    3. External Resource Considerations
                </h2>

                <p className="font-mono text-sm mb-4">
                    With COEP enabled, all external resources (ROMs, BIOS) must be served with
                    <code className="bg-zinc-200 px-1 mx-1">Cross-Origin-Resource-Policy: cross-origin</code>
                    OR use{" "}
                    <code className="bg-zinc-200 px-1">crossorigin="anonymous"</code>.
                </p>

                <div className="border-4 border-black p-6 bg-white">
                    <h3 className="font-bold uppercase mb-4">Recommended Setup</h3>
                    <ul className="font-mono text-sm space-y-3">
                        <li className="flex items-start gap-2">
                            <span className="text-retro-green font-bold">✓</span>
                            <span>Host ROMs on the same domain as your app</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-retro-green font-bold">✓</span>
                            <span>Use a CDN that supports CORP headers (Cloudflare R2, AWS S3)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-retro-green font-bold">✓</span>
                            <span>Generate presigned URLs for private ROM storage</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-retro-pink font-bold">✗</span>
                            <span>Don't hotlink ROMs from external sites without CORP headers</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Verify */}
            <section>
                <h2 className="text-2xl font-display font-black uppercase mb-4 border-b-4 border-black pb-2 inline-block">
                    4. Verify Setup
                </h2>

                <p className="font-mono text-sm mb-4">
                    Open your browser's DevTools console and check for:
                </p>

                <CodeBlock
                    filename="Console Check"
                    code={`// Should return true
console.log('SharedArrayBuffer available:', typeof SharedArrayBuffer !== 'undefined');

// Should return true
console.log('crossOriginIsolated:', window.crossOriginIsolated);`}
                />

                <div className="mt-6 border-4 border-retro-green p-4 bg-retro-green/10">
                    <p className="font-mono text-sm">
                        <strong>Both should be true.</strong> If <code>crossOriginIsolated</code> is false,
                        your headers are not configured correctly.
                    </p>
                </div>
            </section>
        </div>
    );
}
