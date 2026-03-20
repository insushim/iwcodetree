import { CHALLENGE_SPECS } from "@/lib/data/challenges";
import ChallengeClient from "./ChallengeClient";

export function generateStaticParams() {
  return CHALLENGE_SPECS.map((c) => ({ challengeId: c.id }));
}

export default function ChallengePage() {
  return <ChallengeClient />;
}
