'use client';

import { Zap, ZapOff } from 'lucide-react';

interface TurboButtonProps {
    isActive: boolean;
    onToggle: () => void;
    systemColor?: string;
}

/**
 * Floating button to toggle "Turbo Mode"
 * When active, holding a button rapidly fires key presses
 */
export default function TurboButton({
    isActive,
    onToggle,
    systemColor = '#00FF41',
}: TurboButtonProps) {
    const Icon = isActive ? ZapOff : Zap;

    return (
        <button
            onClick={onToggle}
            className="pointer-events-auto p-2 rounded-full backdrop-blur-sm transition-all active:scale-95"
            style={{
                backgroundColor: isActive ? 'rgba(0,0,0,0.6)' : `${systemColor}20`,
                border: `1px solid ${isActive ? 'rgba(255,255,255,0.4)' : systemColor}`,
            }}
            aria-label={isActive ? 'Disable Turbo Mode' : 'Enable Turbo Fire Mode'}
        >
            <Icon
                size={18}
                style={{ color: isActive ? '#fff' : systemColor }}
            />
        </button>
    );
}
