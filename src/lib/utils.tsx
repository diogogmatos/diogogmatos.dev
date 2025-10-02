export function getArrayColumn<T>(
  arr: T[],
  column: number,
  totalColumns: number,
): T[] {
  return arr.filter((_, index) => index % totalColumns === column);
}

export function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: number | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay) as unknown as number;
  };
}
