export function normalizeCompanyName(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

export function isValidCompanyName(input: string): boolean {
  const name = normalizeCompanyName(input);
  if (name.length < 2 || name.length > 80) return false;
  return /[\p{L}\p{N}]/u.test(name);
}

export function companyKey(input: string): string {
  return normalizeCompanyName(input).toLocaleLowerCase();
}
