import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

// 구성설정
export default configureStore({
    reducer: {
        user: userReducer, // user는 키,
    },
});
