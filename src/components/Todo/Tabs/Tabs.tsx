import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeTab } from '../../../store/reducers/todoReducer';

const Tabs = () => {
  const dispatch = useAppDispatch();
  const tabs = [
    {
      title: 'All',
    },
    { title: 'Active' },
    {
      title: 'Done',
    },
  ];

  const activeTab = useAppSelector((state) => state.todo.activeTab);
  return (
    <section className="tab">
      {tabs.map((item, i) => {
        const classNames = item.title === activeTab ? 'tab__item tab-active' : 'tab__item';
        return (
          <div key={i} className={classNames} onClick={() => dispatch(changeTab(item.title))}>
            {item.title}
          </div>
        );
      })}
    </section>
  );
};
export default Tabs;
