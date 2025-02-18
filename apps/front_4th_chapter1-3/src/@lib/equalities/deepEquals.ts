export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  )
    return false;

  const keysA = Object.keys(objA) as (keyof typeof objA)[];
  const keysB = Object.keys(objB) as (keyof typeof objA)[];

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEquals(objA[key], objB[key])) return false;
  }

  return true;
}
