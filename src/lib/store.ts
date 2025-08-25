// Redux store configuration
import { configureStore } from "@reduxjs/toolkit"
import { bookmarkSlice } from "./slices/bookmarkSlice"
import { appSlice } from "./slices/appSlice"

/**
 * Configure Redux store with bookmark and app slices
 */
export const store = configureStore({
  reducer: {
    bookmarks: bookmarkSlice.reducer,
    app: appSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
