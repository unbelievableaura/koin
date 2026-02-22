'use client';

import { useState, useEffect, useCallback } from 'react';
import { Settings, Move, Hand, Zap, Gamepad2 } from 'lucide-react';

interface UtilsFABProps {
    isLayoutActive: boolean;
    isHoldActive: boolean;
    isTurboActive: boolean;
    onLayoutToggle: () => void;
    onHoldToggle: () => void;
    onTurboToggle: () => void;
    systemColor?: string;
    isControlsVisible?: boolean;
    onControlsToggle?: () => void;
}

/**
 * Collapsible FAB for virtual controller utility modes
 * - Collapsed: Single gear icon with active indicator
 * - Expanded: Shows Layout, Hold, Turbo buttons horizontally
 * - Auto-collapses after 3 seconds of inactivity
 */
export default function UtilsFAB({
    isLayoutActive,
    isHoldActive,
    isTurboActive,
    onLayoutToggle,
    onHoldToggle,
    onTurboToggle,
    systemColor = '#00FF41',
    isControlsVisible = true,
    onControlsToggle,
}: UtilsFABProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Check if any mode is currently active (controls hidden counts as active)
    const hasActiveMode = isLayoutActive || isHoldActive || isTurboActive || !isControlsVisible;

    // Auto-collapse after 3 seconds
    useEffect(() => {
        if (!isExpanded) return;

        const timer = setTimeout(() => {
            setIsExpanded(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isExpanded]);

    // Handle FAB toggle (expand/collapse)
    const handleFABClick = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    // Handle option click - activates mode and keeps FAB open
    const handleOptionClick = useCallback((action: () => void) => {
        action();
        // Reset auto-collapse timer by toggling expansion state
        setIsExpanded(true);
    }, []);


    return (
        <button
            onClick={handleFABClick}
            className={`
                fixed top-3 left-32 z-[100]
                px-3 py-2 rounded-xl
                bg-black/80 backdrop-blur-md
                border-2
                shadow-xl
                flex items-center
                transition-all duration-300
                touch-manipulation
                pointer-events-auto
            `}
            style={{
                paddingTop: 'max(env(safe-area-inset-top, 0px), 8px)',
                borderColor: hasActiveMode ? systemColor : 'rgba(255,255,255,0.3)',
            }}
            aria-label={isExpanded ? 'Utilities menu' : 'Open utilities'}
            aria-expanded={isExpanded}
        >
            {/* Gear icon - always visible */}
            <Settings
                size={16}
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                style={{ color: hasActiveMode ? systemColor : 'rgba(255,255,255,0.8)' }}
            />

            {/* Active indicator dot */}
            {hasActiveMode && !isExpanded && (
                <span
                    className="absolute -top-0.5 left-4 w-2 h-2 rounded-full animate-pulse"
                    style={{
                        backgroundColor: systemColor,
                        boxShadow: `0 0 6px ${systemColor}`,
                    }}
                />
            )}

            {/* Expanded options - only render when expanded */}
            {isExpanded && (
                <div className="flex items-center gap-3 ml-3">
                    {/* Divider */}
                    <span className="w-px h-4 bg-white/20" />

                    {/* Layout */}
                    <span
                        onClick={() => handleOptionClick(onLayoutToggle)}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        title="Reposition controls"
                    >
                        <Move
                            size={16}
                            style={{ color: isLayoutActive ? systemColor : 'rgba(255,255,255,0.7)' }}
                        />
                    </span>

                    {/* Hold */}
                    <span
                        onClick={() => handleOptionClick(onHoldToggle)}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        title="Hold mode"
                    >
                        <Hand
                            size={16}
                            style={{ color: isHoldActive ? systemColor : 'rgba(255,255,255,0.7)' }}
                        />
                    </span>

                    {/* Turbo */}
                    <span
                        onClick={() => handleOptionClick(onTurboToggle)}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        title="Turbo mode"
                    >
                        <Zap
                            size={16}
                            style={{ color: isTurboActive ? systemColor : 'rgba(255,255,255,0.7)' }}
                        />
                    </span>

                    {/* Show/Hide virtual controls */}
                    {onControlsToggle && (
                        <>
                            <span className="w-px h-4 bg-white/20" />
                            <span
                                onClick={() => handleOptionClick(onControlsToggle)}
                                className="cursor-pointer hover:scale-110 transition-transform"
                                title={isControlsVisible ? 'Hide controls' : 'Show controls'}
                            >
                                <Gamepad2
                                    size={16}
                                    style={{ color: !isControlsVisible ? systemColor : 'rgba(255,255,255,0.7)' }}
                                />
                            </span>
                        </>
                    )}
                </div>
            )}
        </button>
    );
}
