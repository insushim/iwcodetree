"use client";

import { useCallback } from "react";
import { useUserStore } from "@/stores/userStore";
import { playSound, disposeSoundPlayer } from "@/lib/utils/sound-player";

type SoundType = "click" | "success" | "error" | "levelup" | "coin" | "pop";

export function useSound() {
  const soundEnabled = useUserStore((s) => s.settings.sound);

  const play = useCallback(
    (sound: SoundType) => {
      if (!soundEnabled) return;
      playSound(sound);
    },
    [soundEnabled],
  );

  const dispose = useCallback(() => {
    disposeSoundPlayer();
  }, []);

  return { play, dispose, soundEnabled };
}
