// The reactions visitors can leave on a post, each of them once
export const REACTIONS = [
  { id: "heart", label: "Love it" },
  { id: "clap", label: "Applause" },
  { id: "fire", label: "Fire" },
  { id: "idea", label: "Insightful" },
  { id: "party", label: "Celebrate" },
] as const;

export type Reaction = (typeof REACTIONS)[number]["id"];

export type PostReactions = {
  // How many visitors left each reaction
  counts: Record<Reaction, number>;
  // The ones this visitor left
  mine: Reaction[];
};
