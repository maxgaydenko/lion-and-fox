import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Sidebar } from "./Sidebar";
import { Menu } from "./Menu";
import { GET_STRUCT, LAST_ACCESS_UPDATE } from "../gqls/gqls";
import { combineMenu, IMenu, IMenuDataItem } from "../utils/menu";
import { Page } from "./Page";
import { PageHome } from "./PageHome";
import { PageError } from "./PageError";
import { AppError } from "./AppError";
import { PageLogin } from "./PageLogin";
import { PageProject } from "./PageProject";
import { PagePresentations } from "./PagePresentations";
import { DevPageGallery } from "./DevPageGallery";
import { IAuthUser } from "../utils/auth";
import { PageDemo } from "./PageDemo";

interface IStructResult {
 readonly authenticatedItem: IAuthUser | null;
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
   <>
    <App menu={combineMenu(data.pages!)} user={data.authenticatedItem} />
    {data.authenticatedItem && <AppLastAccess user={data.authenticatedItem} />}
   </>
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
     <source type="video/mp4" src={`/video/OUT111.mp4`} />
     <source type="video/webm" src={`/video/OUT111_1.webm`} />
    </video>
   </div>
   <div className="layer-radial"></div>
   <div className="layer-conic"></div>
   <div className="layer-content">
    <div className="content-wrapper">
     <Routes>
      <Route path="/" element={<PageHome onPageReady={homePageLoaded} />} />
      {props.menu.menuItems.map((f, i) => (
       <Route key={`pageRoute-${i}`} path={f.url} element={<Page url={f.url} menu={props.menu} onPageReady={pageLoaded} />} />
      ))}
      {props.menu.projectItems.map((route, i) => (
       <Route
        key={`projectRoute-${i}`}
        path={`${route.pageUrl}/${route.projectUrl}`}
        element={<PageProject pageUrl={route.pageUrl} projectUrl={route.projectUrl} menu={props.menu} onPageReady={pageLoaded} />}
       />
      ))}
      {props.user && <Route path="presentations" element={<PagePresentations user={props.user} onPageReady={pageLoaded} />} />}
      {!props.user && <Route path="login" element={<PageLogin onPageReady={homePageLoaded} />} />}
      <Route path="demo/:code" element={<PageDemo onPageReady={homePageLoaded} />} />
      <Route path="*" element={<PageError onPageReady={pageLoaded} title="Ooops" message="Page not found" />} />
     </Routes>
    </div>
   </div>
   <Sidebar
    userName={props.user ? props.user.name : undefined}
    onMenuHide={() => setMenuShown(false)}
    onMenuClick={() => setMenuShown(!menuShown)}
   />
   <Menu userName={props.user ? props.user.name : undefined} onMenuHide={() => setMenuShown(false)} menu={props.menu} />
  </div>
 );
};

interface IAppLastAccessProps {
 readonly user: IAuthUser;
}

const AppLastAccess: React.FC<IAppLastAccessProps> = (props: IAppLastAccessProps) => {
 const [handle] = useMutation(LAST_ACCESS_UPDATE);
 React.useEffect(() => {
  const now = new Date();
  handle({
   variables: {
    id: props.user.id,
    date: now.toISOString(),
   },
  });
 }, []);
 return <div className="App-last-access" />;
};

export default AppLoader;
