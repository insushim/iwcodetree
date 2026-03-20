import PlayClient from "./PlayClient";

export function generateStaticParams() {
  return [
    { id: "c1" },
    { id: "c2" },
    { id: "c3" },
    { id: "c4" },
    { id: "c5" },
    { id: "c6" },
  ];
}

export default function PlayPage() {
  return <PlayClient />;
}
