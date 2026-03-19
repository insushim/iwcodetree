"use client";

import { useState } from "react";
import { Search, Filter, TrendingUp, Clock, Heart } from "lucide-react";
import { ProjectCard as CommunityProjectCard } from "@/components/community/ProjectCard";

const demoProjects = [
  {
    id: "c1",
    name: "우주 슈팅 게임",
    author: "코딩왕",
    likes: 42,
    views: 128,
    thumbnail: "🚀",
  },
  {
    id: "c2",
    name: "고양이 점프 어드벤처",
    author: "냥냥이",
    likes: 35,
    views: 96,
    thumbnail: "🐱",
  },
  {
    id: "c3",
    name: "미로 탈출 게임",
    author: "퍼즐마스터",
    likes: 28,
    views: 84,
    thumbnail: "🏃",
  },
  {
    id: "c4",
    name: "공룡 달리기",
    author: "디노팬",
    likes: 55,
    views: 200,
    thumbnail: "🦖",
  },
  {
    id: "c5",
    name: "바다 속 탐험",
    author: "물고기",
    likes: 19,
    views: 67,
    thumbnail: "🐠",
  },
  {
    id: "c6",
    name: "음악 만들기",
    author: "DJ쿨",
    likes: 31,
    views: 102,
    thumbnail: "🎵",
  },
];

type SortType = "trending" | "recent" | "popular";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("trending");

  const sortButtons: {
    key: SortType;
    icon: typeof TrendingUp;
    label: string;
  }[] = [
    { key: "trending", icon: TrendingUp, label: "인기" },
    { key: "recent", icon: Clock, label: "최신" },
    { key: "popular", icon: Heart, label: "좋아요" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black">탐험하기</h1>
        <p className="text-sm text-[var(--text-3)] mt-1">
          다른 친구들의 멋진 프로젝트를 구경해보세요!
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-3)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="프로젝트 검색..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 text-sm"
          />
        </div>
        <div className="flex gap-1 p-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)]">
          {sortButtons.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                sort === s.key
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-3)] hover:text-[var(--text-2)]"
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoProjects.map((p) => (
          <CommunityProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
