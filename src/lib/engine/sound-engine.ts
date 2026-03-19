type SoundName = "meow" | "pop" | "ding" | "boing" | "buzz" | "click" | "drum";

interface SoundDef {
  frequency: number;
  type: OscillatorType;
  duration: number;
  rampEnd?: number;
}

const SOUNDS: Record<SoundName, SoundDef> = {
  meow: { frequency: 700, type: "sine", duration: 0.3, rampEnd: 500 },
  pop: { frequency: 400, type: "sine", duration: 0.1 },
  ding: { frequency: 880, type: "sine", duration: 0.5 },
  boing: { frequency: 300, type: "sine", duration: 0.4, rampEnd: 600 },
  buzz: { frequency: 150, type: "sawtooth", duration: 0.3 },
  click: { frequency: 1000, type: "square", duration: 0.05 },
  drum: { frequency: 100, type: "triangle", duration: 0.2 },
};

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private volume: number = 100;
  private activeNodes: Set<AudioNode> = new Set();

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(100, vol));
  }

  changeVolume(delta: number): void {
    this.setVolume(this.volume + delta);
  }

  getVolume(): number {
    return this.volume;
  }

  playSound(name: string): void {
    const def = SOUNDS[name as SoundName];
    if (!def) return;
    this.playSoundDef(def);
  }

  async playSoundAndWait(name: string): Promise<void> {
    const def = SOUNDS[name as SoundName];
    if (!def) return;
    return new Promise((resolve) => {
      this.playSoundDef(def, resolve);
    });
  }

  playNote(note: number, duration: number): void {
    const frequency = 440 * Math.pow(2, (note - 69) / 12);
    this.playSoundDef({ frequency, type: "sine", duration });
  }

  private playSoundDef(def: SoundDef, onEnd?: () => void): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = def.type;
    osc.frequency.setValueAtTime(def.frequency, ctx.currentTime);
    if (def.rampEnd) {
      osc.frequency.linearRampToValueAtTime(
        def.rampEnd,
        ctx.currentTime + def.duration,
      );
    }

    gain.gain.setValueAtTime(this.volume / 100, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + def.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    this.activeNodes.add(osc);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + def.duration);
    osc.onended = () => {
      this.activeNodes.delete(osc);
      osc.disconnect();
      gain.disconnect();
      onEnd?.();
    };
  }

  stopAll(): void {
    this.activeNodes.forEach((node) => {
      try {
        (node as OscillatorNode).stop();
      } catch (_) {
        /* already stopped */
      }
    });
    this.activeNodes.clear();
  }
}
