import { Fragment } from "react";

// Shows how words blend into a new one. Parts in brackets are dropped,
// e.g. <Blend words={["Gra[ph]", "[Out]fit"]} /> renders Graph + Outfit = Grafit
export default function Blend({ words }: { words: string[] }) {
  const parts = words.map((word) =>
    word
      .split(/(\[[^\]]+\])/)
      .filter(Boolean)
      .map((part) => ({
        text: part.replace(/^\[|\]$/g, ""),
        dropped: part.startsWith("["),
      })),
  );
  const result = parts
    .flat()
    .filter((part) => !part.dropped)
    .map((part) => part.text)
    .join("");

  return (
    <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 font-primary text-2xl sm:text-3xl my-8">
      {parts.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="text-neutral-50/40 text-xl">+</span>}
          <span>
            {word.map(({ text, dropped }, j) => (
              <span
                key={j}
                className={
                  dropped ? "text-neutral-50/30 line-through decoration-1" : ""
                }
              >
                {text}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
      <span className="text-neutral-50/40 text-xl">=</span>
      <span className="italic">{result}</span>
    </div>
  );
}
