export const apiUtil = {
  get: async <T>(api: string): Promise<T> => {
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw Error(`[GET ERROR] status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  put: async <T>(api: string, payload: T): Promise<T> => {
    try {
      const response = await fetch(api, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw Error(`[PUT ERROR] status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
