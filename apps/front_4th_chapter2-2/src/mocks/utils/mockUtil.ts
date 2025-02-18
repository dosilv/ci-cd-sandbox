import { http, HttpHandler, HttpResponse } from "msw";

export const mockStorage: Map<string, object> = new Map();

export const getHandlers: <T>(
  api: string,
  initialData: T[],
) => HttpHandler[] = <T>(api: string, initialData: T[]) => {
  mockStorage.set(api, initialData);

  return [
    http.get<never, never, T[]>(api, () => {
      return HttpResponse.json(mockStorage.get(api) as T[]);
    }),
    http.put<never, T[], T[]>(api, async ({ request }) => {
      mockStorage.set(api, await request.json());
      return HttpResponse.json(mockStorage.get(api) as T[]);
    }),
  ];
};
