"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

export function CommentSection({ comments: initial }: CommentSectionProps) {
  const [comments, setComments] = useState(initial);
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        author: "나",
        text: text.trim(),
        time: "방금 전",
      },
    ]);
    setText("");
  };

  return (
    <div>
      <h3 className="font-bold text-sm mb-3">댓글 {comments.length}</h3>
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-xs font-bold text-[var(--primary)] flex-shrink-0">
              {c.author[0]}
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold">{c.author}</span>
                <span className="text-xs text-[var(--text-3)]">{c.time}</span>
              </div>
              <p className="text-sm text-[var(--text-2)]">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="댓글을 입력하세요..."
          className="flex-1 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
        />
        <button
          onClick={submit}
          className="p-2.5 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
