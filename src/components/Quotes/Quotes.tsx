import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeQuote, getQuote } from '../../store/reducers/quotesReducer';
import './quotes.css';

const Quotes = () => {
  const quote = useAppSelector((state) => state.quote.activeQuote);
  const author = useAppSelector((state) => state.quote.activeAuthor);
  const lang = useAppSelector((state) => state.settingsApp.settings.language);
  const dispatch = useAppDispatch();
  const quotesVisible = useAppSelector((state) => state.settingsApp.settings.quotesVisible);

  useEffect(() => {
    dispatch(getQuote(lang));
  }, [lang]);

  const onChangeQuote = () => {
    dispatch(changeQuote(lang));
  };

  return (
    <div className={quotesVisible ? 'container__quote' : 'container__quote hidden'}>
      <button className="change-quote" onClick={() => onChangeQuote()}></button>
      <div className="quote">{quote}</div>
      <div className="author">{author}</div>
    </div>
  );
};
export default Quotes;
