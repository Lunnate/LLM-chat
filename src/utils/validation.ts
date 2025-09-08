export function validateMessage(value: string): boolean {
  return value.trim() !== "" && value.length !== 0;
}
