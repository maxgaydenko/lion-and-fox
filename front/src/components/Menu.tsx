import React from "react";
import { Link } from "react-router-dom";
import { IMenu } from "../utils/menu";

interface IProps {
 menu: IMenu;
 userName?: string;
 onMenuHide: () => void;
}

interface IMenuListItem {
 readonly url: string;
 readonly title: string;
 readonly isSection: boolean;
}

export const Menu: React.FC<IProps> = (props: IProps) => {
 const [listItems, setListItems] = React.useState<IMenuListItem[]>();
 React.useEffect(() => {
  let prevSection = "";
  const _listItems: IMenuListItem[] = props.menu.menuItems.reduce((p, c) => {
   if (c.section && prevSection !== c.section) p.push({ title: c.section, url: `${c.url}`, isSection: true });
   p.push({ title: c.title, url: `${c.url}`, isSection: false });
   prevSection = c.section;
   return p;
  }, [] as IMenuListItem[]);
  setListItems(_listItems);
 }, []);

 const onLogout = () => {
    window.localStorage.removeItem("a");
    setTimeout(() => {
     window.location.href = "/";
    }, 10); 
 }

 return (
  <div className="Menu">
   <div className="menu-wrapper">
    <div className="menu-box">
     <ul>
      {listItems &&
       listItems.map((f, i) => (
        <li key={i} className={f.isSection ? "section" : ""}>
         <Link onClick={props.onMenuHide} to={f.url}>
          {f.title}
         </Link>
        </li>
       ))}
      <li className="section">contact</li>
      <li>
       <a onClick={props.onMenuHide} href="mailto:alive@lionandfox.co.uk">
       alive@lionandfox.co.uk
       </a>
      </li>
      {props.userName ? (
       <React.Fragment>
        <li className="section">Presentations</li>
        <li><Link onClick={props.onMenuHide} to="/presentations">{props.userName}</Link></li>
        <li>&mdash;</li>
        <li>
         <a href="#logout" onClick={onLogout}>logout</a>
        </li>
       </React.Fragment>
      ) : (
       <li className="section">
        <Link onClick={props.onMenuHide} to="/login">
         Log in
        </Link>
       </li>
      )}
     </ul>
    </div>
   </div>
  </div>
 );
};
