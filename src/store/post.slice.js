import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchPosts = createAsyncThunk(
    'user/fetchPosts',
    async (_, thunkAPI) => {
        try {
            const postsQuery = query(
                collection(db, 'posts'),
                orderBy('createAt', 'desc')
            );
            const snapshot = await getDocs(postsQuery);
            const newPosts = snapshot.docs.map((doc) => {
                const {
                    title,
                    textContent,
                    createAt,
                    userId,
                    username,
                    photo,
                } = doc.data();

                return {
                    title,
                    textContent,
                    createAt,
                    userId,
                    username,
                    photo,
                    id: doc.id,
                };
            });
            return newPosts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    posts: [],
    error: '',
};

export const postSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts = [...state.posts, action.payload];
        },
        addPostWithImg: (state, action) => {
            const post = state.posts.filter(
                (post) => post.id === action.payload.id
            );
            post.photo = action.payload.photoURL;
        },
        deletePost: (state, action) => {
            const filteredPosts = state.posts.filter(
                (post) => post.id !== action.payload
            );
            state.posts = filteredPosts;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = [...action.payload];
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { addPost, addPostWithImg, deletePost } = postSlice.actions;
export default postSlice.reducer;
