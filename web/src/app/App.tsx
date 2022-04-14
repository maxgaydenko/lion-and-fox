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
      <div className='layer-content'>
        <div className='content-wrapper'>
         <div style={{textAlign:'center', padding: '1em 0'}}>content will be here later</div>
        </div>
      </div>
      <Sidebar onMenuClick={() => setMenuShown(!menuShown)} />
    </div>
  );
}

export default App;
