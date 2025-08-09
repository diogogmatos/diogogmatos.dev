export function getArrayColumn<T>(
  arr: T[],
  column: number,
  totalColumns: number,
): T[] {
  return arr.filter((_, index) => index % totalColumns === column);
}
