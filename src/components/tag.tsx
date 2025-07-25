export default function Tag(props?: React.HTMLProps<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className="text-xs font-light bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 pointer-events-none select-none"
    >
      {props?.children}
    </span>
  );
}
