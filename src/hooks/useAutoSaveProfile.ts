import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { debounce } from "lodash";
import { apiClient } from "@/lib/api/api.client";

export function useAutoSaveProfile(userId: string) {
  const { watch } = useFormContext();
  const prevJsonRef = useRef("");

  useEffect(() => {
    if (!userId) return;

    const debouncedSave = debounce(async (profileDraft) => {
      console.log("profileDraft:", profileDraft);
      await apiClient.put(`/api/user/${userId}/profile/draft`, {
        profile_draft: profileDraft,
      });
    }, 2000);

    const subscription = watch(({ profile }) => {
      const currentJson = JSON.stringify(profile || {});

      if (prevJsonRef.current !== currentJson) {
        prevJsonRef.current = currentJson;
        debouncedSave(profile || {});
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, userId]);
}
