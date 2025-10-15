export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.IP && process.env.PORT) {
    return `http://${process.env.IP}:${process.env.PORT}`;
  }

  return "http://localhost:3000";
}
