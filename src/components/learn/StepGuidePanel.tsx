"use client";

import { CheckCircle, Circle } from "lucide-react";

interface Step {
  id: string;
  title: string;
  desc: string;
}

interface StepGuidePanelProps {
  steps: Step[];
  currentStep: number;
  completedSteps?: Set<number>;
  onStepChange: (step: number) => void;
}

export function StepGuidePanel({
  steps,
  currentStep,
  completedSteps = new Set(),
  onStepChange,
}: StepGuidePanelProps) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border-light)]">
        <h3 className="font-bold text-sm">단계별 가이드</h3>
        <p className="text-xs text-[var(--text-3)] mt-0.5">
          {currentStep + 1}/{steps.length} 단계
        </p>
      </div>
      <div className="p-3 space-y-1">
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => onStepChange(i)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
              i === currentStep
                ? "bg-[var(--primary)]/5 border border-[var(--primary)]/20"
                : completedSteps.has(i)
                  ? "opacity-70"
                  : "opacity-40"
            }`}
          >
            <div className="mt-0.5">
              {completedSteps.has(i) ? (
                <CheckCircle className="w-5 h-5 text-[var(--secondary)]" />
              ) : (
                <Circle
                  className={`w-5 h-5 ${
                    i === currentStep
                      ? "text-[var(--primary)]"
                      : "text-[var(--text-3)]"
                  }`}
                />
              )}
            </div>
            <div>
              <div className="text-sm font-bold">{step.title}</div>
              {i === currentStep && (
                <p className="text-xs text-[var(--text-2)] mt-1 leading-relaxed">
                  {step.desc}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
