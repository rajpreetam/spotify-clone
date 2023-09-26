import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../types';

export interface PlayerState {
  track: Track | null;
}

const initialState: PlayerState = {
  track: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setTrack: (state, { payload }) => {
      state.track = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTrack } = playerSlice.actions;

export default playerSlice.reducer;
