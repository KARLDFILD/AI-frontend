import { jwtDecode } from "jwt-decode";

export const getToken = (): string | null => {
  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find((row) =>
    row.startsWith("accessToken=")
  );
  const accessToken = accessTokenCookie ? accessTokenCookie.split("=")[1] : "";

  if (!accessToken) {
    return null;
  }

  try {
    const decoded: { exp: number } = jwtDecode(accessToken);

    if (decoded.exp * 1000 < Date.now()) {
      clearToken();
      return null;
    }

    return accessToken;
  } catch (e) {
    clearToken();
    return null;
  }
};

export const clearToken = () => {
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
