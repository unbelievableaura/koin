import React from 'react';

interface HardcoreTooltipProps {
    show: boolean;
    message?: string;
    children?: React.ReactNode;
}

/**
 * Tooltip shown when a feature is disabled in Hardcore mode.
 * Wrap around a control button's parent div (which should have `group` class).
 */
export default function HardcoreTooltip({ show, message = "Disabled in Hardcore mode", children }: HardcoreTooltipProps) {
    if (!show) return children ? <>{children}</> : null;

    return (
        <>
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-amber-500/90 text-black text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {message}
            </div>
        </>
    );
}
