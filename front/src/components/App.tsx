import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Sidebar } from "./Sidebar";
import { Menu } from "./Menu";
import { GET_STRUCT, LAST_ACCESS_UPDATE } from "../gqls/gqls";
import { combineSiteStruct, ISiteStruct, IStructPageDataItem } from "../utils/struct";
import { Page } from "./Page";
import { PageHome } from "./PageHome";
import { PageError } from "./PageError";
import { AppError } from "./AppError";
import { PageLogin } from "./PageLogin";
// import { PageProject } from "./PageProject";
import { PagePresentations } from "./PagePresentations";
import { IAuthUser } from "../utils/auth";
import { PageDemo } from "./PageDemo";
import { IPopupGallery, PopupGallery } from "./PopupGallery";
import { LinkPopupGallery } from "./LinkPopupGallery";
import { LinkPopupVideo } from "./LinkPopupVideo";

interface IStructResult {
 readonly authenticatedItem: IAuthUser | null;
 readonly pages: IStructPageDataItem[];
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

 if (data) console.log("App user: ", data.authenticatedItem ? `${data.authenticatedItem.name} [${data.authenticatedItem.role}]` : null);

 return data ? (
  <Router>
   <>
    <App siteStruct={combineSiteStruct(data.pages.sort(f => f.pos)!)} user={data.authenticatedItem} />
    {data.authenticatedItem && <AppLastAccess user={data.authenticatedItem} />}
   </>
  </Router>
 ) : (
  <AppError title="Data error" message="Unable to load data" />
 );
}

interface IProps {
 readonly user: IAuthUser | null;
 readonly siteStruct: ISiteStruct;
}

const App: React.FC<IProps> = (props: IProps) => {
 const [homeMarker, setHomeMarker] = React.useState<boolean>(false);
 const [menuShown, setMenuShown] = React.useState<boolean>(false);
 const [popupGallery, setPopupGallery] = React.useState<IPopupGallery>();
 const [linkPopupGalleryId, setLinkPopupGalleryId] = React.useState<string>();
 const [linkPopupVideoId, setLinkPopupVideoId] = React.useState<string>();

 React.useEffect(() => {
  const onHashChange = () => {
   const hash = window.location.hash;
   console.log("Hash changed", hash);
   const prefix = hash.substring(0, 3);
   switch (prefix) {
    case "#g:":
     setLinkPopupGalleryId(hash.substring(3));
     break;
    case "#v:":
     setLinkPopupVideoId(hash.substring(3));
     break;
    default:
    // nothing to do
   }
  };
  window.addEventListener("hashchange", onHashChange);
  onHashChange();
 }, []);

 const closeLinkPopupGallery = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
  setLinkPopupGalleryId(undefined);
 };

 const closeLinkPopupVideo = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
  setLinkPopupVideoId(undefined);
 };

 const pageLoaded = () => {
  setHomeMarker(false);
  setMenuShown(false);
 };

 const homePageLoaded = () => {
  setHomeMarker(true);
  setMenuShown(false);
 };

 const sidebarUserName = (): string | undefined => {
  if (props.user && props.user.role !== "demo") {
   return props.user.name;
   // return props.user.role === "demo" ? props.user.name.substring(0, 18) : props.user.name;
  }
  return undefined;
 };

 return (
  <div className="AppBox">
   {linkPopupGalleryId && <LinkPopupGallery galleryId={linkPopupGalleryId} onClose={closeLinkPopupGallery} />}
   {linkPopupVideoId && <LinkPopupVideo videoId={linkPopupVideoId} onClose={closeLinkPopupVideo} />}
   {popupGallery && <PopupGallery popupGallery={popupGallery} onClose={() => setPopupGallery(undefined)} />}
   <div className={"App" + (homeMarker ? " App-home" : " App-page") + (menuShown ? " App-menu-shown" : "")}>
    <div className="layer-background-video">
     <video id="video-home" poster={`/video/lf0513a.jpg`} muted loop autoPlay playsInline>
      <source type="video/mp4" src={`/video/lf0513a.mp4`} />
      <source type="video/webm" src={`/video/lf0513a.webm`} />
     </video>
    </div>
    <div className="layer-radial"></div>
    <div className="layer-conic"></div>
    <div className="layer-content">
     <div className="content-wrapper">
      <Routes>
       <Route path="/" element={<PageHome onPageReady={homePageLoaded} />} />
       {props.siteStruct.urls.map((f, i) => (
        <Route
         key={`pageRoute-${i}`}
         path={f}
         element={<Page url={f} pages={props.siteStruct.pages} onPageReady={pageLoaded} showPopupGallery={f => setPopupGallery(f)} />}
        />
       ))}
       <Route
        path="presentations"
        element={<PagePresentations user={props.user} onPageReady={pageLoaded} showPopupGallery={f => setPopupGallery(f)} />}
       />
       <Route path="login" element={<PageLogin onPageReady={homePageLoaded} />} />
       {/* {props.user && <Route path="presentations" element={<PagePresentations user={props.user} onPageReady={pageLoaded} showPopupGallery={f => setPopupGallery(f)} />} />} */}
       {/* {!props.user && <Route path="login" element={<PageLogin onPageReady={homePageLoaded} />} />} */}
       <Route path="demo/:code" element={<PageDemo onPageReady={homePageLoaded} />} />
       <Route path="*" element={<PageError onPageReady={pageLoaded} title="Ooops" message="Page not found" />} />
      </Routes>
     </div>
    </div>
    <Sidebar userName={sidebarUserName()} onMenuHide={() => setMenuShown(false)} onMenuClick={() => setMenuShown(!menuShown)} />
    <Menu
     userName={props.user && props.user.role !== "demo" ? props.user.name : undefined}
     onMenuHide={() => setMenuShown(false)}
     menu={props.siteStruct.menu}
     pages={props.siteStruct.pages}
    />
   </div>
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
