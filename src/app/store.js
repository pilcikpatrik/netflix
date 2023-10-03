import { configureStore } from '@reduxjs/toolkit'
import { tmdbApi } from '../services/TMBD'
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import useReducer from '../features/auth';


export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: useReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
})
