"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BlockWorkspace } from "@/components/editor/BlockWorkspace";
import { StageCanvas } from "@/components/editor/StageCanvas";
import { StageOverlay } from "@/components/editor/StageOverlay";
import { Button } from "@/components/ui/Button";
import { CompletionCelebration } from "@/components/learn/CompletionCelebration";
import {
  ArrowLeft,
  Play,
  Square,
  CheckCircle,
  Lightbulb,
  Target,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Zap,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import type { ChallengeSpec } from "@/lib/data/challenges";
import { useChallengeStore } from "@/stores/challengeStore";
import { useUserStore } from "@/stores/userStore";

interface ChallengePlayerProps {
  challenge: ChallengeSpec;
}

export function ChallengePlayer({ challenge }: ChallengePlayerProps) {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [usedBlocks, setUsedBlocks] = useState<string[]>([]);
  const [blockCount, setBlockCount] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { startChallenge, completeChallenge, completedChallenges } =
    useChallengeStore();
  const { addXP, addCoins } = useUserStore();

  const isAlreadyCompleted = !!completedChallenges[challenge.id];

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    startChallenge(challenge.id);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge.id]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = useCallback((_code: string) => {
    // Parse block types from workspace
    try {
      const Blockly = (window as any).__Blockly;
      if (!Blockly) return;
      // Get all workspaces and find blocks
      const allWorkspaces = Blockly.Workspace?.getAll?.() || [];
      for (const ws of allWorkspaces) {
        if (ws.getAllBlocks) {
          const blocks = ws.getAllBlocks(false);
          const types = blocks.map((b: any) => b.type);
          const uniqueTypes = [...new Set(types)] as string[];
          setUsedBlocks(uniqueTypes);
          setBlockCount(blocks.length);
          return;
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Check goals - map each goal to required block types
  const goalStatus = challenge.goals.map((goal, idx) => {
    if (goal.check === "block_used") {
      // Match goal to requiredBlockTypes by index
      const bt = challenge.requiredBlockTypes[idx];
      if (bt) return usedBlocks.includes(bt);
      // Fallback: check if ANY required block is used that isn't matched yet
      return challenge.requiredBlockTypes.some((r) => usedBlocks.includes(r));
    }
    if (goal.check === "block_count") {
      // Extract number from goal description or default to 3
      const match = goal.description.match(/(\d+)/);
      const minCount = match ? parseInt(match[1]) : 3;
      return blockCount >= minCount;
    }
    if (goal.check === "block_connected") {
      return blockCount >= 2;
    }
    return false;
  });

  const allGoalsMet = goalStatus.every(Boolean);
  const completedGoals = goalStatus.filter(Boolean).length;

  const handleSubmit = () => {
    if (!allGoalsMet) return;

    // Calculate stars
    let stars: 1 | 2 | 3 = 1;
    if (revealedHints === 0 && elapsed < challenge.estimatedMinutes * 60) {
      stars = 3;
    } else if (revealedHints <= 1) {
      stars = 2;
    }

    completeChallenge(
      challenge.id,
      challenge.xpReward,
      challenge.coinReward,
      stars,
    );
    addXP(challenge.xpReward);
    addCoins(challenge.coinReward);
    setShowCelebration(true);
  };

  const handleReset = () => {
    // Re-mount workspace by navigating to same page
    window.location.reload();
  };

  const difficultyStars = (d: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < d ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
      />
    ));

  return (
    <div className="h-[calc(100vh-theme(spacing.14)-theme(spacing.8))] flex flex-col">
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-3 px-1"
        style={{ minHeight: 48 }}
      >
        <Link
          href="/challenges"
          className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold truncate">{challenge.title}</h1>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                background:
                  challenge.category === "motion"
                    ? "#DBEAFE"
                    : challenge.category === "looks"
                      ? "#F3E8FF"
                      : challenge.category === "control"
                        ? "#FEF3C7"
                        : challenge.category === "pen"
                          ? "#D1FAE5"
                          : "#F1F5F9",
                color:
                  challenge.category === "motion"
                    ? "#2563EB"
                    : challenge.category === "looks"
                      ? "#7C3AED"
                      : challenge.category === "control"
                        ? "#D97706"
                        : challenge.category === "pen"
                          ? "#059669"
                          : "#64748B",
              }}
            >
              {challenge.category}
            </span>
          </div>
          <p className="text-xs text-[var(--text-3)] truncate">
            {challenge.description}
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-[var(--text-3)]">
          {difficultyStars(challenge.difficulty)}
        </div>

        <div className="flex items-center gap-1 text-sm font-mono text-[var(--text-2)] bg-[var(--bg-sidebar)] px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          {formatTime(elapsed)}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={handleReset}
          >
            초기화
          </Button>
          {!running ? (
            <Button
              size="sm"
              variant="secondary"
              icon={<Play className="w-4 h-4" />}
              onClick={() => setRunning(true)}
            >
              실행
            </Button>
          ) : (
            <Button
              size="sm"
              variant="danger"
              icon={<Square className="w-4 h-4" />}
              onClick={() => setRunning(false)}
            >
              정지
            </Button>
          )}
          <Button
            size="sm"
            icon={<CheckCircle className="w-4 h-4" />}
            onClick={handleSubmit}
            disabled={!allGoalsMet}
          >
            제출
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-3 overflow-hidden">
        {/* Left: Goals & Hints */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-3 overflow-y-auto">
          {/* Goals */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-[var(--primary)]" />
              <h3 className="font-bold text-sm">
                목표 ({completedGoals}/{challenge.goals.length})
              </h3>
            </div>
            <div className="space-y-2">
              {challenge.goals.map((goal, i) => (
                <div key={goal.id} className="flex items-start gap-2 text-sm">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                    style={{
                      background: goalStatus[i] ? "var(--primary)" : "#E2E8F0",
                    }}
                  >
                    {goalStatus[i] ? (
                      <CheckCircle className="w-3 h-3 text-white" />
                    ) : (
                      <span className="text-xs text-gray-500">{i + 1}</span>
                    )}
                  </div>
                  <span
                    className={
                      goalStatus[i]
                        ? "text-[var(--text-2)] line-through"
                        : "text-[var(--text-1)]"
                    }
                  >
                    {goal.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-4">
            <h3 className="font-bold text-sm mb-2">보상</h3>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1 text-[var(--accent)] font-bold">
                <Zap className="w-3.5 h-3.5" />+{challenge.xpReward} XP
              </span>
              <span className="text-[var(--secondary)] font-bold">
                +{challenge.coinReward} 코인
              </span>
            </div>
          </div>

          {/* Hints */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-4">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm">
                  힌트 ({challenge.hints.length - revealedHints}개 남음)
                </h3>
              </div>
              {showHints ? (
                <ChevronUp className="w-4 h-4 text-[var(--text-3)]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[var(--text-3)]" />
              )}
            </button>
            {showHints && (
              <div className="mt-3 space-y-2">
                {challenge.hints.map((hint, i) => (
                  <div key={i}>
                    {i < revealedHints ? (
                      <p className="text-sm text-[var(--text-2)] bg-amber-50 rounded-lg p-2.5 border border-amber-100">
                        💡 {hint}
                      </p>
                    ) : i === revealedHints ? (
                      <button
                        onClick={() => setRevealedHints((r) => r + 1)}
                        className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                      >
                        힌트 {i + 1} 보기 →
                      </button>
                    ) : (
                      <p className="text-sm text-[var(--text-3)]">
                        🔒 힌트 {i + 1}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Block usage info */}
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-4">
            <h3 className="font-bold text-sm mb-2">사용 중인 블록</h3>
            <p className="text-2xl font-black text-[var(--primary)]">
              {blockCount}개
            </p>
            {usedBlocks.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {usedBlocks.slice(0, 8).map((b) => (
                  <span
                    key={b}
                    className="text-[10px] px-1.5 py-0.5 bg-[var(--bg-sidebar)] rounded text-[var(--text-3)]"
                  >
                    {b}
                  </span>
                ))}
                {usedBlocks.length > 8 && (
                  <span className="text-[10px] text-[var(--text-3)]">
                    +{usedBlocks.length - 8}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 relative rounded-xl overflow-hidden border border-[var(--border-light)]">
          <BlockWorkspace
            spriteId="challenge_sprite"
            onCodeChange={handleCodeChange}
          />
        </div>

        {/* Stage */}
        <div className="w-[300px] flex-shrink-0">
          <div className="relative bg-white rounded-xl overflow-hidden border border-[var(--border-light)] shadow-sm">
            <StageCanvas width={280} height={210} />
            <StageOverlay />
          </div>
          {/* Required blocks summary */}
          <div className="mt-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-4">
            <h3 className="font-bold text-sm mb-2">필수 블록</h3>
            <div className="space-y-1.5">
              {challenge.requiredBlockTypes.map((bt) => {
                const found = usedBlocks.includes(bt);
                return (
                  <div key={bt} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{
                        background: found ? "#10B981" : "#E2E8F0",
                      }}
                    >
                      {found && (
                        <CheckCircle className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                    <code className="text-xs">{bt}</code>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Celebration */}
      <CompletionCelebration
        open={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          router.push("/challenges");
        }}
        missionTitle={challenge.title}
        stars={(completedChallenges[challenge.id]?.stars as 1 | 2 | 3) || 1}
        xp={challenge.xpReward}
        coins={challenge.coinReward}
      />
    </div>
  );
}
