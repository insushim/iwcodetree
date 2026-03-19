import PlayClient from "./PlayClient";

export function generateStaticParams() {
  return [{ id: "demo" }];
}

export default function PlayPage() {
  return <PlayClient />;
}
