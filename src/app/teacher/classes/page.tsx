"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ClassCard } from "@/components/teacher/ClassCard";

const demoClasses = [
  { id: "c1", name: "3학년 1반", students: 28, code: "ABC123", progress: 72 },
  { id: "c2", name: "4학년 2반", students: 30, code: "DEF456", progress: 45 },
  { id: "c3", name: "코딩 동아리", students: 15, code: "GHI789", progress: 88 },
];

export default function ClassesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">클래스 관리</h1>
        <Button icon={<Plus className="w-5 h-5" />}>새 클래스</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoClasses.map((c) => (
          <ClassCard key={c.id} classData={c} />
        ))}
      </div>
    </div>
  );
}
