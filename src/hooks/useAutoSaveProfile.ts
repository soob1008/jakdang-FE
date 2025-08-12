import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { debounce, isEqual } from "lodash";
import { apiClient } from "@/lib/api/api.client";

export function useAutoSaveProfile(userId: string) {
  console.log("useAutoSaveProfile userId:", userId);
  const { watch } = useFormContext();
  const prevValueRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const debouncedSave = debounce(async (profileDraft) => {
      console.log("profileDraft:", profileDraft);
      await apiClient.put(`/api/user/${userId}/profile/draft`, {
        profile_draft: profileDraft,
      });
    }, 2000);

    const subscription = watch(({ profile }) => {
      if (!isEqual(prevValueRef.current, profile)) {
        debouncedSave(profile || {});
        prevValueRef.current = profile;
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, userId]);
}
