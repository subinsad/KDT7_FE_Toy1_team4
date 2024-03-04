import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { fetchUserInfo } from '../user/userSlice';

// 파이어베이스에서 데이터를 가져오는 비동기 thunk 액션 생성자 = fetchPosts
export const fetchPosts = createAsyncThunk(
    'user/fetchPosts',
    //1. 비동기 안에=> 파이어베이스 db를 docRef로 가져온다
    async (_, thunkAPI) => {
        const postsQuery = query(
            collection(db, 'posts'),
            orderBy('createAt', 'desc')
        );
        try {
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
        addPostImg: (state, action) => {
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

export const { addPost, addPostImg, deletePost } = postSlice.actions;
export default postSlice.reducer;
