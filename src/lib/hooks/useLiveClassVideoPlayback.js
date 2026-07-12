"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getLiveClassVideoPlaybackUrl } from "@/lib/api/live-classes.api";
import { getApiErrorMessage } from "@/lib/utils/errors";

export function useLiveClassVideoPlayback() {
  return useMutation({
    mutationFn: getLiveClassVideoPlaybackUrl,
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "You do not have access to this video")
      );
    },
  });
}
