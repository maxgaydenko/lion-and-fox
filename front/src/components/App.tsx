import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import { PageCars } from "./PageCars";
import { Sidebar } from "./Sidebar";
import { Menu } from "./Menu";
import { GET_STRUCT } from "../gqls/gqls";
import { combineMenu, IMenu, IMenuDataItem } from "../utils/menu";
import { Page } from "./Page";
import { PageHome } from "./PageHome";
import { PageGallery } from "./PageGallery";
import { PageError } from "./PageError";
import { AppError } from "./AppError";
import { PageLogin } from "./PageLogin";
import { PageProject } from "./PageProject";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

interface IStructResult {
 pages: IMenuDataItem[];
}

function AppLoader() {
 //  const [menuShown, setMenuShown] = React.useState<boolean>(false);
 const { data, loading, error } = useQuery<IStructResult>(GET_STRUCT, {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: "no-cache",
 });

 if (loading) return <div>@loading</div>;
 if (error) {
  console.log("Loading error", error);
  return <AppError title={error.name} message={error.message} />;
  // return <div>{error.message}</div>;
 }

 return data ? (
  <Router>
   <App menu={combineMenu(data.pages!)} />
  </Router>
 ) : (
  <AppError title="Data error" message="Unable to load data" />
 );
}

interface IProps {
 menu: IMenu;
}

const App: React.FC<IProps> = (props: IProps) => {
 //  const location = useLocation();
 const [homeMarker, setHomeMarker] = React.useState<boolean>(false);
 const [menuShown, setMenuShown] = React.useState<boolean>(false);

 const pageLoaded = () => {
  setHomeMarker(false);
  setMenuShown(false);
 };

 const homePageLoaded = () => {
  setHomeMarker(true);
  setMenuShown(false);
 };

 return (
  <div className={"App" + (homeMarker ? " App-home" : " App-page") + (menuShown ? " App-menu-shown" : "")}>
   <div className="layer-conic"></div>
   <div className="layer-ameba"></div>
   {/* <TransitionGroup component={null}>
    <CSSTransition key={location.key} classNames="PageFade" timeout={400}> */}
   <div className="layer-content">
    <div className="content-wrapper">
     <Routes>
      <Route path="/" element={<PageHome onPageReady={homePageLoaded} />} />
      {props.menu.menuItems
       // .filter(f => f.type === EMenuItemType.Page)
       .map((f, i) => (
        <Route key={`pageRoute-${i}`} path={f.url} element={<Page url={f.url} menu={props.menu} onPageReady={pageLoaded} />} />
       ))}
      {props.menu.projectItems.map((route, i) => (
       <Route
        key={`projectRoute-${i}`}
        path={`${route.pageUrl}/${route.projectUrl}`}
        element={<PageProject pageUrl={route.pageUrl} projectUrl={route.projectUrl} menu={props.menu} onPageReady={pageLoaded} />}
       />
      ))}
      <Route path="dev/gallery" element={<PageGallery />} />
      <Route path="dev/login" element={<PageLogin />} />
      <Route path="*" element={<PageError onPageReady={pageLoaded} title="Ooops" message="Page not found" />} />
     </Routes>
    </div>
   </div>
   {/* </CSSTransition>
   </TransitionGroup> */}
   <Sidebar onMenuHide={() => setMenuShown(false)} onMenuClick={() => setMenuShown(!menuShown)} />
   <Menu onMenuHide={() => setMenuShown(false)} menu={props.menu} />
  </div>
 );
};

export default AppLoader;
