import * as jwtDecode from "jwt-decode";
import { isEmpty } from "lodash";

export function setToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function setUserId(id: string) {
  localStorage.setItem("userId", id);
}

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
}

function getUserId() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId");
  }
  return null;
}

function getDecodedJwt(tkn = ""): {
  sub: string;
  exp: number;
  username: string;
} {
  try {
    const token = getToken();
    const t = token || tkn;
    const decoded = jwtDecode.jwtDecode<{
      sub: string;
      exp: number;
      username: string;
    }>(t);
    return decoded;
  } catch (error) {
    return {} as { sub: string; exp: number; username: string };
  }
}

export function isAuthenticated() {
  try {
    const decodedToken = getDecodedJwt();
    if (!isEmpty(decodedToken)) {
      const { exp } = decodedToken;
      const currentTime = Date.now() / 1000;

      if (exp) {
        return exp > currentTime;
      }

      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

function removeToken() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  sessionStorage.removeItem("originalUrl");
  sessionStorage.clear();
  localStorage.clear();
}

const Auth = {
  getDecodedJwt,
  getToken,
  getUserId,
  isAuthenticated,
  setToken,
  setUserId,
  removeToken,
};

export default Auth;
