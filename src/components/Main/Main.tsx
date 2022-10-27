import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeBackground, changeUserName, setUrlImage } from '../../store/reducers/appReducer';
import { DateToday } from '../Date/DateToday';
import { Time } from '../Time/Time';
import './main.css';

const Main = () => {
  const userName = useAppSelector((state) => state.settingsApp.settings.userName);
  const partsDay = useAppSelector((state) => state.settingsApp.settings.partsDay);
  const greetingVisible = useAppSelector((state) => state.settingsApp.settings.greetingVisible);
  const numberImage = useAppSelector((state) => state.settingsApp.numberImage);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const changeNumberImage = (numberImage: number) => {
    dispatch(changeBackground(numberImage));
    dispatch(setUrlImage());
  };

  return (
    <main className="main">
      <div className="slider-icons">
        <button
          className="slide-prev slider-icon"
          onClick={() => changeNumberImage(numberImage - 1)}
        ></button>
        <button
          className="slide-next slider-icon"
          onClick={() => changeNumberImage(numberImage + 1)}
        ></button>
      </div>
      <Time />
      <DateToday />
      <div className={greetingVisible ? 'greeting-container' : 'greeting-container hidden'}>
        <span className="greeting">{partsDay ? `${t(`main.${partsDay}`)}, ` : ''}</span>
        <input
          type="text"
          className="name"
          placeholder="Enter name"
          maxLength={10}
          value={userName}
          onChange={(e) => dispatch(changeUserName(e.target.value))}
        />
      </div>
    </main>
  );
};

export default Main;
