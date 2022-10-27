import { createSlice } from '@reduxjs/toolkit';
import { playList } from '../../components/Player/playList';

const initialState = {
  sounds: playList,
  activeSound: null,
  /*  currentTime: 0,
  durationTime: 0, */
  volume: 'on',
  volumeControl: 0.75,
  /*  soundControl: 0, */
};

export const playerReducer = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    changeVolume: (state, action) => {
      state.volumeControl = action.payload;
    },
  },
});

export default playerReducer.reducer;
export const { changeVolume } = playerReducer.actions;
