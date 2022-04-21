import React from "react";
import { PageCars } from "./PageCars";
import { Sidebar } from "./Sidebar";
import { Menu } from "./Menu";
import { GET_MENU_PAGES, IMenuLoaded } from "../hooks/use-menu-load";
import { useQuery } from "@apollo/client";

function App() {
 const [menuShown, setMenuShown] = React.useState<boolean>(false);
 const { data } = useQuery<IMenuLoaded>(GET_MENU_PAGES, {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: "no-cache",
 });

 // React.useEffect(() => {
 //   const menuLoad = useMenuLoad();
 //   if(menuLoad.data)
 //    setMenuData(menuLoad.data);
 // }, []);

 return (
  <div className={"App" + (menuShown ? " App-menu-shown" : "")}>
   <div className="layer-conic"></div>
   <div className="layer-ameba"></div>
   <div className="layer-content">
    <div className="content-wrapper">
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
   {data && <Menu pageItems={data.pages} galleryItems={[]} />}
  </div>
 );
}

export default App;
