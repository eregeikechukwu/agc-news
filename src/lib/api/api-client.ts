const BASE_URL = "https://api.agcnewsnet.com/api/general";

/**
 * Generic API client for making HTTP requests
 * Requirement #6: Good code structure with centralized API handling
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make a GET request to the API
   * @param endpoint - The API endpoint to call
   * @returns Promise with the API response
   */
  async get<T>(endpoint: string, timeout = 10000): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // If AbortController exists, use it
    if (typeof AbortController !== "undefined") {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return (await response.json()) as T;
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          console.error(`⏱ Request to ${url} timed out after ${timeout}ms`);
          throw new Error("Request timed out. Please try again.");
        }
        console.error(`Fetch error for ${url}:`, error);
        throw error;
      } finally {
        clearTimeout(timer);
      }
    }

    //  Fallback for environments where AbortController isn't respected (mobile Safari, some WebViews)
    console.warn("⚠️ AbortController not supported, using fallback timeout.");

    return Promise.race([
      fetch(url).then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json()) as T;
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Timeout after ${timeout}ms`)),
          timeout
        )
      ),
    ]);
  }

  /**
   * Build query string from parameters
   * @param params - Object containing query parameters
   * @returns Query string
   */
  private buildQueryString(params: Record<string, string | number>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });

    return searchParams.toString();
  }

  /**
   * Make a GET request with query parameters
   * @param endpoint - The API endpoint to call
   * @param params - Query parameters
   * @returns Promise with the API response
   */
  async getWithParams<T>(
    endpoint: string,
    params: Record<string, string | number>
  ): Promise<T> {
    const queryString = this.buildQueryString(params);
    const fullEndpoint = `${endpoint}?${queryString}`;
    return this.get<T>(fullEndpoint);
  }
}

export const apiClient = new ApiClient(BASE_URL);
