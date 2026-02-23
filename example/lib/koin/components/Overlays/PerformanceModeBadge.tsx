'use client';

import { memo } from 'react';

interface PerformanceModeBadgeProps {
    isHighPerformance: boolean;
    systemColor?: string;
}

/**
 * Badge showing current performance mode (High Perf / Standard)
 * Reusable across desktop HUD and mobile bottom positioning
 */
const PerformanceModeBadge = memo(function PerformanceModeBadge({
    isHighPerformance,
    systemColor = '#00FF41',
}: PerformanceModeBadgeProps) {
    if (isHighPerformance) {
        return (
            <div
                className="bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1.5"
                style={{ borderColor: `${systemColor}40` }}
                title="High Performance Mode Active (Threaded Video)"
            >
                <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: systemColor, boxShadow: `0 0 8px ${systemColor}` }}
                />
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/90">
                    High Perf
                </span>
            </div>
        );
    }

    return (
        <div
            className="bg-red-900/80 backdrop-blur-md px-2 py-1 rounded border border-red-500/50 flex items-center gap-1.5"
            title="Standard Mode (Single Threaded)"
        >
            <span className="text-[10px] uppercase font-bold tracking-wider text-red-200">
                Standard
            </span>
        </div>
    );
});

export default PerformanceModeBadge;
