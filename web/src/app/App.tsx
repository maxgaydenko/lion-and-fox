import React from 'react';
import { Menu } from '../components/Menu';
import { PageCars } from '../components/PageCars';
import { Sidebar } from '../components/Sidebar';
// import { Counter } from '../features/counter/Counter';
// import { Logo } from '../features/logo/Logo';

function App() {
  const [menuShown, setMenuShown] = React.useState<boolean>(false);

  return (
    <div className={"App" + (menuShown? " App-menu-shown": "")}>
      <div className='layer-conic'></div>
      <div className='layer-ameba'></div>
      <div className='layer-content'>
        <div className='content-wrapper'>
         <PageCars />
        </div>
      </div>
      <Sidebar onMenuClick={() => setMenuShown(!menuShown)} />
      <Menu />
    </div>
  );
}

export default App;
