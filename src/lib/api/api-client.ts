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
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      clearTimeout(timer);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
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
