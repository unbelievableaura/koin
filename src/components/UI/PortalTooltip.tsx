import { memo, useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalTooltipProps {
    content: string;
    children: ReactNode;
    className?: string;
    show?: boolean;
    tooltipClassName?: string;
}

/**
 * Performance-optimized tooltip that renders via portal
 * Isolated from parent re-renders via memo
 */
export const PortalTooltip = memo(function PortalTooltip({ 
    content, 
    children, 
    className = '',
    show = true,
    tooltipClassName = 'bg-black/90 text-white'
}: PortalTooltipProps) {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ bottom: '0px', left: '0px' });

    useEffect(() => {
        if (!isHovered || !show) return;

        const updatePosition = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setTooltipPosition({
                bottom: `${window.innerHeight - rect.top + 8}px`,
                left: `${rect.left + rect.width / 2}px`,
            });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [isHovered, show]);

    if (!show) return <>{children}</>;

    return (
        <>
            <div
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={className}
            >
                {children}
            </div>
            {isHovered && typeof document !== 'undefined' && createPortal(
                <div 
                    className={`fixed px-2 py-1 text-xs rounded whitespace-nowrap z-[9999] ${tooltipClassName}`}
                    style={{ ...tooltipPosition, transform: 'translateX(-50%)' }}
                >
                    {content}
                </div>,
                document.body
            )}
        </>
    );
});
