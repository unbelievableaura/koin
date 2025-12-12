import React from 'react';
import CoreShowcase from '@/app/components/CoreShowcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Core Showcase | koin.js',
    description: 'Interactive demonstration of supported emulation cores using homebrew software.',
};

export default function ShowcasePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black font-display mb-4">CORE SHOWCASE</h1>
                <p className="text-xl font-mono text-zinc-600">
                    Live demonstration of supported systems running directly in your browser.
                </p>
            </div>

            <CoreShowcase />
        </div>
    );
}
