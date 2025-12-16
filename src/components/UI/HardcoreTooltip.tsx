import React, { memo } from 'react';
import { PortalTooltip } from './PortalTooltip';

interface HardcoreTooltipProps {
    show: boolean;
    message?: string;
    children?: React.ReactNode;
}

/**
 * Tooltip shown when a feature is disabled in Hardcore mode.
 * Wrap around a control button's parent div (which should have `group` class).
 */
const HardcoreTooltip = memo(function HardcoreTooltip({ show, message = "Disabled in Hardcore mode", children }: HardcoreTooltipProps) {
    if (!show) return children ? <>{children}</> : null;

    return (
        <PortalTooltip 
            content={message} 
            show={show}
            tooltipClassName="bg-amber-500/90 text-black"
        >
            {children}
        </PortalTooltip>
    );
});

export default HardcoreTooltip;
