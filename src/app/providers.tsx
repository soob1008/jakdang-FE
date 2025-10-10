"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

function makeQueryClient(router: ReturnType<typeof useRouter>) {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof Error && error.message === "AUTH_EXPIRED") {
          router.push("/auth/login");
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  const queryClient = makeQueryClient(router);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
