import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Skull, Crosshair, Award, RotateCcw, Home, Sparkles } from 'lucide-react';
import { PlayerStats } from '../game/types';

interface VictoryModalProps {
  isVictory: boolean;
  stats: PlayerStats;
  onPlayAgain: () => void;
  onReturnLobby: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isVictory,
  stats,
  onPlayAgain,
  onReturnLobby,
}) => {
  const [showShockwave, setShowShockwave] = useState(isVictory);

  useEffect(() => {
    if (!isVictory) return;

    // Golden victory palette
    const colors = ['#f59e0b', '#fbbf24', '#fef08a', '#38bdf8', '#a855f7', '#22c55e', '#ffffff'];

    // 1. Initial Massive Dual Cannon Blast (Left & Right)
    confetti({
      particleCount: 120,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors,
      startVelocity: 65,
      ticks: 350,
      scalar: 1.2,
    });
    confetti({
      particleCount: 120,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors,
      startVelocity: 65,
      ticks: 350,
      scalar: 1.2,
    });

    // 2. High-Altitude Center Firework Burst (delayed 180ms)
    const timeout1 = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { x: 0.5, y: 0.6 },
        colors,
        startVelocity: 50,
        ticks: 300,
        scalar: 1.3,
      });
    }, 180);

    // 3. Continuous Victory Shimmer Shower for 3.5 seconds
    const interval = setInterval(() => {
      confetti({
        particleCount: 25,
        angle: 90,
        spread: 140,
        origin: { x: Math.random() * 0.8 + 0.1, y: 0 },
        colors,
        startVelocity: 15,
        gravity: 0.8,
        ticks: 200,
      });
    }, 280);

    const timeout2 = setTimeout(() => {
      clearInterval(interval);
    }, 3800);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearInterval(interval);
    };
  }, [isVictory]);

  const accuracy = stats.shotsFired > 0
    ? Math.round((stats.shotsHit / stats.shotsFired) * 100)
    : 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto overflow-hidden ${
        isVictory ? 'animate-victory-shake' : 'animate-fade-in'
      }`}
    >
      {/* Darkened backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Expanding Golden Shockwave Ring */}
      {showShockwave && (
        <div
          onAnimationEnd={() => setShowShockwave(false)}
          className="absolute w-96 h-96 rounded-full border-4 border-amber-400 shadow-[0_0_80px_rgba(251,191,36,0.9)] pointer-events-none animate-shockwave"
        />
      )}

      {/* Radiant ambient glow */}
      <div
        className={`absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-35 pointer-events-none ${
          isVictory ? 'bg-amber-500 animate-pulse' : 'bg-rose-600'
        }`}
      />

      {/* Modal Card with Punchy Pop Entrance */}
      <div
        className={`relative w-full max-w-xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-black border ${
          isVictory ? 'border-amber-400/50 shadow-[0_0_50px_rgba(245,158,11,0.35)]' : 'border-white/15 shadow-2xl'
        } rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden z-10 ${
          isVictory ? 'animate-victory-pop' : ''
        }`}
      >
        {/* Victory Header Badge */}
        {isVictory ? (
          <div className="flex flex-col items-center">
            {/* Crown / Trophy with intense golden aura */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400/30 to-yellow-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 animate-crown-glow">
                <Trophy className="w-12 h-12" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-yellow-300 animate-bounce" />
              <Sparkles className="absolute -bottom-1 -left-2 w-6 h-6 text-amber-400 animate-pulse" />
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-gaming font-extrabold px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 tracking-widest uppercase">
                MATCH CHAMPION
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black font-gaming text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-500 tracking-wider drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]">
              #1 VICTORY ROYALE!
            </h1>
            <p className="text-sm font-gaming text-amber-200/90 mt-1">
              You defeated all rivals and conquered the island!
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 mb-4 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
              <Skull className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-gaming text-rose-500 tracking-wider">
              ELIMINATED
            </h1>
            <p className="text-sm font-gaming text-slate-400 mt-1">
              Placed #{stats.placement} in the Battle Royale
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 my-8">
          <div className="flex flex-col items-center p-3.5 bg-white/5 border border-white/10 rounded-2xl">
            <Award className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-[10px] text-slate-400 font-gaming">PLACEMENT</span>
            <span className="text-2xl font-black font-gaming text-white font-mono-numbers">
              #{stats.placement}
            </span>
          </div>

          <div className="flex flex-col items-center p-3.5 bg-white/5 border border-white/10 rounded-2xl">
            <Skull className="w-5 h-5 text-rose-400 mb-1" />
            <span className="text-[10px] text-slate-400 font-gaming">ELIMINATIONS</span>
            <span className="text-2xl font-black font-gaming text-white font-mono-numbers">
              {stats.kills}
            </span>
          </div>

          <div className="flex flex-col items-center p-3.5 bg-white/5 border border-white/10 rounded-2xl">
            <Crosshair className="w-5 h-5 text-sky-400 mb-1" />
            <span className="text-[10px] text-slate-400 font-gaming">DAMAGE DEALT</span>
            <span className="text-2xl font-black font-gaming text-white font-mono-numbers">
              {stats.damageDealt}
            </span>
          </div>

          <div className="flex flex-col items-center p-3.5 bg-white/5 border border-white/10 rounded-2xl">
            <Trophy className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-[10px] text-slate-400 font-gaming">ACCURACY</span>
            <span className="text-2xl font-black font-gaming text-white font-mono-numbers">
              {accuracy}%
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={onPlayAgain}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-gaming font-black text-lg rounded-2xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            PLAY AGAIN
          </button>

          <button
            onClick={onReturnLobby}
            className="flex items-center justify-center gap-2 py-4 px-6 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-gaming font-semibold text-base rounded-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            LOBBY
          </button>
        </div>
      </div>
    </div>
  );
};
