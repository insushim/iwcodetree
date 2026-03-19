import MissionClient from "./MissionClient";

export function generateStaticParams() {
  const ids = [];
  for (let s = 1; s <= 6; s++) {
    for (let m = 1; m <= 6; m++) {
      ids.push({ missionId: `${s}-${m}` });
    }
  }
  return ids;
}

export default function MissionPage() {
  return <MissionClient />;
}
