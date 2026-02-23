'use client';

import { memo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Monitor, ChevronDown, RefreshCw } from 'lucide-react';
import { ShaderPresetId } from '../../lib/shader-presets';

interface ShaderDropdownProps {
    currentShader?: ShaderPresetId;
    onShaderChange?: (shader: ShaderPresetId, requiresRestart: boolean) => void;
    isRunning?: boolean; // If true, shader change requires restart
    systemColor?: string;
    disabled?: boolean;
}

// Quick shader presets for the dropdown (subset of all presets) - must match ShaderPresetId
const QUICK_PRESETS: { id: ShaderPresetId; label: string }[] = [
    { id: '', label: 'None' },
    { id: 'crt/crt-lottes', label: 'CRT Lottes' },
    { id: 'crt/crt-easymode', label: 'CRT Easy' },
    { id: 'crt/crt-geom', label: 'CRT Geom' },
    { id: 'handheld/lcd-grid-v2', label: 'LCD Grid' },
];

/**
 * Shader Dropdown
 * ---------------
 * Compact dropdown for quick shader selection in the controls bar.
 * When isRunning=true, shows restart warning for mid-game changes.
 */
const ShaderDropdown = memo(function ShaderDropdown({
    currentShader = '',
    onShaderChange,
    isRunning = false,
    systemColor = '#00FF41',
    disabled = false,
}: ShaderDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [pendingShader, setPendingShader] = useState<ShaderPresetId | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ bottom: '0px', left: '0px' });

    const updateDropdownPosition = () => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
            bottom: `${window.innerHeight - rect.top + 8}px`,
            left: `${rect.left}px`,
        });
    };

    useEffect(() => {
        if (isOpen) {
            updateDropdownPosition();
            window.addEventListener('resize', updateDropdownPosition);
            window.addEventListener('scroll', updateDropdownPosition);
            return () => {
                window.removeEventListener('resize', updateDropdownPosition);
                window.removeEventListener('scroll', updateDropdownPosition);
            };
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;
        
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) {
                return;
            }
            setIsOpen(false);
            setPendingShader(null);
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const currentLabel = QUICK_PRESETS.find(p => p.id === currentShader)?.label || 'Custom';

    if (!onShaderChange) return null;

    const handleSelect = (id: ShaderPresetId) => {
        if (id === currentShader) {
            setIsOpen(false);
            return;
        }

        if (isRunning) {
            // Show restart confirmation
            setPendingShader(id);
        } else {
            // Apply immediately if not running
            onShaderChange(id, false);
            setIsOpen(false);
        }
    };

    const confirmRestart = () => {
        if (pendingShader !== null) {
            onShaderChange(pendingShader, true);
            setPendingShader(null);
            setIsOpen(false);
        }
    };

    const cancelRestart = () => {
        setPendingShader(null);
    };

    return (
        <div className="relative hidden sm:block">
            <button
                ref={buttonRef}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all duration-200 hover:bg-white/10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Video Shader"
            >
                <Monitor size={16} style={{ color: currentShader ? systemColor : 'white' }} />
                <span className="text-[10px] font-bold uppercase text-white/80">{currentLabel}</span>
                <ChevronDown size={12} className={`text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isOpen && typeof document !== 'undefined' && createPortal(
                <>
                    <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
                    <div
                        ref={menuRef}
                        className="fixed py-1 rounded-lg shadow-xl z-[9999] min-w-[160px]"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                            border: `1px solid ${systemColor}40`,
                            ...dropdownPosition
                        }}
                    >
                    {/* Restart confirmation */}
                    {pendingShader !== null ? (
                        <div className="p-3 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-orange-400">
                                <RefreshCw size={14} />
                                <span className="font-bold">Restart Required</span>
                            </div>
                            <p className="text-[10px] text-white/60">
                                Shader change requires game restart. Your progress since last save will be lost.
                            </p>
                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={confirmRestart}
                                    className="flex-1 px-2 py-1 text-xs font-bold rounded bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                >
                                    Restart
                                </button>
                                <button
                                    onClick={cancelRestart}
                                    className="flex-1 px-2 py-1 text-xs font-bold rounded bg-white/10 text-white/60 hover:bg-white/20"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Shader list
                        QUICK_PRESETS.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => handleSelect(id)}
                                className={`w-full px-3 py-1.5 text-left text-xs font-medium transition-colors ${currentShader === id
                                        ? 'text-white'
                                        : 'text-white/70 hover:bg-white/10'
                                    }`}
                                style={currentShader === id ? { backgroundColor: `${systemColor}30`, color: systemColor } : undefined}
                            >
                                {label}
                            </button>
                        ))
                    )}
                    </div>
                </>,
                document.body
            )}
        </div>
    );
});

export default ShaderDropdown;
