import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import './dateToday.css';

export const DateToday = () => {
  const { t } = useTranslation();
  const dateVisible = useAppSelector((state) => state.settingsApp.settings.dateVisible);
  const date = new Date();
  const dateString = `${t(`main.days.${[date.getDay()]}`)}, ${t(
    `main.months.${[date.getMonth()]}`
  )} ${date.getDate()}`;
  return <div className={dateVisible ? 'date' : 'date hidden'}>{dateString}</div>;
};
