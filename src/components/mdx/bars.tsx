// A horizontal bar chart for a single series, e.g.
// <Bars title="Executions on a full battery" unit="executions"
//   items={[{ label: "C", value: 604, detail: "16.6 s each" }]} />
// It's a table underneath, so screen readers get every value and detail.
export default function Bars({
  title,
  subtitle,
  unit,
  items,
}: {
  title: string;
  subtitle?: string;
  unit: string;
  items: { label: string; value: number; detail?: string }[];
}) {
  const max = Math.max(...items.map((item) => item.value));

  return (
    <figure className="my-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-4 text-left">
      <table className="w-full border-separate border-spacing-y-2 text-sm">
        <caption className="caption-top text-left mb-1">
          <span className="block font-semibold">{title}</span>
          {subtitle && (
            <span className="block text-xs text-neutral-50/60">{subtitle}</span>
          )}
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">{unit}</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ label, value, detail }) => (
            // Focusable, so the details also show on keyboard focus and tap
            <tr key={label} tabIndex={0} className="group outline-none">
              <th
                scope="row"
                className="w-0 whitespace-nowrap pr-3 font-normal text-neutral-50/80 align-middle"
              >
                {label}
              </th>
              <td className="relative align-middle">
                <div className="flex items-center gap-2">
                  {/* Leaves room at the end of the longest bar for its value */}
                  <span
                    aria-hidden="true"
                    className="h-3 min-w-[2px] rounded-r-[4px] bg-neutral-50/80 transition-colors group-hover:bg-neutral-50 group-focus-visible:bg-neutral-50"
                    style={{ width: `calc((100% - 3.5rem) * ${value / max})` }}
                  />
                  <span className="font-medium tabular-nums">
                    {value.toLocaleString("en-US")}
                  </span>
                </div>
                {detail && (
                  <span className="pointer-events-none absolute left-0 bottom-full z-10 mb-1 w-max max-w-full rounded-md border border-white/10 bg-neutral-900/90 px-2 py-1 text-xs opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-semibold">
                      {value.toLocaleString("en-US")} {unit}
                    </span>
                    <span className="text-neutral-50/70"> · {detail}</span>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
