import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { debounce, isEqual } from "lodash";
import { apiClient } from "@/lib/api/api.client";

export function useAutoSaveProfile(userId: string) {
  const { watch } = useFormContext();
  const prevValueRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const debouncedSave = debounce(async (profileDraft) => {
      await apiClient.put(`/api/users/${userId}/profile/draft`, {
        profile_draft: profileDraft,
      });
    }, 2000);

    const subscription = watch((profile) => {
      if (!isEqual(prevValueRef.current, profile.profile_draft)) {
        debouncedSave(profile.profile_draft || {});
        prevValueRef.current = profile.profile_draft;
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, userId]);
}
