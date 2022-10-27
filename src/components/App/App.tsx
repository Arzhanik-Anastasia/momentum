import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUrlImage } from '../../store/reducers/appReducer';

import Main from '../Main/Main';
import Player from '../Player/Player';
import Quotes from '../Quotes/Quotes';
import Setting from '../Setting/Setting';
import SettingBtn from '../Setting/SettingBtn';
import Todo from '../Todo/Todo';
import TodoBtn from '../Todo/TodoBtn';
import Weather from '../Weather/Weather';

const App = () => {
  const todoStatus = useAppSelector((state) => state.settingsApp.todo);
  const settingStatus = useAppSelector((state) => state.settingsApp.setting);
  const urlImage = useAppSelector((state) => state.settingsApp.urlImage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUrlImage());
    const newImg = new Image();
    newImg.src = urlImage;
    newImg.onload = () => {
      document.body.style.backgroundImage = `url(${urlImage})`;
    };
  }, [urlImage]);

  return (
    <>
      <div className="header">
        <Player />
        <Weather />
      </div>
      <Main />
      <Quotes />
      {todoStatus ? <Todo /> : <TodoBtn />}
      {settingStatus ? <Setting /> : <SettingBtn />}
    </>
  );
};

export default App;
