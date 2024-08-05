import { UserResponse } from "@/interfaces/responses/user.interface";
import { getRequestParams } from "@/utils/apiCaller";
import Auth from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";

export const useFetchUserProfile = () => {
  const { userId } = useAuth();
  const { data, isFetching, refetch, isSuccess, isError, remove } = useQuery(
    ["user"],
    () =>
      getRequestParams<{ id: string }, UserResponse>({
        url: "/user/retrieve",
        params: { id: userId as string },
      }),
    {
      enabled: !!userId,
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );

  return {
    user: data as UserResponse,
    fetchingUser: isFetching,
    refetchingUser: refetch,
    userSuccess: isSuccess,
    userError: isError,
    removeUser: remove,
  };
};
