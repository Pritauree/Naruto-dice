import { BleachHeader } from "@/components/bleach/BleachHeader";
import { BleachBoard } from "@/components/bleach/BleachBoard";
import { BleachEventBanner } from "@/components/bleach/BleachEventBanner";
import { BleachRollPanel } from "@/components/bleach/BleachRollPanel";
import { BleachMultiRoller } from "@/components/bleach/BleachMultiRoller";
import { BleachBlacklistPanel } from "@/components/bleach/BleachBlacklistPanel";
import { useBleachGame, BLEACH_ACCENT } from "@/hooks/useBleachGame";

export default function GameBleach() {
  const game = useBleachGame();

  return (
    <div className="theme-bleach min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8 space-y-8">
      <BleachHeader
        playerName={game.playerName}
        tierId={game.tierId}
        onTierChange={game.setTierId}
        isRolling={game.isRolling}
        onReset={game.resetGame}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-8">
          <BleachBoard cells={game.cells} position={game.position} blacklist={game.blacklist} />

          {game.lastSides === game.tier.diceSides && game.rollValue && !game.isRolling && (
            <BleachEventBanner
              rollValue={game.rollValue}
              position={game.position}
              eventLabel={game.tier.events[game.position]}
            />
          )}

          <BleachRollPanel
            rollValue={game.rollValue}
            isRolling={game.isRolling}
            diceSides={game.tier.diceSides}
            hasAvailableFaces={game.availableFaces.length > 0}
            onRoll={game.handleRoll}
            customRoll={game.customRoll}
            onCustomRollChange={game.setCustomRoll}
            onCustomRollSubmit={game.handleCustomRoll}
            accentColor={BLEACH_ACCENT}
          />

          <div className="flex justify-center">
            <BleachMultiRoller
              count={game.multiCount}
              onCountChange={game.setMultiCount}
              sides={game.multiSides}
              onSidesChange={game.setMultiSides}
              results={game.multiResults}
              isRolling={game.isMultiRolling}
              onRoll={game.handleMultiRoll}
            />
          </div>
        </div>

        <BleachBlacklistPanel
          cells={game.cells}
          blacklist={game.blacklist}
          availableCount={game.availableFaces.length}
          onToggle={game.toggleBlacklist}
          onClear={() => game.setBlacklist([])}
        />
      </div>
    </div>
  );
}
