export function getVisiblePages(
  current: number,
  total: number,
  maxVisible: number = 5
): number[] {
  const half = Math.floor(maxVisible - 1);
  let start = Math.max(1, current - half);
  let end = start + maxVisible - 1;

  console.log({ start, end, current, total });

  if (end > total) {
    end = total;
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
