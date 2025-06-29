// utils/auth.js
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const base64Url = token.split('.')[1];
    const decoded = JSON.parse(atob(base64Url));
    const exp = decoded.exp;

    // exp is in seconds, Date.now() is in milliseconds
    if (exp * 1000 < Date.now()) {
      return true; // Token is expired
    }
    return false;
  } catch (error) {
    return true; // If decoding fails, treat as expired
  }
};

