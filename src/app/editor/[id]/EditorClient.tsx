"use client";

import { useParams } from "next/navigation";
import { BlockEditor } from "@/components/editor/BlockEditor";

export default function EditorClient() {
  const params = useParams();
  const projectId = params.id as string;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--bg-editor)]">
      <BlockEditor projectId={projectId} />
    </div>
  );
}
