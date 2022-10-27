import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getWeather } from '../../store/thunk/weather';
import './weatcher.css';
import './owfont-regular.css';
import { DescriptionWeather } from './DescriptionWeather';
import { ErrorWeather } from './ErrorWeather';
import { changeCity } from '../../store/reducers/appReducer';
import { useTranslation } from 'react-i18next';

const Weather = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.settingsApp.settings.city);
  const lang = useAppSelector((state) => state.settingsApp.settings.language);
  const weatherVisible = useAppSelector((state) => state.settingsApp.settings.weatherVisible);
  const err = useAppSelector((state) => state.weather.err);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getWeather({ lang, city }));
  }, [city, dispatch, lang]);

  return (
    <div className={weatherVisible ? 'weather' : 'weather hidden'}>
      <input
        type="text"
        className="city"
        placeholder={t('header.city placeholder')}
        value={city}
        onChange={(e) => dispatch(changeCity(e.target.value))}
      />
      <div>{err ? <ErrorWeather /> : <DescriptionWeather />}</div>
      {/* Вынести ошибку как отдельный компонент*/}
    </div>
  );
};
export default Weather;
