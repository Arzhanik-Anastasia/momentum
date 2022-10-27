import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeVisibleTime,
  changeVisibleDate,
  toggleSetting,
  changeLanguage,
  changeVisibleGreeting,
  changeVisibleWeather,
  changeVisiblePlayer,
  changeVisibleQuotes,
} from '../../store/reducers/appReducer';
import './setting.css';
import { SvgChecked } from './svgChecked';
import { SvgUnChecked } from './svgUnCheckerd';

const Setting = () => {
  const {
    timeVisible,
    dateVisible,
    greetingVisible,
    quotesVisible,
    weatherVisible,
    playerVisible,
    language,
  } = useAppSelector((state) => state.settingsApp.settings);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const togglerLang = (language: string) => {
    dispatch(changeLanguage(language));
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  };

  return (
    <div className="setting-modal">
      <div className="setting-close" onClick={() => dispatch(toggleSetting())}></div>
      <div className="lang">
        <select
          className="language"
          onChange={(e) => {
            togglerLang(e.target.value);
          }}
          value={language}
        >
          <option value="en" className="option_en">
            EN
          </option>
          <option value="ru" className="option_ru">
            RU
          </option>
        </select>
      </div>

      <label htmlFor="checkbox-time" className="label-time">
        <div className="input_wrapper">
          <input
            className="none-time-input"
            type="checkbox"
            id="checkbox-time"
            checked={timeVisible}
            onChange={() => dispatch(changeVisibleTime(!timeVisible))}
          />
          <SvgChecked />
          <SvgUnChecked />
        </div>
        <p>Time</p>
      </label>

      <label htmlFor="checkbox-date" className="label-date">
        <div className="input_wrapper">
          <input
            className="none-date-input"
            type="checkbox"
            id="checkbox-date"
            checked={dateVisible}
            onChange={() => dispatch(changeVisibleDate(!dateVisible))}
          />
          <SvgChecked />
          <SvgUnChecked />
        </div>
        <p>Date</p>
      </label>

      <label htmlFor="checkbox-greeting" className="label-greet">
        <div className="input_wrapper">
          <input
            className="none-greeting-input"
            type="checkbox"
            id="checkbox-greeting"
            checked={greetingVisible}
            onChange={() => dispatch(changeVisibleGreeting(!greetingVisible))}
          />
          <SvgChecked />
          <SvgUnChecked />
        </div>
        <p>Greeting</p>
      </label>

      <label htmlFor="checkbox-quotes" className="label-quotes">
        <div className="input_wrapper">
          <input
            type="checkbox"
            className="none-quotes-input"
            id="checkbox-quotes"
            checked={quotesVisible}
            onChange={() => dispatch(changeVisibleQuotes(!quotesVisible))}
          />
          <SvgChecked />
          <SvgUnChecked />
        </div>

        <p>Quotes</p>
      </label>

      <label htmlFor="checkbox-weather" className="label-weather">
        <div className="input_wrapper">
          <input
            className="none-weather-input"
            type="checkbox"
            id="checkbox-weather"
            checked={weatherVisible}
            onChange={() => dispatch(changeVisibleWeather(!weatherVisible))}
          />
          <SvgChecked />
          <SvgUnChecked />
        </div>
        <p>Weather</p>
      </label>

      <label htmlFor="checkbox-player" className="label-player">
        <div className="input_wrapper">
          <input
            className="none-player-input"
            id="checkbox-player"
            type="checkbox"
            checked={playerVisible}
            onChange={() => dispatch(changeVisiblePlayer(!playerVisible))}
          />
          <SvgChecked />
          <SvgUnChecked />
        </div>

        <p>Player</p>
      </label>
    </div>
  );
};
export default Setting;
