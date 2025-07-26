import Cookies from 'js-cookie';

export function getAccessToken() {
  try {
    const raw = Cookies.get("auth_token");
    const parsed = JSON.parse(raw);
    return parsed?.access_token;
  } catch {
    return Cookies.get("auth_token");
  }
}

export function isLoggedIn() {
  return !!getAccessToken();
}
