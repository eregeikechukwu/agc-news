//  Story (news article) object

export interface Story {
  id: number;
  author?: string;
  banner_image: string;
  description?: string;
  title?: string;
  created_at?: string;
  [key: string]: any; // allow flexibility in case backend sends extra fields
}

export interface StoryObject {
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  data: Story[];
}

export interface CategoryObject {
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  data: {
    data: Category[];
  };
}

export interface CategoryStoryObject {
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  data: Story[];
}

// Category object

export interface Category {
  id: string;
  category_name: string;
  slug?: string;
  description?: string;
  image_url?: string;
  [key: string]: any;
}

// Generic paginated API response

export interface ApiResponse<T> {
  current_page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data: T;
}

export interface ApiEnvelope<T> {
  data: T; // T will be Story[] or Category[] or Story
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  message?: string;
  status?: boolean;
}

export interface BookmarkState {
  bookmarkedStories: string[];
}

export interface AppState {
  selectedCategory: string | null; // Stores category ID
  searchQuery: string;
  searchInitQuery: string;
  isBackdropVisible: boolean;
}

export interface BookmarkState {
  bookmarkedStories: string[];
}
