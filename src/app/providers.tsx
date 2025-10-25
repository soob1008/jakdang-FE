"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactNode } from "react";

// function makeQueryClient(router: ReturnType<typeof useRouter>) {
function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: () => {},
    }),
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = makeQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
