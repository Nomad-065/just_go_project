/**
 * Utility to combine class names conditionally
 * Accepts strings, undefined, or false values
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
