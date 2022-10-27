import en from './../../data/quotes-en.json';
import ru from './../../data/quotes-ru.json';
/* import { quoteContainer, authorContainer } from "./modules/value.js";

async function getQuotes() {
  let res;
  let lang = localStorage.getItem("lang") || "en";
  if (lang == "en") {
    res = await fetch("data/quotes-en.json");
  } else if (lang == "ru") {
    res = await fetch("data/quotes-ru.json");
  }
  const data = await res.json();
  changeQuotes(data);
}

function changeQuotes(data) {
  let num = Math.floor(Math.random() * data.length);
  showQuotes(data[num].text, data[num].author);
}

function showQuotes(text, author) {
  quoteContainer.textContent = text;
  authorContainer.textContent = author;
}
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotesEn: en,
  quotesRu: ru,
  activeQuote: '',
  activeAuthor: '',
};

export const quoteReducer = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    getQuote: (state, action) => {
      if (action.payload === 'en') {
        state.activeQuote =
          'Genius is one percent inspiration and ninety-nine percent perspiration.';
        state.activeAuthor = 'Thomas Edison';
      } else {
        state.activeQuote =
          'Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете';
        state.activeAuthor = 'Стив Макконнелл';
      }
    },
    changeQuote: (state, action) => {
      if (action.payload === 'en') {
        const num = Math.floor(Math.random() * state.quotesEn.length);
        state.activeQuote = state.quotesEn[num].text;
        state.activeAuthor = state.quotesEn[num].author;
      } else {
        const num = Math.floor(Math.random() * state.quotesRu.length);
        state.activeQuote = state.quotesRu[num].text;
        state.activeAuthor = state.quotesRu[num].author;
      }
    },
  },
});

export default quoteReducer.reducer;
export const { getQuote, changeQuote } = quoteReducer.actions;
