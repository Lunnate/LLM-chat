export function validateMessage(value: string): boolean {
  return value.trim() !== "" && value.length !== 0;
}

export function validateTitle(value: string): string {
  return value
    .split("")
    .filter((char) => char !== "`")
    .join("")
    .slice(0, 20)
    .trim();
}
