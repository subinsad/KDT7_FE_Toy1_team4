import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (user, thunkAPI) => {
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                const userData = userDoc.data() || {}; // 데이터가 없을 경우 빈 객체로 초기화
                const userShortInfo = userData.shortInfo || '';
                const userPhone = userData.phoneNumber || '';
                const userJob = userData.job || '';
                const userBg = userData.bg || '';

                const userName = user.displayName;
                const userEmail = user.email;
                const userPhotoURL = user.photoURL || '';
                const userUid = user.uid;

                if (!userDoc.data()) {
                    try {
                        await setDoc(
                            userDocRef,
                            {
                                name: userName,
                                email: userEmail,
                                phoneNumber: userPhone || '',
                                photoURL: userPhotoURL,
                                job: userJob || '',
                                shortInfo: userShortInfo || '',
                                bg: userBg || '',
                            },
                            { merge: true }
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }
                return {
                    userShortInfo,
                    userPhone,
                    userJob,
                    userBg,
                    userName,
                    userEmail,
                    userPhotoURL,
                    userUid,
                };
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    userInfo: {
        userId: '',
        name: '',
        shortInfo: '',
        userImg: '',
        userEmail: '',
        userPhone: '',
        userJob: '',
        userBg: '',
    },
    isLoading: false,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        editUser: (state, action) => {
            const { userPhone, userJob, shortInfo } = action.payload;
            state.userInfo = {
                ...state.userInfo,
                userPhone: userPhone,
                userJob: userJob,
                shortInfo: shortInfo,
            };
        },
        editUserImg: (state, action) => {
            state.userInfo = {
                ...state.userInfo,
                userImg: action.payload,
            };
        },
        editUserBg: (state, action) => {
            state.userInfo = {
                ...state.userInfo,
                userBg: action.payload,
            };
        },
        clearUser: (state) => {
            (state.userInfo = {
                userId: '',
                name: '',
                shortInfo: '',
                userImg: '',
                userEmail: '',
                userPhone: '',
                userJob: '',
                userBg: '',
            }),
                (state.isLoading = false),
                (state.error = '');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = {
                    ...state.userInfo,
                    userId: action.payload.userUid,
                    name: action.payload.userName,
                    shortInfo: action.payload.userShortInfo,
                    userImg: action.payload.userPhotoURL,
                    userEmail: action.payload.userEmail,
                    userPhone: action.payload.userPhone,
                    userJob: action.payload.userJob,
                    userBg: action.payload.userBg,
                };
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUser, editUser, editUserImg, editUserBg } =
    userSlice.actions;
export default userSlice.reducer;
