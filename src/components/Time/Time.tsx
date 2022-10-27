import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeGreeting } from '../../store/reducers/appReducer';
import './time.css';

export const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [greet, setGreet] = useState('afternoon');
  const partsDay = useAppSelector((state) => state.settingsApp.settings.partsDay);
  const dispatch = useAppDispatch();
  const timeVisible = useAppSelector((state) => state.settingsApp.settings.timeVisible);

  const changeGreet = (hour: number) => {
    if (hour > 6 && hour < 12) {
      setGreet('morning');
    } else if (hour >= 12 && hour < 18) {
      setGreet('afternoon');
    } else if (hour >= 18) {
      setGreet('evening');
    } else {
      setGreet('night');
    }
  };

  useEffect(() => {
    if (greet !== partsDay) {
      dispatch(changeGreeting(greet));
    }
  }, [dispatch, greet, partsDay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      changeGreet(+new Date().getHours());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <time className={timeVisible ? 'time' : 'time hidden'}>{time}</time>;
};
