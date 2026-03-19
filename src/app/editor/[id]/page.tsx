import EditorClient from "./EditorClient";

export function generateStaticParams() {
  return [{ id: "new" }];
}

export default function EditorPage() {
  return <EditorClient />;
}
