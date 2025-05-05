// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API fetch with delay
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await new Promise(resolve =>
    setTimeout(() =>
      resolve(fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()))
    , 1000)
  );
  return res;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loading = false;
      });
  }
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
