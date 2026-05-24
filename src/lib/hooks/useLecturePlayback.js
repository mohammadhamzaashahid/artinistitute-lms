"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getLecturePlaybackUrl } from "@/lib/api/lectures.api";
import { getApiErrorMessage } from "@/lib/utils/errors";

export function useLecturePlayback() {
  return useMutation({
    mutationFn: getLecturePlaybackUrl,
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "You do not have access to this lecture")
      );
    },
  });
}