"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMissionStore } from "@/stores/missionStore";

export interface MissionStepDef {
  id: string;
  instruction: string;
  hint?: string;
  validator?: () => boolean;
}

export interface UseMissionOptions {
  missionId: string;
  steps: MissionStepDef[];
  maxHints?: number;
}

export function useMission({
  missionId,
  steps,
  maxHints = 3,
}: UseMissionOptions) {
  const {
    missionProgress,
    startMission,
    completeMission,
    useHint,
    updateTimeSpent,
    setCurrentMission,
  } = useMissionStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);

  const progress = missionProgress[missionId];
  const currentStep = steps[currentStepIndex] ?? null;
  const hintsRemaining = maxHints - (progress?.hintsUsed ?? 0);

  // Start mission and timer
  const begin = useCallback(() => {
    startMission(missionId);
    setCurrentMission(missionId);
    setCurrentStepIndex(0);
    setIsComplete(false);
    elapsedRef.current = 0;

    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      updateTimeSpent(missionId, elapsedRef.current);
    }, 1000);
  }, [missionId, startMission, setCurrentMission, updateTimeSpent]);

  // Navigate steps
  const nextStep = useCallback(() => {
    const next = currentStepIndex + 1;
    if (next >= steps.length) {
      // Mission complete
      if (timerRef.current) clearInterval(timerRef.current);
      const hintsUsed = progress?.hintsUsed ?? 0;
      const stars = hintsUsed === 0 ? 3 : hintsUsed <= 1 ? 2 : 1;
      completeMission(missionId, stars, elapsedRef.current);
      setIsComplete(true);
    } else {
      setCurrentStepIndex(next);
      setShowHint(false);
    }
  }, [currentStepIndex, steps.length, missionId, progress, completeMission]);

  const prevStep = useCallback(() => {
    setCurrentStepIndex((i) => Math.max(0, i - 1));
    setShowHint(false);
  }, []);

  // Validate current step
  const validateStep = useCallback((): boolean => {
    if (!currentStep?.validator) return true;
    return currentStep.validator();
  }, [currentStep]);

  // Request hint
  const requestHint = useCallback(() => {
    if (hintsRemaining <= 0) return;
    useHint(missionId);
    setShowHint(true);
  }, [hintsRemaining, missionId, useHint]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    currentStep,
    currentStepIndex,
    totalSteps: steps.length,
    isComplete,
    showHint,
    hintsRemaining,
    elapsed: elapsedRef.current,
    progress,
    begin,
    nextStep,
    prevStep,
    validateStep,
    requestHint,
  };
}
