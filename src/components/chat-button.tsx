"use client";

import { MessageCircleHeart } from "lucide-react";

declare global {
  interface Window {
    WBCChat?: { open?: () => void; toggle?: () => void };
  }
}

export function ChatButton() {
  return (
    <button
      type="button"
      onClick={() => window.WBCChat?.open?.()}
      className="inline-flex items-center gap-2 bg-fern px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-ink"
    >
      <MessageCircleHeart aria-hidden="true" className="size-4" />
      Start a Chat
    </button>
  );
}
