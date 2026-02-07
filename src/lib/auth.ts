/**
 * Clears auth-related localStorage and cookies. Call this on logout.
 */
export function clearAuthStorage(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("auth:token");
  localStorage.removeItem("auth:refreshToken");
  localStorage.removeItem("auth:user");
  localStorage.removeItem("persist:root");

  document.cookie =
    "auth:token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "auth:user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
