import React from 'react';
import { Sidebar } from '../components/Sidebar';
// import { Counter } from '../features/counter/Counter';
// import { Logo } from '../features/logo/Logo';

function App() {
  const [menuShown, setMenuShown] = React.useState<boolean>(false);

  return (
    <div className={"App" + (menuShown? " App-menu-shown": "")}>
      <div className='layer-conic'></div>
      <div className='layer-ameba'></div>
      <div className='layer-content'>hello</div>
      <Sidebar onMenuClick={() => setMenuShown(!menuShown)} />
    </div>
  );
}

export default App;
