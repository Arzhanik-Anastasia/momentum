import { useAppDispatch } from '../../store/hooks';
import { toggleSetting } from '../../store/reducers/appReducer';

const SettingBtn = () => {
  const dispatch = useAppDispatch();
  return <div className="setting-btn" onClick={() => dispatch(toggleSetting())}></div>;
};

export default SettingBtn;
