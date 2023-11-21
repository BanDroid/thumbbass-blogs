export function getUrlFromBaseUrl(pathname: string = "/"): string {
  return (process.env.BASE_URL || "http://localhost:3000") + pathname;
}
