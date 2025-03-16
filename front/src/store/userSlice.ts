import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  email: string | null;
  _id: string | null;
  joinedRooms: string[];
  createdRooms: string[];
}
const initialState: UserState = {
  username: null,
  email: null,
  _id: null,
  joinedRooms: [],
  createdRooms: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    addJoinedRoom: (state, action: PayloadAction<string[]>) => {
      state.joinedRooms = action.payload;
    },
    addCreatedRoom: (state, action: PayloadAction<string[]>) => {
      state.createdRooms = action.payload;
    },
    removeCreatedRoom: (state, action: PayloadAction<string>) => {
      state.createdRooms = state.createdRooms.filter(
        (room) => room !== action.payload
      );
    },
    removeJoinedRoom: (state, action: PayloadAction<string>) => {
      state.joinedRooms = state.joinedRooms.filter(
        (room) => room !== action.payload
      );
    },
  },
});

export const {
  setUser,
  addJoinedRoom,
  addCreatedRoom,
  removeCreatedRoom,
  removeJoinedRoom,
} = userSlice.actions;
export default userSlice.reducer;
