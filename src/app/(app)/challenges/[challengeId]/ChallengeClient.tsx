"use client";

import { useParams, useRouter } from "next/navigation";
import { CHALLENGE_SPECS } from "@/lib/data/challenges";
import { ChallengePlayer } from "@/components/challenges/ChallengePlayer";

export default function ChallengeClient() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.challengeId as string;

  const challenge = CHALLENGE_SPECS.find((c) => c.id === challengeId);

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-lg font-bold">챌린지를 찾을 수 없습니다</p>
        <button
          onClick={() => router.push("/challenges")}
          className="text-[var(--primary)] underline"
        >
          챌린지 목록으로
        </button>
      </div>
    );
  }

  return <ChallengePlayer challenge={challenge} />;
}
