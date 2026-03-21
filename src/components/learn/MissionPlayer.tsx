"use client";

import { useState, useCallback, useRef } from "react";
import { StepGuidePanel } from "./StepGuidePanel";
import { HintSystem } from "./HintSystem";
import { MissionTimer } from "./MissionTimer";
import { BlockWorkspace } from "@/components/editor/BlockWorkspace";
import { StageCanvas } from "@/components/editor/StageCanvas";
import { StageOverlay } from "@/components/editor/StageOverlay";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Play, Square, CheckCircle } from "lucide-react";
import Link from "next/link";
import { missionData } from "@/data/missionData";

interface MissionPlayerProps {
  missionId: string;
}

const fallbackMission = {
  title: "알 수 없는 미션",
  desc: "미션 정보를 불러올 수 없습니다.",
  steps: [
    { id: "s1", title: "준비", desc: "미션을 준비하세요." },
    { id: "s2", title: "실행", desc: "블록을 조립하고 실행하세요." },
    { id: "s3", title: "확인", desc: "결과를 확인하세요." },
  ] as const,
  hints: [
    "블록 팔레트에서 블록을 찾아보세요",
    "블록을 작업 공간에 끌어다 놓으세요",
    "실행 버튼을 눌러 결과를 확인하세요",
  ] as [string, string, string],
};

export function MissionPlayer({ missionId }: MissionPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [running, setRunning] = useState(false);
  const [, setCode] = useState("");
  const workspaceRef = useRef<any>(null);
  const hasBlocksRef = useRef(false);

  const mission = missionData[missionId] ?? fallbackMission;

  // Track workspace changes to auto-advance steps
  const handleCodeChange = useCallback(
    (code: string) => {
      setCode(code);
      const blockCount = workspaceRef.current
        ? workspaceRef.current.getAllBlocks(false).length
        : 0;

      // Step 1: User opened a category (detected by having workspace ready)
      if (workspaceRef.current && !completedSteps.has(0)) {
        setCompletedSteps((prev) => new Set(prev).add(0));
        setCurrentStep(1);
      }

      // Step 2: User placed a block in the workspace
      if (blockCount > 0 && !hasBlocksRef.current) {
        hasBlocksRef.current = true;
        setCompletedSteps((prev) => new Set(prev).add(1));
        setCurrentStep(2);
      }

      if (blockCount === 0) {
        hasBlocksRef.current = false;
      }
    },
    [completedSteps],
  );

  const handleWorkspaceReady = useCallback((ws: any) => {
    workspaceRef.current = ws;
  }, []);

  const handleRun = () => {
    setRunning(true);
    // Step 3: User ran the code
    if (!completedSteps.has(2)) {
      setCompletedSteps((prev) => new Set(prev).add(2));
    }
    setCurrentStep(2);
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.14)-theme(spacing.8))] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/learn"
          className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold">미션: {mission.title}</h1>
          <p className="text-xs text-[var(--text-3)]">{mission.desc}</p>
        </div>
        <MissionTimer />
        <div className="flex gap-2">
          {!running ? (
            <Button
              size="sm"
              variant="secondary"
              icon={<Play className="w-4 h-4" />}
              onClick={handleRun}
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
          <Button size="sm" icon={<CheckCircle className="w-4 h-4" />}>
            제출
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Main Workspace Area */}
        <div className="flex-1 relative">
          <BlockWorkspace
            spriteId="sprite_1"
            onCodeChange={handleCodeChange}
            onWorkspaceReady={handleWorkspaceReady}
          />
        </div>

        {/* Right Panel: Stage + Guide + Hints */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-3">
          {/* Stage at top */}
          <div className="relative bg-white rounded-xl overflow-hidden border border-[var(--border-light)] shadow-sm">
            <StageCanvas width={300} height={225} />
            <StageOverlay />
          </div>

          {/* Guide Panel in middle */}
          <div className="flex-1 overflow-hidden">
            <StepGuidePanel
              steps={[...mission.steps]}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepChange={setCurrentStep}
            />
          </div>

          {/* Hints at bottom */}
          <div className="flex-shrink-0">
            <HintSystem hints={[...mission.hints]} />
          </div>
        </div>
      </div>
    </div>
  );
}
