// Bookmark management slice
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { BookmarkState } from "../types/api-types"

/**
 * Load bookmarks from localStorage with error handling
 * @returns Array of bookmarked story IDs
 */
const loadBookmarksFromStorage = (): string[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem("bookmarkedStories")
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error("Error loading bookmarks from localStorage:", error)
    return []
  }
}

/**
 * Save bookmarks to localStorage with error handling
 * @param bookmarks - Array of story IDs to save
 */
const saveBookmarksToStorage = (bookmarks: string[]) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("bookmarkedStories", JSON.stringify(bookmarks))
  } catch (error) {
    console.error("Error saving bookmarks to localStorage:", error)
  }
}

const initialState: BookmarkState = {
  bookmarkedStories: loadBookmarksFromStorage(),
}

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    /**
     * Toggle bookmark status for a story
     * @param state - Current bookmark state
     * @param action - Action with story ID payload
     */
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const storyId = action.payload
      if (!storyId) return

      const index = state.bookmarkedStories.indexOf(storyId)
      if (index > -1) {
        state.bookmarkedStories.splice(index, 1)
      } else {
        state.bookmarkedStories.push(storyId)
      }
      saveBookmarksToStorage(state.bookmarkedStories)
    },

    /**
     * Clear all bookmarks
     * @param state - Current bookmark state
     */
    clearBookmarks: (state) => {
      state.bookmarkedStories = []
      saveBookmarksToStorage([])
    },
  },
})

export const { toggleBookmark, clearBookmarks } = bookmarkSlice.actions
