import React from "react";
import { Link } from "react-router-dom";
import { onAppLogout } from "../utils/auth";
import { EMenuItemPosition, ISiteMenuItem, TSiteStructPagesMap } from "../utils/struct";

interface IProps {
 menu: ISiteMenuItem[];
 pages: TSiteStructPagesMap;
 userName?: string;
 onMenuHide: () => void;
}

interface IMenuListItem {
 readonly url: string;
 readonly title: string;
 readonly isSection: boolean;
 readonly pos: EMenuItemPosition;
}

export const Menu: React.FC<IProps> = (props: IProps) => {
 const [listItems, setListItems] = React.useState<IMenuListItem[]>();
 React.useEffect(() => {
  const _listItems: IMenuListItem[] = props.menu.reduce((p, c) => {
   const isSection = Boolean(props.pages[c.url].parent === null);
   p.push({ title: props.pages[c.url].title, url: c.url, pos: c.pos, isSection });
   return p;
  }, [] as IMenuListItem[]);
  setListItems(_listItems);
 }, []);

 const onLogout = () => {
  onAppLogout();
  //  window.localStorage.removeItem("a");
  //  setTimeout(() => {
  //   window.location.href = "/";
  //  }, 10);
 };

 return (
  <div className="Menu">
   <div className="menu-wrapper">
    <div className="menu-box">
     <ul>
      {listItems &&
       listItems
        .filter(f => f.pos === EMenuItemPosition.BeforePresentations)
        .map((f, i) => (
         <li key={i} className={f.isSection ? "section" : ""}>
          <Link onClick={props.onMenuHide} to={f.url.replace("@", "")}>
           {f.title}
          </Link>
         </li>
        ))}
      <li className="section">
       <Link onClick={props.onMenuHide} to="/presentations">
        Presentations
       </Link>
      </li>
      {listItems &&
       listItems
        .filter(f => f.pos === EMenuItemPosition.AfterPresentations)
        .map((f, i) => (
         <li key={i} className={f.isSection ? "section" : ""}>
          <Link onClick={props.onMenuHide} to={f.url}>
           {f.title}
          </Link>
         </li>
        ))}
      <li className="section">
       <a href="mailto:alive@lionandfox.co.uk">contact</a>
      </li>
      {(props.userName) ? (
       <React.Fragment>
        <li className="section">
         <Link onClick={props.onMenuHide} to="/presentations">
          {props.userName}
         </Link>
        </li>
        <li>
         <a href="#logout" onClick={onLogout}>
          logout
         </a>
        </li>
       </React.Fragment>
      ) : (
       <React.Fragment>
        <li className="section">
         <Link onClick={props.onMenuHide} to="/login">
          Log in
         </Link>
        </li>
       </React.Fragment>
      )}
     </ul>
    </div>
   </div>
  </div>
 );
};
