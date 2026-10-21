"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  Confetti,
  Fire,
  HandsClapping,
  Heart,
  Lightbulb,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { PostReactions, Reaction } from "@/lib/reactions";

export const REACTION_ICONS: Record<Reaction, Icon> = {
  heart: Heart,
  clap: HandsClapping,
  fire: Fire,
  idea: Lightbulb,
  party: Confetti,
};

type ReactionsState = {
  // Null until they've loaded
  reactions: PostReactions | null;
  // Whether they couldn't be loaded, like when there's no database
  unavailable: boolean;
  toggle: (reaction: Reaction) => void;
};

const ReactionsContext = createContext<ReactionsState | null>(null);

// Loads a post's reactions once for every part of the page that shows them, so they stay in sync
export function ReactionsProvider({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const [reactions, setReactions] = useState<PostReactions | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  // Only the latest request's response is shown, in case several go out at once
  const latestRequest = useRef(0);

  useEffect(() => {
    fetch(`/api/reactions/${slug}`)
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null)
      .then((reactions) =>
        reactions ? setReactions(reactions) : setUnavailable(true),
      );
  }, [slug]);

  const toggle = async (reaction: Reaction) => {
    if (!reactions) return;
    const on = !reactions.mine.includes(reaction);
    const request = ++latestRequest.current;

    // Shown right away, then replaced by the server's counts, or undone if it fails
    setReactions({
      counts: {
        ...reactions.counts,
        [reaction]: reactions.counts[reaction] + (on ? 1 : -1),
      },
      mine: on
        ? [...reactions.mine, reaction]
        : reactions.mine.filter((mine) => mine !== reaction),
    });
    const response = await fetch(`/api/reactions/${slug}`, {
      method: "POST",
      body: JSON.stringify({ reaction, on }),
    }).catch(() => null);
    if (request !== latestRequest.current) return;
    setReactions(response?.ok ? await response.json() : reactions);
  };

  return (
    <ReactionsContext.Provider value={{ reactions, unavailable, toggle }}>
      {children}
    </ReactionsContext.Provider>
  );
}

export function useReactions() {
  const state = useContext(ReactionsContext);
  if (!state) throw new Error("useReactions needs a ReactionsProvider");
  return state;
}
