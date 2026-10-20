/* eslint-disable @next/next/no-img-element */

export default function Person({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-block bg-white/10 backdrop-blur-md pl-[3px] pr-1.5 py-[1px] rounded-full w-fit cursor-pointer"
    >
      <img
        src={`https://github.com/${username}.png?size=64`}
        alt={name}
        width={64}
        height={64}
        className="inline-block rounded-full size-4 align-text-top"
      />
      <span className="ml-1 inline bg-gradient-to-r from-white/70 to-white/70 bg-no-repeat bg-left-bottom transition-all duration-150 bg-[size:0%_var(--underline-thickness,1px)] group-hover:bg-[size:100%_var(--underline-thickness,1px)]">
        {name} ↗
      </span>
    </a>
  );
}
