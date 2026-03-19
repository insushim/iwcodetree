"use client";

import { useState } from "react";
import { StepGuidePanel } from "./StepGuidePanel";
import { HintSystem } from "./HintSystem";
import { MissionTimer } from "./MissionTimer";
import { BlockWorkspace } from "@/components/editor/BlockWorkspace";
import { StageCanvas } from "@/components/editor/StageCanvas";
import { StageOverlay } from "@/components/editor/StageOverlay";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Play, Square, CheckCircle } from "lucide-react";
import Link from "next/link";

interface MissionPlayerProps {
  missionId: string;
}

const steps = [
  {
    id: "s1",
    title: "스프라이트 확인하기",
    desc: "오른쪽 스테이지에서 고양이 스프라이트를 확인하세요.",
  },
  {
    id: "s2",
    title: "동작 블록 추가",
    desc: "'10만큼 움직이기' 블록을 작업 공간에 끌어다 놓으세요.",
  },
  {
    id: "s3",
    title: "실행하기",
    desc: "초록색 깃발을 클릭해서 결과를 확인하세요!",
  },
];

export function MissionPlayer({ missionId }: MissionPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [, setCode] = useState("");

  return (
    <div className="h-[calc(100vh-theme(spacing.14)-theme(spacing.12))] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/learn"
          className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold">미션: 반복의 마법</h1>
          <p className="text-xs text-[var(--text-3)]">
            반복 블록으로 같은 동작을 여러 번 실행해보세요
          </p>
        </div>
        <MissionTimer />
        <div className="flex gap-2">
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
          <Button size="sm" icon={<CheckCircle className="w-4 h-4" />}>
            제출
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Guide Panel */}
        <div className="w-72 flex-shrink-0">
          <StepGuidePanel
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
          <div className="mt-3">
            <HintSystem
              hints={[
                "'동작' 카테고리에서 블록을 찾아보세요",
                "'10만큼 움직이기' 블록을 사용하세요",
                "반복 블록 안에 움직이기 블록을 넣으면 여러 번 움직여요",
              ]}
            />
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 relative rounded-xl overflow-hidden border border-[var(--border-light)]">
          <BlockWorkspace spriteId="sprite_1" onCodeChange={setCode} />
        </div>

        {/* Stage */}
        <div className="w-[300px] flex-shrink-0">
          <div className="relative bg-white rounded-xl overflow-hidden border border-[var(--border-light)] shadow-sm">
            <StageCanvas width={280} height={210} />
            <StageOverlay />
          </div>
        </div>
      </div>
    </div>
  );
}
