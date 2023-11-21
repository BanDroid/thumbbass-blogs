export function isAuthorized(key: string | null) {
  return key && process.env.ADMIN_SECRET === key;
}
