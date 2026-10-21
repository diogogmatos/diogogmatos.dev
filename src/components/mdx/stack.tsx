// A row of technology chips, e.g. <Stack items={["React", "SQLite"]} />
export default function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5 -mt-1 mb-4">
      {items.map((item) => (
        <li
          key={item}
          className="text-xs bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
