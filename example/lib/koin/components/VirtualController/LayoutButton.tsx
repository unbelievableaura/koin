'use client';

import { Move } from 'lucide-react';

interface LayoutButtonProps {
    isActive: boolean;
    onToggle: () => void;
    systemColor?: string;
}

/**
 * Floating button to toggle virtual control repositioning
 */
export default function LayoutButton({
    isActive,
    onToggle,
    systemColor = '#00FF41',
}: LayoutButtonProps) {
    const Icon = Move;

    return (
        <button
            onClick={onToggle}
            className="pointer-events-auto p-2 rounded-full backdrop-blur-sm transition-all active:scale-95"
            style={{
                backgroundColor: isActive ? 'rgba(0,0,0,0.6)' : `${systemColor}20`,
                border: `1px solid ${isActive ? 'rgba(255,255,255,0.4)' : systemColor}`,
            }}
            aria-label={isActive ? 'Lock controls' : 'Unlock for repositioning'}
        >
            <Icon
                size={18}
                style={{ color: isActive ? '#fff' : systemColor }}
            />
        </button>
    );
}
