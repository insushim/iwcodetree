"use client";

import Link from "next/link";
import { Users, Copy } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface ClassCardProps {
  classData: {
    id: string;
    name: string;
    students: number;
    code: string;
    progress: number;
  };
}

export function ClassCard({ classData }: ClassCardProps) {
  return (
    <Link href={`/teacher/classes/${classData.id}`}>
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] hover:border-[var(--border)] p-5 card-hover">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">{classData.name}</h3>
          <div className="flex items-center gap-1.5 text-sm text-[var(--text-3)]">
            <Users className="w-4 h-4" />
            {classData.students}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-[var(--bg-main)] px-2 py-1 rounded-md font-mono font-bold text-[var(--text-2)]">
            {classData.code}
          </span>
          <button
            className="p-1 rounded hover:bg-[var(--border-light)]"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(classData.code);
            }}
          >
            <Copy className="w-3.5 h-3.5 text-[var(--text-3)]" />
          </button>
        </div>
        <ProgressBar
          value={classData.progress}
          label="평균 진행도"
          showValue
          color={classData.progress > 70 ? "secondary" : "primary"}
          size="sm"
        />
      </div>
    </Link>
  );
}
