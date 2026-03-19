"use client";

import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface RemixButtonProps {
  projectId: string;
}

export function RemixButton({ projectId }: RemixButtonProps) {
  const handleRemix = () => {
    // TODO: Create remix copy and redirect to editor
    window.location.href = `/editor/${projectId}-remix`;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      icon={<Shuffle className="w-4 h-4" />}
      onClick={handleRemix}
    >
      리믹스
    </Button>
  );
}
