import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';

export const DescriptionWeather = () => {
  const weather = useAppSelector((state) => state.weather.weather);

  const { t } = useTranslation();
  const classNames = weather.weather ? `weather-icon owf owf-${weather.weather[0].id}` : '';
  if (weather.weather) {
    return (
      <div className="description-container">
        <i className={classNames}></i>
        <span className="temperature">{Math.round(weather.main.temp)}°C</span>
        <span className="weather-description">{weather.weather[0].description}</span>
        <div className="wind">
          {t('header.wind')}: {Math.round(weather.wind.speed)} m/s
        </div>
        <div className="humidity">
          {t('header.humidity')}: {Math.round(weather.main.humidity)}%
        </div>
      </div>
    );
  }

  return <div className="description-container">{t('header.set City')}</div>;
};
