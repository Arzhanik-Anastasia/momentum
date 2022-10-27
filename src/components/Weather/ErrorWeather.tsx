import { useAppSelector } from '../../store/hooks';

export const ErrorWeather = () => {
  const lang = useAppSelector((state) => state.settingsApp.settings.language);
  return (
    <div className="weather-error">
      {lang === 'en' ? 'Invalid City' : 'Введенный город не существует'}
    </div>
  );
};
