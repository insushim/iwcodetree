"use client";

import Link from "next/link";
import { Heart, Eye } from "lucide-react";

interface CommunityProject {
  id: string;
  name: string;
  author: string;
  likes: number;
  views: number;
  thumbnail: string;
}

interface ProjectCardProps {
  project: CommunityProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/play/${project.id}`}>
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] hover:border-[var(--border)] overflow-hidden card-hover">
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--primary)]/5 to-[var(--block-looks)]/5 flex items-center justify-center text-5xl">
          {project.thumbnail}
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm truncate">{project.name}</h3>
          <p className="text-xs text-[var(--text-3)] mt-0.5">
            by {project.author}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-3)]">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" /> {project.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {project.views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
