import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { formattedDate, formattedTime } from "./formattedTime";

const TIMELINE_COLLECTION = 'workingtimeline';

export const fetchUserWork = createAsyncThunk(
    "user/fetchUserWork",
    async (user, thunkAPI) => {
        if (user) {
            try {
                const date = formattedDate()
                const userWorkDocRef = doc(db, TIMELINE_COLLECTION, user.uid, user.displayName, date);
                const userWorkDoc = await getDoc(userWorkDocRef);

                const userWork = userWorkDoc.data() || {}
                const startTime = userWork.startTime || "";
                const endTime = userWork.endTime || "";

                if (!userWorkDoc.data()) {
                    try {
                        await setDoc(userWorkDocRef, {
                            startTime: startTime || "",
                            endTime: endTime || "",
                        }, { merge: true });
                    } catch (error) {
                        console.error(error);
                    }
                }
                return {
                    startTime, endTime, userUid: user.uid
                };
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
)

const updateWorkTime = async (user, time, isStartTime) => {
    try {
        const date = formattedDate();
        const userDocRef = doc(db, TIMELINE_COLLECTION, user.userId, user.name, date);
        await setDoc(userDocRef, { [isStartTime ? 'startTime' : 'endTime']: time }, { merge: true });
        return time;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
};

export const workStart = createAsyncThunk("user/workStart", async (user, thunkAPI) => {
    return await updateWorkTime(user, formattedTime(), true);
});

export const workEnd = createAsyncThunk("user/workEnd", async (user, thunkAPI) => {
    return await updateWorkTime(user, formattedTime(), false);
});

const initialState = {
    working: {
        startTime: "",
        endTime: "",
    },
    userId: ""
};

export const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
        setStartTime: (state, action) => {
            state.working.startTime = action.payload;
        },
        setEndTime: (state, action) => {
            state.working.endTime = action.payload;
        },
        clearTime: (state) => {
            state.working = {
                startTime: "",
                endTime: "",
            };
            state.userId = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserWork.fulfilled, (state, action) => {
                state.userId = action.payload.userUid;
                state.working = {
                    startTime: action.payload.startTime,
                    endTime: action.payload.endTime,
                };
            })
            .addCase(workStart.fulfilled, (state, action) => {
                state.working.startTime = action.payload;
            })
            .addCase(workEnd.fulfilled, (state, action) => {
                state.working.endTime = action.payload;
            });
    }
});

export const { setStartTime, setEndTime, clearTime } = workSlice.actions;
export default workSlice.reducer;