/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: false,
  setting: false,
  settings: {
    language: localStorage.getItem('lang') || 'en',
    city: localStorage.getItem('lang') === 'en' ? 'Minsk' : 'Минск',
    userName: localStorage.getItem('userName') || '',
    partsDay: 'afternoon',
    timeVisible: true,
    dateVisible: true,
    greetingVisible: true,
    quotesVisible: true,
    weatherVisible: true,
    playerVisible: true,
  },
  maxCountImage: 20,
  numberImage: 1,
  urlImage: '',
};

export const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTodo(state: any) {
      state.todo = !state.todo;
    },
    changeGreeting(state, action) {
      state.settings.partsDay = action.payload;
    },
    changeBackground(state, action) {
      if (action.payload > state.maxCountImage) {
        state.numberImage = 1;
      } else if (action.payload === 0) {
        state.numberImage = state.maxCountImage;
      } else {
        state.numberImage = action.payload;
      }
    },
    toggleSetting(state: any) {
      state.setting = !state.setting;
    },
    changeLanguage(state, action) {
      state.settings.language = action.payload;
    },
    changeVisibleTime(state, action) {
      state.settings.timeVisible = action.payload;
    },
    changeVisibleWeather(state, action) {
      state.settings.weatherVisible = action.payload;
    },
    changeVisiblePlayer(state, action) {
      state.settings.playerVisible = action.payload;
    },
    changeVisibleDate(state, action) {
      state.settings.dateVisible = action.payload;
    },
    changeVisibleGreeting(state, action) {
      state.settings.greetingVisible = action.payload;
    },
    changeVisibleQuotes(state, action) {
      state.settings.quotesVisible = action.payload;
    },
    changeCity(state, action) {
      state.settings.city = action.payload;
    },
    changeUserName(state, action) {
      state.settings.userName = action.payload;
      localStorage.setItem('userName', action.payload);
    },
    setUrlImage(state) {
      state.urlImage = `../../../assets/image/${state.settings.partsDay}/${state.numberImage}.avif`;
    },
  },
});

export default appReducer.reducer;
export const {
  setUrlImage,
  toggleTodo,
  toggleSetting,
  changeBackground,
  changeVisibleTime,
  changeVisibleDate,
  changeVisibleGreeting,
  changeVisibleQuotes,
  changeVisibleWeather,
  changeVisiblePlayer,
  changeCity,
  changeUserName,
  changeGreeting,
  changeLanguage,
} = appReducer.actions;
