"use client";

import Link from "next/link";
import { Heart, Eye, Play } from "lucide-react";

interface CommunityProject {
  id: string;
  name: string;
  author: string;
  likes: number;
  views: number;
  thumbnail: string;
  description?: string;
}

interface ProjectCardProps {
  project: CommunityProject;
}

const bgColors: Record<string, string> = {
  "🚀": "linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%)",
  "🐱": "linear-gradient(135deg, #87CEEB 0%, #b8e6ff 100%)",
  "🏃": "linear-gradient(135deg, #2d2d44 0%, #4a4a6a 100%)",
  "🦖": "linear-gradient(135deg, #87CEEB 0%, #a8d8ea 100%)",
  "🐠": "linear-gradient(135deg, #1a5276 0%, #2980b9 100%)",
  "🎵": "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%)",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const bg =
    bgColors[project.thumbnail] ||
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)";

  return (
    <Link href={`/play/${project.id}`}>
      <div className="group bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] hover:border-[var(--primary)]/30 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div
          className="aspect-[16/10] flex items-center justify-center relative"
          style={{ background: bg }}
        >
          <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
            {project.thumbnail}
          </span>
          {/* Play overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-[var(--primary)] ml-0.5" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold truncate">{project.name}</h3>
          <p className="text-xs text-[var(--text-3)] mt-1">
            by {project.author}
          </p>
          {project.description && (
            <p className="text-xs text-[var(--text-2)] mt-2 line-clamp-1">
              {project.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-3)]">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" /> {project.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {project.views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
