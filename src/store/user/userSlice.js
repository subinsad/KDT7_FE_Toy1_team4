import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

//비동기로 정보를 가져온다.
// 비동기로 먼저 빈 값 배열을 가져온 후 없다면 있게 만들어주는 로직
export const fetchUser = createAsyncThunk(
    'user/fetchUserInfo',
    async (user, thunkAPI) => {
        if (user) {
            // user 사용자 객체가 있는지 먼저 확인
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef); // 파이어베이스에서 객체 가져옴

                const userShortInfo = userDoc.data()?.shortInfo;
                const userPhone = userDoc.data()?.phoneNumber;
                const userJob = userDoc.data()?.job;
                const userBg = userDoc.data()?.bg;

                //이건 생성된 user값을 가져와서 사용(기본값)
                const userName = user.displayName;
                const userUid = user.uid;
                const userPhotoURL = user.photoURL;
                const userEmail = user.email;

                // 없으면 setDoc으로 생성해줘야함 or 업데이트
                try {
                    await setDoc(
                        userDocRef,
                        {
                            name: displayName,
                            email: email,
                            phoneNumber: userPhone || '',
                            photoURL: photoURL,
                            job: userJob || '',
                            shortInfo: userShortInfo || '',
                            bg: userBg || '',
                        },
                        { merge: true }
                    );
                } catch (error) {
                    return thunkAPI.rejectWithValue(error.message);
                }
                return {
                    userUid,
                    userName,
                    shortInfo,
                    userEmail,
                    userPhone,
                    userJob,
                    userPhotoURL,
                    userBg,
                };
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

//초기상태, 작성하는 공간을 생성
const initialState = {
    userInfo: {
        user: '박수빈',
        name: '박수빈이름',
        shortInfo: '',
        userEmail: '',
        userPhone: '',
        userJob: '',
        userImg: '',
        userBg: '',
    },
};

//실제 리듀서가 동작하는 userSlice를 작성

export const userSlice = createSlice({
    name: 'user',
    initialState, // 초기상태

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'success';
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
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default userSlice.reducer; //리듀서도 export해서 스토어에 리듀서 등록하게 함
