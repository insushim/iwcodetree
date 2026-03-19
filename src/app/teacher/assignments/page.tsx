"use client";

import { useState } from "react";
import { Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AssignmentCreator } from "@/components/teacher/AssignmentCreator";

const demoAssignments = [
  {
    id: "a1",
    title: "반복문으로 별 그리기",
    className: "3학년 1반",
    dueDate: "2026-03-25",
    submitted: 22,
    total: 28,
    status: "active" as const,
  },
  {
    id: "a2",
    title: "조건문 미션 완료하기",
    className: "4학년 2반",
    dueDate: "2026-03-28",
    submitted: 10,
    total: 30,
    status: "active" as const,
  },
  {
    id: "a3",
    title: "첫 번째 게임 만들기",
    className: "코딩 동아리",
    dueDate: "2026-03-15",
    submitted: 15,
    total: 15,
    status: "completed" as const,
  },
];

export default function AssignmentsPage() {
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">과제 관리</h1>
        <Button
          icon={<Plus className="w-5 h-5" />}
          onClick={() => setShowCreator(true)}
        >
          새 과제
        </Button>
      </div>

      <div className="space-y-3">
        {demoAssignments.map((a) => (
          <Card key={a.id} variant="bordered" hover>
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  a.status === "completed"
                    ? "bg-[var(--secondary)]/10"
                    : "bg-[var(--primary)]/10"
                }`}
              >
                {a.status === "completed" ? (
                  <CheckCircle className="w-5 h-5 text-[var(--secondary)]" />
                ) : (
                  <Clock className="w-5 h-5 text-[var(--primary)]" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{a.title}</h3>
                <div className="flex items-center gap-3 text-xs text-[var(--text-3)] mt-0.5">
                  <span>{a.className}</span>
                  <span>마감: {a.dueDate}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">
                  {a.submitted}/{a.total}
                </div>
                <div className="text-xs text-[var(--text-3)]">제출</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showCreator && (
        <AssignmentCreator onClose={() => setShowCreator(false)} />
      )}
    </div>
  );
}
