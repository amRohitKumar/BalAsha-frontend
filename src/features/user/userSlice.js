import { createSlice } from '@reduxjs/toolkit'

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localstorage";

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, {payload}) => {
      console.log(payload);
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
});

export const { logoutUser, saveUser } = userSlice.actions;
export default userSlice.reducer;