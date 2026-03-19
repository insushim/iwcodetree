import ClassDetailClient from "./ClassDetailClient";

export function generateStaticParams() {
  return [{ id: "demo" }];
}

export default function ClassDetailPage() {
  return <ClassDetailClient />;
}
