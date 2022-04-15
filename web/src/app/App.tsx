import React from 'react';
// import {HashRouter as Router, Routes, Route} from "react-router-dom";
// import {Route} from "react-router";
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
         {/* <Router>
           <Routes>
            <Route path='/'>
              <React.Fragment>@home</React.Fragment>
            </Route>
            <Route path='/page'>
              <React.Fragment><PageCars /></React.Fragment>
            </Route>
           </Routes>
         </Router> */}
         <PageCars />
        </div>
      </div>
      <Sidebar onMenuClick={() => setMenuShown(!menuShown)} />
      <Menu />
    </div>
  );
}

export default App;
