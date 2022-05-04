import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Sidebar } from "./Sidebar";
import { Menu } from "./Menu";
import { GET_STRUCT } from "../gqls/gqls";
import { combineMenu, IMenu, IMenuDataItem } from "../utils/menu";
import { Page } from "./Page";
import { PageHome } from "./PageHome";
import { PageError } from "./PageError";
import { AppError } from "./AppError";
import { PageLogin } from "./PageLogin";
import { PageProject } from "./PageProject";
import { PagePresentations } from "./PagePresentations";
import { DevPageGallery } from "./DevPageGallery";

interface IAuthUser {
 readonly id: string
 readonly name: string
}

interface IStructResult {
 readonly authenticatedItem: IAuthUser | null
 readonly pages: IMenuDataItem[];
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
   <App menu={combineMenu(data.pages!)} user={data.authenticatedItem} />
  </Router>
 ) : (
  <AppError title="Data error" message="Unable to load data" />
 );
}

interface IProps {
 readonly user: IAuthUser | null;
 readonly menu: IMenu;
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
   <div className="layer-background-video">
    <video id="video-home" muted loop autoPlay playsInline>
     <source type="video/webm" src="/video/OUT_1.webm" />
     <source type="video/mp4" src="/video/OUT_1.mp4" />
    </video>
   </div>
   {/* <div className="layer-ameba"></div> */}
   {/* <div className="layer-video">
    <video id="vi1" loop autoPlay={true}>
     <source type="video/webm" src='/video/LF.webm' />
    </video>
   </div> */}
   {/* <div className="layer-bg layer-bg-video layer-bg-home">
    <video id="video-home" muted loop autoPlay playsInline>
     <source type="video/webm" src="/video/LF.webm" />
    </video>
   </div> */}
   {/* <div className="layer-bg layer-bg-video layer-bg-base">
    <video id="video-base" muted loop autoPlay>
     <source type="video/webm" src="/video/LF_1.webm" />
    </video>
   </div> */}
   {/* <div className="layer-bg layer-bg-img layer-bg-base"></div> */}
   <div className="layer-radial"></div>
   <div className="layer-conic"></div>
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
      {props.user && <Route path="presentations" element={<PagePresentations onPageReady={pageLoaded} />} />}
      {!props.user && <Route path="login" element={<PageLogin onPageReady={homePageLoaded} />} />}
      <Route path="dev/gallery" element={<DevPageGallery />} />
      <Route path="*" element={<PageError onPageReady={pageLoaded} title="Ooops" message="Page not found" />} />
     </Routes>
    </div>
   </div>
   {/* </CSSTransition>
   </TransitionGroup> */}
   <Sidebar
    userName={props.user ? props.user.name : undefined}
    onMenuHide={() => setMenuShown(false)}
    onMenuClick={() => setMenuShown(!menuShown)}
   />
   <Menu userName={props.user ? props.user.name : undefined} onMenuHide={() => setMenuShown(false)} menu={props.menu} />
  </div>
 );
};

export default AppLoader;
