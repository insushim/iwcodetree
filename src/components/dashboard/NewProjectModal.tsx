"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Sparkles, FileCode, Copy } from "lucide-react";

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const templates = [
  { id: "blank", name: "빈 프로젝트", icon: "📄", desc: "처음부터 만들기" },
  { id: "game", name: "게임 템플릿", icon: "🎮", desc: "기본 게임 구조" },
  {
    id: "animation",
    name: "애니메이션",
    icon: "🎬",
    desc: "스프라이트 애니메이션",
  },
  { id: "story", name: "이야기", icon: "📖", desc: "대화형 스토리" },
];

export function NewProjectModal({ open, onClose }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("blank");

  return (
    <Modal open={open} onClose={onClose} title="새 프로젝트" size="md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
            프로젝트 이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="멋진 프로젝트 이름을 지어주세요"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-[var(--text-2)]">
            템플릿 선택
          </label>
          <div className="grid grid-cols-2 gap-3">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selected === t.id
                    ? "border-[var(--primary)] bg-[var(--primary)]/5"
                    : "border-[var(--border-light)] hover:border-[var(--border)]"
                }`}
              >
                <div className="text-2xl mb-1">{t.icon}</div>
                <div className="text-sm font-bold">{t.name}</div>
                <div className="text-xs text-[var(--text-3)]">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            취소
          </Button>
          <Button
            icon={<Sparkles className="w-4 h-4" />}
            className="flex-1"
            onClick={onClose}
          >
            만들기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
