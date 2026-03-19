"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    updatedAt: string;
    thumbnail: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/editor/${project.id}`}>
      <div className="group bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] hover:border-[var(--border)] overflow-hidden card-hover">
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 flex items-center justify-center text-5xl">
          {project.thumbnail}
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm truncate">{project.name}</h3>
            <button
              className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-[var(--border-light)] transition-all"
              onClick={(e) => e.preventDefault()}
            >
              <MoreHorizontal className="w-4 h-4 text-[var(--text-3)]" />
            </button>
          </div>
          <p className="text-xs text-[var(--text-3)] mt-1">
            {project.updatedAt}
          </p>
        </div>
      </div>
    </Link>
  );
}
