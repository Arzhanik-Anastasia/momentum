/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { getWeather } from '../thunk/weather';

type IWeather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

type IWeatherState = {
  weather: {
    weather: IWeather[];
    wind: {
      deg: number;
      gust: number;
      speed: number;
    };
    main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
  };
  err: boolean;
};

const initialState: IWeatherState = {
  weather: {
    weather: [{ id: 0, main: '', description: '', icon: '' }],
    wind: {
      deg: 0,
      gust: 0,
      speed: 0,
    },
    main: {
      feels_like: 0,
      grnd_level: 0,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  },
  err: false,
};

export const weatherReducer = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.err = false;
      if (action.payload.cod === '404') {
        state.err = true;
      }
      state.weather = action.payload;
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      console.log('rejected');
    });
  },
});

export default weatherReducer.reducer;
