"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BlockWorkspace } from "@/components/editor/BlockWorkspace";
import { ScratchStage } from "@/components/editor/ScratchStage";
import { ScratchRuntime } from "@/lib/runtime/ScratchRuntime";
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
  const [runtimeInstance] = useState(() => new ScratchRuntime());
  const workspaceRef = useRef<any>(null);

  const { startChallenge, completeChallenge, completedChallenges } =
    useChallengeStore();
  const { addXP, addCoins } = useUserStore();

  const isAlreadyCompleted = !!completedChallenges[challenge.id];

  // Timer + cleanup
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    startChallenge(challenge.id);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      runtimeInstance.stop();
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

  // Count how many required blocks are actually used
  const usedRequiredCount = challenge.requiredBlockTypes.filter((bt) =>
    usedBlocks.includes(bt),
  ).length;
  const totalRequired = challenge.requiredBlockTypes.length;

  // Check goals based on type
  const goalStatus = challenge.goals.map((goal) => {
    if (goal.check === "block_used") {
      // Each block_used goal requires a proportional number of required blocks
      // Find which required block types this goal maps to by scanning goal description
      // for block type names, or use proportional threshold
      const blockTypeInDesc = challenge.requiredBlockTypes.find(
        (bt) =>
          goal.description.includes(bt) ||
          goal.description.toLowerCase().includes(bt.replace(/_/g, " ")),
      );
      if (blockTypeInDesc) {
        return usedBlocks.includes(blockTypeInDesc);
      }
      // Proportional: goal N of M requires N/M of required blocks to be used
      const blockUsedGoals = challenge.goals.filter(
        (g) => g.check === "block_used",
      );
      const goalIdx = blockUsedGoals.indexOf(goal);
      const threshold = Math.ceil(
        ((goalIdx + 1) / blockUsedGoals.length) * totalRequired,
      );
      return usedRequiredCount >= threshold;
    }
    if (goal.check === "block_count") {
      const match = goal.description.match(/(\d+)/);
      const minCount = match ? parseInt(match[1]) : 3;
      return blockCount >= minCount;
    }
    if (goal.check === "block_connected") {
      // Require at least half the required blocks to be present and connected
      const minRequired = Math.max(2, Math.ceil(totalRequired * 0.3));
      return usedRequiredCount >= minRequired && blockCount >= minRequired;
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
              onClick={() => {
                if (workspaceRef.current) {
                  runtimeInstance.start("", workspaceRef.current);
                  setRunning(true);
                }
              }}
            >
              실행
            </Button>
          ) : (
            <Button
              size="sm"
              variant="danger"
              icon={<Square className="w-4 h-4" />}
              onClick={() => {
                runtimeInstance.stop();
                setRunning(false);
              }}
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

      <div className="flex-1 flex gap-2 overflow-hidden">
        {/* Left: Compact Goals & Hints */}
        <div className="w-52 flex-shrink-0 flex flex-col gap-2 overflow-y-auto">
          {/* Goals */}
          <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)] p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Target className="w-3.5 h-3.5 text-[var(--primary)]" />
              <h3 className="font-bold text-xs">
                목표 ({completedGoals}/{challenge.goals.length})
              </h3>
              <div className="ml-auto flex items-center gap-1 text-[10px] text-[var(--accent)] font-bold">
                <Zap className="w-3 h-3" />+{challenge.xpReward}
              </div>
            </div>
            <div className="space-y-1.5">
              {challenge.goals.map((goal, i) => (
                <div key={goal.id} className="flex items-start gap-1.5 text-xs">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                    style={{
                      background: goalStatus[i] ? "var(--primary)" : "#E2E8F0",
                    }}
                  >
                    {goalStatus[i] ? (
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    ) : (
                      <span className="text-[10px] text-gray-500">{i + 1}</span>
                    )}
                  </div>
                  <span
                    className={
                      goalStatus[i]
                        ? "text-[var(--text-3)] line-through"
                        : "text-[var(--text-1)]"
                    }
                  >
                    {goal.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Required blocks - compact */}
          <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)] p-3">
            <h3 className="font-bold text-xs mb-1.5">필수 블록</h3>
            <div className="space-y-1">
              {challenge.requiredBlockTypes.map((bt) => {
                const found = usedBlocks.includes(bt);
                return (
                  <div
                    key={bt}
                    className="flex items-center gap-1.5 text-[11px]"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex items-center justify-center"
                      style={{ background: found ? "#10B981" : "#E2E8F0" }}
                    >
                      {found && <CheckCircle className="w-2 h-2 text-white" />}
                    </div>
                    <code className={found ? "text-[var(--text-3)]" : ""}>
                      {bt}
                    </code>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hints - collapsible */}
          <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)] p-3">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <h3 className="font-bold text-xs">
                  힌트 ({challenge.hints.length - revealedHints}개)
                </h3>
              </div>
              {showHints ? (
                <ChevronUp className="w-3.5 h-3.5 text-[var(--text-3)]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-3)]" />
              )}
            </button>
            {showHints && (
              <div className="mt-2 space-y-1.5">
                {challenge.hints.map((hint, i) => (
                  <div key={i}>
                    {i < revealedHints ? (
                      <p className="text-[11px] text-[var(--text-2)] bg-amber-50 rounded p-2 border border-amber-100">
                        💡 {hint}
                      </p>
                    ) : i === revealedHints ? (
                      <button
                        onClick={() => setRevealedHints((r) => r + 1)}
                        className="text-[11px] text-amber-600 hover:text-amber-700 font-medium"
                      >
                        힌트 {i + 1} 보기 →
                      </button>
                    ) : (
                      <p className="text-[11px] text-[var(--text-3)]">
                        🔒 힌트 {i + 1}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Block count */}
          <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-light)] p-3 text-center">
            <span className="text-xs text-[var(--text-3)]">사용 블록</span>
            <p className="text-xl font-black text-[var(--primary)]">
              {blockCount}개
            </p>
          </div>
        </div>

        {/* Workspace - maximized */}
        <div className="flex-1 relative rounded-xl overflow-hidden border border-[var(--border-light)]">
          <BlockWorkspace
            spriteId="challenge_sprite"
            onCodeChange={handleCodeChange}
            onWorkspaceReady={(ws) => {
              workspaceRef.current = ws;
            }}
          />
        </div>

        {/* Stage - compact right panel */}
        <div className="w-[280px] flex-shrink-0">
          <div className="relative bg-white rounded-xl overflow-hidden border border-[var(--border-light)] shadow-sm">
            <ScratchStage width={260} height={195} runtime={runtimeInstance} />
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
