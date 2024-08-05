import Auth from "@/utils/auth";
import { useMemo } from "react";

const useAuth = () => {
  const loggedInUserId = Auth.getUserId();
  const isLoggedIn = Auth.isAuthenticated();

  const logOut = () => {
    Auth.removeToken();
    window.location.replace("/");
  };

  const userId = useMemo(() => {
    return loggedInUserId;
  }, [loggedInUserId]);

  return {
    userId,
    logOut,
    isLoggedIn,
  };
};

export default useAuth;
