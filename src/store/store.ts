import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import appReducer from './reducers/appReducer';
import playerReducer from './reducers/playerReducer';
import quotesReducer from './reducers/quotesReducer';
import todoReducer from './reducers/todoReducer';
import weatherReducer from './reducers/weatherReducer';

export const store = configureStore({
  reducer: {
    settingsApp: appReducer,
    player: playerReducer,
    todo: todoReducer,
    quote: quotesReducer,
    weather: weatherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
