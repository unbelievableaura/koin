import React from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
}

export function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
    return (
        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-zinc-900 text-zinc-100 font-mono my-6">
            {filename && (
                <div className="border-b-4 border-black bg-retro-green text-black px-4 py-2 font-bold uppercase flex items-center justify-between">
                    <span>{filename}</span>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                </div>
            )}
            <div className="p-4 overflow-x-auto text-sm">
                <pre>
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
