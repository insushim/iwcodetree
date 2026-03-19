"use client";

import { useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { StudentProgressTable } from "@/components/teacher/StudentProgressTable";
import { ClassAnalytics } from "@/components/teacher/ClassAnalytics";
import { Users, Copy } from "lucide-react";

export default function ClassDetailPage() {
  const params = useParams();
  const classId = params.id as string;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">3학년 1반</h1>
          <div className="flex items-center gap-2 mt-1">
            <Users className="w-4 h-4 text-[var(--text-3)]" />
            <span className="text-sm text-[var(--text-3)]">28명</span>
            <span className="text-sm text-[var(--text-3)]">|</span>
            <span className="text-sm text-[var(--text-3)]">
              코드: ABC123
            </span>
            <button className="p-1 rounded hover:bg-[var(--border-light)]">
              <Copy className="w-3.5 h-3.5 text-[var(--text-3)]" />
            </button>
          </div>
        </div>
      </div>

      <ClassAnalytics />

      <Card header="학생 현황">
        <StudentProgressTable />
      </Card>
    </div>
  );
}
