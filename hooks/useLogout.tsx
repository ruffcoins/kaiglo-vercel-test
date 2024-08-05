"use client";

import { useFetchUserProfile } from "@/hooks/queries/userProfile";
import useAuth from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const { logOut } = useAuth();
  const { removeUser } = useFetchUserProfile();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    logOut();
    removeUser();
    queryClient.removeQueries();
  };

  return {
    handleLogout,
  };
};

export default useLogout;
