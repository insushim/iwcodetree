"use client";

import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface GradingPanelProps {
  studentName: string;
  submissionId: string;
}

export function GradingPanel({ studentName, submissionId }: GradingPanelProps) {
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-5 space-y-4">
      <h3 className="font-bold">
        {studentName}의 제출 ({submissionId})
      </h3>

      <div>
        <label className="block text-sm font-bold mb-2 text-[var(--text-2)]">
          평가
        </label>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <button key={i} onClick={() => setStars(i)}>
              <Star
                className={`w-8 h-8 transition-colors ${
                  i <= stars
                    ? "fill-[var(--accent)] text-[var(--accent)]"
                    : "text-[var(--border)]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
          피드백
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="학생에게 전할 피드백을 작성하세요"
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 h-24 resize-none"
        />
      </div>

      <Button icon={<MessageSquare className="w-4 h-4" />} fullWidth>
        피드백 보내기
      </Button>
    </div>
  );
}
