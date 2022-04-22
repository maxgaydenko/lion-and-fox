import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PageCars } from "./PageCars";
import { Sidebar } from "./Sidebar";
import { Menu } from "./Menu";
import { GET_MENU_PAGES, IMenuLoaded } from "../hooks/use-menu-load";
import { combineMenu, EMenuRouteComponentType, IMenu } from "../utils/menu";
import { Page } from "./Page";

function AppLoader() {
//  const [menuShown, setMenuShown] = React.useState<boolean>(false);
 const { data, loading, error } = useQuery<IMenuLoaded>(GET_MENU_PAGES, {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: "no-cache",
 });

 if(loading) return <div>@loading</div>
 if(error) {
   console.log('Loading error', error);
   return <div>{error.message}</div>
 }

 return data? <App menu={combineMenu(data.pages!, [])} />: <div>No data</div>

 // React.useEffect(() => {
 //   const menuLoad = useMenuLoad();
 //   if(menuLoad.data)
 //    setMenuData(menuLoad.data);
 // }, []);
//  return (
//   <Router>
//    <div className={"App" + (menuShown ? " App-menu-shown" : "")}>
//     <div className="layer-conic"></div>
//     <div className="layer-ameba"></div>
//     <div className="layer-content">
//      <div className="content-wrapper">
//       <Routes>
//        <Route path="/" element={<div>@home</div>} />
//        <Route path="page1" element={<div>Page1</div>} />
//        <Route path="page1/sub1" element={<div>Page1.1</div>} />
//        <Route path="page1/sub1/sub1" element={<div>Page1.1.1</div>} />
//        <Route path="page2" element={<div>Page2</div>} />
//        <Route path="*" element={<div>@notFound</div>} />
//       </Routes>
//       {/* <Router>
//            <Routes>
//             <Route path='/'>
//               <React.Fragment>@home</React.Fragment>
//             </Route>
//             <Route path='/page'>
//               <React.Fragment><PageCars /></React.Fragment>
//             </Route>
//            </Routes>
//          </Router> */}

//       {/* <PageCars /> */}
//      </div>
//     </div>
//     <Sidebar onMenuClick={() => setMenuShown(!menuShown)} />
//     {data && <Menu pageItems={data.pages} galleryItems={[]} />}
//    </div>
//   </Router>
//  );
}

interface IProps {
  menu: IMenu
}

const App: React.FC<IProps> = (props: IProps) => {
  const [menuShown, setMenuShown] = React.useState<boolean>(false);

  const menuHide = () => setMenuShown(false);

  return (
    <Router>
    <div className={"App" + (menuShown ? " App-menu-shown" : "")}>
     <div className="layer-conic"></div>
     <div className="layer-ameba"></div>
     <div className="layer-content">
      <div className="content-wrapper">
       <Routes>
        <Route path="/" element={<div>@home</div>} />
        {props.menu.items.filter(f => f.routeComponentType===EMenuRouteComponentType.Page).map((f,i) => <Route key={i} path={f.url} element={<Page url={f.url} menu={props.menu} onPageReady={menuHide} />} />)}
        {/* <Route path="page1" element={<div>Page1</div>} />
        <Route path="page1/sub1" element={<div>Page1.1</div>} />
        <Route path="page1/sub1/sub1" element={<div>Page1.1.1</div>} />
        <Route path="page2" element={<div>Page2</div>} /> */}
        <Route path="*" element={<div>@notFound</div>} />
       </Routes>
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
 
       {/* <PageCars /> */}
      </div>
     </div>
     <Sidebar onMenuClick={() => setMenuShown(!menuShown)} />
     <Menu menu={props.menu} />
    </div>
   </Router> 
  )
}

export default AppLoader;
