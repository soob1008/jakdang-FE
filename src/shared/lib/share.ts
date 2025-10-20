import { toast } from "sonner";

type CopyOptions = {
  url?: string;
  successMessage?: string;
  errorMessage?: string;
};

type ShareOptions = {
  url?: string;
  title?: string;
  copyMessage?: string;
  fallbackInfoMessage?: string;
  shareSuccessMessage?: string;
  shareErrorMessage?: string;
};

export async function copyLink({
  url,
  successMessage = "링크가 복사되었습니다.",
  errorMessage = "링크 복사에 실패했습니다.",
}: CopyOptions = {}): Promise<boolean> {
  if (typeof window === "undefined" || !navigator?.clipboard) {
    toast.error(errorMessage);
    return false;
  }

  const targetUrl = url ?? window.location.href;
  if (!targetUrl) {
    toast.error(errorMessage);
    return false;
  }

  try {
    await navigator.clipboard.writeText(targetUrl);
    toast(successMessage);
    return true;
  } catch {
    toast.error(errorMessage);
    return false;
  }
}

export async function shareLink({
  url,
  title,
  copyMessage = "링크가 복사되었습니다.",
  fallbackInfoMessage = "이 브라우저는 공유를 지원하지 않아 링크를 복사했어요.",
  shareSuccessMessage = "공유했습니다.",
  shareErrorMessage = "공유 중 문제가 발생했어요. 링크를 대신 복사합니다.",
}: ShareOptions = {}): Promise<"shared" | "copied" | "failed"> {
  if (typeof window === "undefined") {
    return "failed";
  }

  const targetUrl = url ?? window.location.href;
  const shareTitle = title ?? (typeof document !== "undefined"
    ? document.title
    : "페이지 공유");

  if (!targetUrl) {
    return "failed";
  }

  if (navigator.share) {
    try {
      await navigator.share({ title: shareTitle, url: targetUrl });
      toast.success(shareSuccessMessage);
      return "shared";
    } catch (error) {
      if ((error as Error)?.name === "AbortError") {
        return "failed";
      }
      toast.error(shareErrorMessage);
      const copied = await copyLink({ url: targetUrl, successMessage: copyMessage });
      return copied ? "copied" : "failed";
    }
  }

  const copied = await copyLink({ url: targetUrl, successMessage: copyMessage });
  if (copied) {
    toast.info(fallbackInfoMessage);
    return "copied";
  }
  return "failed";
}
