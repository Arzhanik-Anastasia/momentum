import { createAsyncThunk } from '@reduxjs/toolkit';
const API_WEATHER = '6d818bc333fc417f63b5918fe81bea7a';

export const getWeather = createAsyncThunk(
  'weather/get',
  async (params: { city: string; lang: string }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&lang=${params.lang}&appid=${API_WEATHER}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);
