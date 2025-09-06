'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { LocalCache } from '@/lib/cache';

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 10, // 10 minutes
            gcTime: 1000 * 60 * 30, // 30 minutes
            retry: 2,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            refetchOnReconnect: 'always',
            // Use local storage as additional cache layer
            queryFn: async (context) => {
              const cacheKey = JSON.stringify(context.queryKey);
              
              // Try to get from local cache first
              const cached = LocalCache.get(cacheKey);
              if (cached) {
                return cached;
              }
              
              // If not in cache, fetch and cache
              const data = await context.queryFn(context);
              LocalCache.set(cacheKey, data);
              return data;
            },
          },
          mutations: {
            retry: 1,
            onSuccess: () => {
              // Clear relevant cache on mutations
              queryClient.invalidateQueries();
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}