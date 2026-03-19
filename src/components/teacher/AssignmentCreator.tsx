"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Save } from "lucide-react";

interface AssignmentCreatorProps {
  onClose: () => void;
}

export function AssignmentCreator({ onClose }: AssignmentCreatorProps) {
  const [title, setTitle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [type, setType] = useState("mission");
  const [dueDate, setDueDate] = useState("");

  return (
    <Modal open onClose={onClose} title="새 과제 만들기" size="md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
            과제 제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="과제 제목을 입력하세요"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
            클래스
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          >
            <option value="">클래스 선택</option>
            <option value="c1">3학년 1반</option>
            <option value="c2">4학년 2반</option>
            <option value="c3">코딩 동아리</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
            과제 유형
          </label>
          <div className="flex gap-2">
            {[
              { key: "mission", label: "미션 완료" },
              { key: "project", label: "프로젝트 만들기" },
              { key: "remix", label: "리믹스" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  type === t.key
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--bg-main)] text-[var(--text-3)] border border-[var(--border-light)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
            마감일
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            취소
          </Button>
          <Button
            icon={<Save className="w-4 h-4" />}
            className="flex-1"
            onClick={onClose}
          >
            과제 생성
          </Button>
        </div>
      </div>
    </Modal>
  );
}
