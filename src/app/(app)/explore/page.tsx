"use client";

import { useState, useMemo } from "react";
import {
  Search,
  TrendingUp,
  Clock,
  Heart,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { ProjectCard as CommunityProjectCard } from "@/components/community/ProjectCard";
import { COMMUNITY_PROJECTS } from "@/lib/data/communityProjects";
import { Button } from "@/components/ui/Button";

type SortType = "trending" | "recent" | "popular";

// Student-uploaded projects (stored in state for now)
const STUDENT_DEFAULTS = [
  {
    id: "s1",
    name: "무지개 그리기",
    author: "예쁜별",
    likes: 12,
    views: 45,
    thumbnail: "🌈",
    description: "펜으로 무지개를 그려요!",
  },
  {
    id: "s2",
    name: "구구단 퀴즈",
    author: "수학천재",
    likes: 8,
    views: 32,
    thumbnail: "🔢",
    description: "2단부터 9단까지 맞춰보세요",
  },
  {
    id: "s3",
    name: "눈 내리는 밤",
    author: "겨울이",
    likes: 15,
    views: 58,
    thumbnail: "❄️",
    description: "눈송이가 내리는 애니메이션",
  },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("trending");
  const [showUpload, setShowUpload] = useState(false);

  const allProjects = useMemo(() => {
    const all = [
      ...COMMUNITY_PROJECTS.map((p) => ({
        ...p,
        category: "featured" as const,
      })),
      ...STUDENT_DEFAULTS.map((p) => ({
        ...p,
        category: "student" as const,
        code: "",
      })),
    ];
    const q = search.trim().toLowerCase();
    const filtered = q
      ? all.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.author.toLowerCase().includes(q),
        )
      : all;

    if (sort === "popular")
      return [...filtered].sort((a, b) => b.likes - a.likes);
    if (sort === "recent") return [...filtered].reverse();
    return filtered; // trending = default order
  }, [search, sort]);

  const featured = allProjects.filter((p) => p.category === "featured");
  const student = allProjects.filter((p) => p.category === "student");

  return (
    <div className="mx-auto" style={{ maxWidth: 1400 }}>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[var(--accent)]" />
            탐험하기
          </h1>
          <p className="text-sm text-[var(--text-3)] mt-1">
            친구들의 멋진 프로젝트를 구경하고 영감을 받아보세요!
          </p>
        </div>
        <Button
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setShowUpload(!showUpload)}
        >
          내 프로젝트 공유
        </Button>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div
          className="mb-8 rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, var(--bg-card), #F0F4FF)",
            border: "1px solid #E2E8F0",
          }}
        >
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[var(--primary)]" />
            프로젝트 공유하기
          </h3>
          <p className="text-sm text-[var(--text-2)] mb-4">
            에디터에서 만든 프로젝트를 다른 친구들과 공유해보세요!
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[var(--text-3)] mb-1 block">
                프로젝트 이름
              </label>
              <input
                type="text"
                placeholder="멋진 프로젝트 이름"
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[var(--text-3)] mb-1 block">
                설명
              </label>
              <input
                type="text"
                placeholder="프로젝트를 소개해주세요"
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm">공유하기</Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowUpload(false)}
            >
              취소
            </Button>
          </div>
        </div>
      )}

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-3)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="프로젝트 검색..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 text-sm"
          />
        </div>
        <div className="flex gap-1 p-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)]">
          {[
            { key: "trending" as SortType, icon: TrendingUp, label: "인기" },
            { key: "recent" as SortType, icon: Clock, label: "최신" },
            { key: "popular" as SortType, icon: Heart, label: "좋아요" },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                sort === s.key
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-[var(--bg-sidebar)]"
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold">추천 프로젝트</h2>
            <span className="text-xs text-[var(--text-3)] ml-1">
              {featured.length}개
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((p) => (
              <CommunityProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Student Projects */}
      {student.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[var(--primary)]" />
            <h2 className="text-lg font-bold">학생 프로젝트</h2>
            <span className="text-xs text-[var(--text-3)] ml-1">
              {student.length}개
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {student.map((p) => (
              <CommunityProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {allProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-[var(--text-3)] font-medium">
            검색 결과가 없습니다
          </p>
        </div>
      )}
    </div>
  );
}
