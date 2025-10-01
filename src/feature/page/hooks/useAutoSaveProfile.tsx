import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { useRef, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { Profile } from "@/entities/author/model/types";

export default function useAutoSaveProfile(profile: Profile) {
  const prevJsonRef = useRef<string>("");

  const { mutate } = useMutation({
    mutationFn: (profile: Profile) =>
      apiClient.patch(`/users/profile/draft`, { profile_draft: profile }),
  });

  const debouncedSave = useMemo(
    () =>
      debounce((profile: Profile) => {
        mutate(profile);
      }, 2000),
    [mutate]
  );

  useEffect(() => {
    if (!profile) return;

    const currentJson = JSON.stringify(profile);
    if (prevJsonRef.current === currentJson) return;

    prevJsonRef.current = currentJson;
    debouncedSave(profile);

    return () => {
      debouncedSave.cancel();
    };
  }, [profile, debouncedSave]);
}
