"use client";

import { useState } from "react";
import { Volume2, Play } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface SoundLibraryModalProps {
  open: boolean;
  onClose: () => void;
}

const sounds = [
  { id: "meow", name: "야옹", category: "동물", duration: "0.5s" },
  { id: "bark", name: "멍멍", category: "동물", duration: "0.4s" },
  { id: "pop", name: "팝!", category: "효과", duration: "0.2s" },
  { id: "ding", name: "딩!", category: "효과", duration: "0.3s" },
  { id: "drum", name: "드럼", category: "악기", duration: "0.6s" },
  { id: "piano", name: "피아노", category: "악기", duration: "1.0s" },
  { id: "cheer", name: "환호", category: "효과", duration: "1.5s" },
  { id: "whoosh", name: "휘리릭", category: "효과", duration: "0.4s" },
];

export function SoundLibraryModal({ open, onClose }: SoundLibraryModalProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Modal open={open} onClose={onClose} title="소리 선택" size="md">
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {sounds.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
              selected === s.id
                ? "border-[var(--primary)] bg-[var(--primary)]/5"
                : "border-[var(--border-light)] hover:border-[var(--border)]"
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--block-sound)]/10 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-[var(--block-sound)]" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">{s.name}</div>
              <div className="text-xs text-[var(--text-3)]">
                {s.category} | {s.duration}
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-[var(--border-light)]">
              <Play className="w-4 h-4 text-[var(--text-3)]" />
            </button>
          </button>
        ))}
      </div>
      <div className="flex gap-3 pt-4">
        <Button variant="ghost" onClick={onClose} className="flex-1">
          취소
        </Button>
        <Button className="flex-1" onClick={onClose} disabled={!selected}>
          추가하기
        </Button>
      </div>
    </Modal>
  );
}
