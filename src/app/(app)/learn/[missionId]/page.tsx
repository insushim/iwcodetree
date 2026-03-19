"use client";

import { useParams } from "next/navigation";
import { MissionPlayer } from "@/components/learn/MissionPlayer";

export default function MissionPage() {
  const params = useParams();
  const missionId = params.missionId as string;

  return <MissionPlayer missionId={missionId} />;
}
