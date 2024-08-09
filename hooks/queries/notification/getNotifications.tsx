"use client";

import { INotificationsResponse } from "@/interfaces/responses/notification.interface";
import { getRequestParams } from "@/utils/apiCaller";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  const { data, isFetching, refetch, isSuccess, isError, remove, isPaused } =
    useQuery(
      ["notifications", 0],
      () =>
        getRequestParams<{ page: number }, INotificationsResponse>({
          url: "/notification/single-user/v2",
          params: { page: 0 },
        }),
      {
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60,
      },
    );

  return {
    notifications: data?.response.content,
    notificationsPagination: data?.response.pageable,
    fetchingNotifications: isFetching,
    refetchNotifications: refetch,
    notificationsSuccess: isSuccess,
    notificationsPaused: isPaused,
    notificationsError: isError,
    removeNotifications: remove,
  };
};
