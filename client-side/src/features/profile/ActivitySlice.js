import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activities: [],
};

const recentActivitySlice = createSlice({
  name: 'recentActivity',
  initialState,
  reducers: {
    addActivity(state, action) {
      state.activities.push(action.payload);
    },
  },
});

export const { addActivity } = recentActivitySlice.actions;

export const selectRecentActivities = (state) => state.recentActivity.activities;

export default recentActivitySlice.reducer;
