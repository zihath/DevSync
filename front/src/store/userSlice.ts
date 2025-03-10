import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  clerkId: string | null;
  username: string | null;
  email: string | null;
}
const initialState: UserState = {
  clerkId: null,
  username: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
