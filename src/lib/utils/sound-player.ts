type SoundType = "click" | "success" | "error" | "levelup" | "coin" | "pop";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.3,
): void {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playSequence(
  notes: Array<{ freq: number; dur: number; delay: number }>,
  type: OscillatorType = "sine",
  volume = 0.3,
): void {
  for (const note of notes) {
    setTimeout(() => playTone(note.freq, note.dur, type, volume), note.delay);
  }
}

const SOUNDS: Record<SoundType, () => void> = {
  click: () => playTone(800, 0.05, "square", 0.15),

  success: () =>
    playSequence([
      { freq: 523, dur: 0.15, delay: 0 },
      { freq: 659, dur: 0.15, delay: 100 },
      { freq: 784, dur: 0.25, delay: 200 },
    ]),

  error: () =>
    playSequence(
      [
        { freq: 300, dur: 0.15, delay: 0 },
        { freq: 250, dur: 0.25, delay: 120 },
      ],
      "sawtooth",
      0.2,
    ),

  levelup: () =>
    playSequence([
      { freq: 523, dur: 0.1, delay: 0 },
      { freq: 659, dur: 0.1, delay: 80 },
      { freq: 784, dur: 0.1, delay: 160 },
      { freq: 1047, dur: 0.3, delay: 240 },
    ]),

  coin: () =>
    playSequence(
      [
        { freq: 987, dur: 0.08, delay: 0 },
        { freq: 1319, dur: 0.15, delay: 60 },
      ],
      "square",
      0.15,
    ),

  pop: () => playTone(600, 0.08, "sine", 0.2),
};

export function playSound(sound: SoundType): void {
  try {
    SOUNDS[sound]();
  } catch {
    // Audio context may not be available
  }
}

export function disposeSoundPlayer(): void {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}
