// A row of highlighted numbers, e.g. <Stats items={[{ value: "12", label: "teams" }]} />
// Tiles wrap onto new rows when needed, and the last row stretches to fill the width
export default function Stats({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <dl className="flex flex-wrap gap-3 my-6">
      {items.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-1 basis-24 flex-col-reverse justify-end items-center gap-0.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md px-2 py-3 text-center"
        >
          <dt className="text-xs text-neutral-50/70 text-balance">{label}</dt>
          <dd className="font-primary text-3xl">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
