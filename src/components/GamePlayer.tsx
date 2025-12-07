'use client';

import { useState, useCallback } from 'react';

import PlayerControls from './PlayerControls';
import ToastContainer from './Overlays/ToastContainer';
import { VirtualController } from './VirtualController';
import FloatingExitButton from './UI/FloatingExitButton';
import FloatingFullscreenButton from './UI/FloatingFullscreenButton';
import GameCanvas from './GameCanvas';
import GameModals from './GameModals';
import RASidebar from './RASidebar';

import { useGamePlayer } from '../hooks/useGamePlayer';
import { GamePlayerProps } from './types';

export default function GamePlayer(props: GamePlayerProps) {
    const [biosModalOpen, setBiosModalOpen] = useState(false);

    const {
        // Refs
        containerRef,
        canvasRef,

        // State
        isMobile,
        isFullscreen,
        toasts,
        dismissToast,

        // Controls
        controls,
        saveControls,

        // Gamepads
        gamepads,
        connectedCount,

        // Modals
        gamepadModalOpen,
        setGamepadModalOpen,
        controlsModalOpen,
        setControlsModalOpen,
        cheatsModalOpen,
        setCheatsModalOpen,

        // Cheats
        activeCheats,
        handleToggleCheat,

        // Emulator
        nostalgist,
        volumeState,

        // Handlers
        handleFullscreen,
        handleSave,
        handleLoad,

        // Actions
        pause,
        resume,

        // Save Modal
        saveModalOpen,
        setSaveModalOpen,
        saveModalMode,
        saveSlots,
        isSlotLoading,
        actioningSlot,
        handleSlotSelect,
        handleSlotDelete,

        // Restrictions
        hardcoreRestrictions,

        // Auto-save
        autoSaveEnabled,
        autoSavePaused,
        autoSaveState,
        autoSaveProgress,
        handleAutoSaveToggle,

        // RA UI
        raSidebarOpen,
        setRaSidebarOpen,
    } = useGamePlayer({
        ...props,
        // Explicitly pass new handlers to ensure they are included if spread doesn't cover it (though spread should)
        onSaveState: props.onSaveState,
        onLoadState: props.onLoadState,
        onAutoSave: props.onAutoSave,
        onToggleCheat: props.onToggleCheat,
        onSessionStart: props.onSessionStart,
        onSessionEnd: props.onSessionEnd,
    });

    const {
        status,
        error,
        isPaused,
        speed,
        isRewinding,
        rewindBufferSize,
        start,
        restart,
        togglePause,
        setSpeed,
        startRewind,
        stopRewind,
        screenshot,
    } = nostalgist;

    const {
        volume,
        isMuted,
        setVolume,
        toggleMute,
    } = volumeState;

    const { system, systemColor = '#00FF41', cheats = [], onExit } = props;

    // -- Memoized Handlers for PlayerControls --

    const handlePauseToggle = useCallback(() => {
        status === 'ready' ? start() : togglePause();
    }, [status, start, togglePause]);

    const handleScreenshot = useCallback(async () => {
        const result = await screenshot();
        if (result && props.onScreenshotCaptured) {
            props.onScreenshotCaptured(result);
        }
    }, [screenshot, props.onScreenshotCaptured]);

    const handleShowControls = useCallback(() => {
        pause();
        setControlsModalOpen(true);
    }, [pause, setControlsModalOpen]);

    const handleShowCheats = useCallback(() => {
        pause();
        setCheatsModalOpen(true);
    }, [pause, setCheatsModalOpen]);

    const handleShowRA = useCallback(() => {
        pause();
        setRaSidebarOpen(true);
    }, [pause, setRaSidebarOpen]);

    const handleShowGamepadSettings = useCallback(() => {
        pause();
        setGamepadModalOpen(true);
    }, [pause, setGamepadModalOpen]);

    const handleExitClick = useCallback(() => {
        onExit?.();
    }, [onExit]);

    // -- Memoized SelectBios Handler for GameCanvas --
    const handleBiosSelection = useCallback(() => {
        setBiosModalOpen(true);
    }, [setBiosModalOpen]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 bg-black overflow-hidden select-none flex flex-col ${props.className || ''}`}
            style={props.style}
        >
            {/* Game canvas area - takes remaining space above controls */}
            <div className="flex-1 relative min-h-0">
                <GameCanvas
                    status={status}
                    system={system}
                    error={error}
                    isPaused={isPaused}
                    onStart={start}
                    systemColor={systemColor}
                    isFullscreen={isFullscreen}
                    canvasRef={canvasRef}
                    onSelectBios={props.onSelectBios ? handleBiosSelection : undefined}
                />

                <VirtualController
                    system={system}
                    isRunning={status === 'running' || status === 'paused'}
                    controls={controls}
                    systemColor={systemColor}
                />

                {!isFullscreen && isMobile && (
                    <FloatingFullscreenButton
                        onClick={handleFullscreen}
                        disabled={status === 'loading' || status === 'error'}
                    />
                )}

                {isFullscreen && isMobile && (
                    <FloatingExitButton
                        onClick={handleFullscreen}
                        disabled={status === 'loading' || status === 'error'}
                    />
                )}
            </div>

            {/* Controls bar - fixed height at bottom */}
            {!isFullscreen && (
                <div className="shrink-0 z-50">
                    <PlayerControls
                        isPaused={isPaused}
                        isRunning={status === 'running' || status === 'paused'}
                        speed={speed}
                        isRewinding={isRewinding}
                        rewindBufferSize={rewindBufferSize}
                        onPauseToggle={handlePauseToggle}
                        onRestart={restart}
                        onSave={handleSave}
                        onLoad={handleLoad}
                        onSpeedChange={setSpeed}
                        onRewindStart={startRewind}
                        onRewindStop={stopRewind}
                        onScreenshot={handleScreenshot}
                        onFullscreen={handleFullscreen}
                        onControls={handleShowControls}
                        onCheats={handleShowCheats}
                        onRetroAchievements={handleShowRA}
                        onExit={handleExitClick}
                        disabled={status === 'loading' || status === 'error'}
                        loadDisabled={status === 'loading' || status === 'error'}
                        saveDisabled={status === 'ready'}
                        systemColor={systemColor}
                        gamepadCount={connectedCount}
                        onGamepadSettings={handleShowGamepadSettings}
                        volume={volume}
                        isMuted={isMuted}
                        onVolumeChange={setVolume}
                        onToggleMute={toggleMute}
                        hardcoreRestrictions={hardcoreRestrictions}
                        raConnected={!!props.raUser}
                        raGameFound={!!props.raGame}
                        raAchievementCount={props.raAchievements?.length}
                        raIsIdentifying={props.raIsLoading}
                        autoSaveEnabled={autoSaveEnabled}
                        autoSavePaused={autoSavePaused}
                        autoSaveState={autoSaveState}
                        autoSaveProgress={autoSaveProgress}
                        onAutoSaveToggle={handleAutoSaveToggle}
                    />
                </div>
            )}

            <GameModals
                controlsModalOpen={controlsModalOpen}
                setControlsModalOpen={setControlsModalOpen}
                controls={controls}
                saveControls={saveControls}
                system={system}
                onResume={resume}

                gamepadModalOpen={gamepadModalOpen}
                setGamepadModalOpen={setGamepadModalOpen}
                gamepads={gamepads}
                systemColor={systemColor}

                cheatsModalOpen={cheatsModalOpen}
                setCheatsModalOpen={setCheatsModalOpen}
                cheats={cheats}
                activeCheats={activeCheats}
                onToggleCheat={handleToggleCheat}

                saveModalOpen={saveModalOpen}
                setSaveModalOpen={setSaveModalOpen}
                saveModalMode={saveModalMode}
                saveSlots={saveSlots}
                isSlotLoading={isSlotLoading}
                actioningSlot={actioningSlot}
                onSlotSelect={handleSlotSelect}
                onSlotDelete={handleSlotDelete}
                maxSlots={props.maxSlots}
                currentTier={props.currentTier}
                onUpgrade={props.onUpgrade}

                biosModalOpen={biosModalOpen}
                setBiosModalOpen={setBiosModalOpen}
                availableBios={props.availableBios}
                currentBiosId={props.currentBiosId}
                onSelectBios={props.onSelectBios}
            />

            {/* RetroAchievements Sidebar */}
            {!isMobile && (
                <RASidebar
                    isOpen={raSidebarOpen}
                    onClose={() => setRaSidebarOpen(false)}
                    isLoggedIn={!!props.raUser}
                    credentials={props.raUser || null}
                    isLoading={props.raIsLoading || false}
                    error={props.raError}
                    onLogin={props.onRALogin || (async () => false)}
                    onLogout={props.onRALogout || (() => { })}
                    hardcoreEnabled={props.retroAchievementsConfig?.hardcore || false}
                    onHardcoreChange={props.onRAHardcoreChange || (() => { })}
                    currentGame={props.raGame || null}
                    achievements={props.raAchievements || []}
                    unlockedIds={props.raUnlockedAchievements || new Set()}
                />
            )}

            {/* Achievement Popup - only show latest unlocked if not already shown */}
            {/* Note: In a real app, you might want a queue system. For now, we assume the parent handles the queue or we just show the latest. */}
            {/* The existing app had logic for 'recentUnlock'. We don't have that state here yet. 
                For now, we'll rely on the parent to trigger a toast or popup via other means, 
                OR we can add 'recentUnlock' prop. 
                Let's assume the parent handles popups via toasts for now to keep it simple, 
                OR we can add a 'recentUnlock' prop. The user said 'provide the UI'. 
                Let's add 'recentUnlock' prop to GamePlayerProps if we want to use AchievementPopup.
            */}


            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        </div>
    );
}
