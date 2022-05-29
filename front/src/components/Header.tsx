import React from "react";
import { Link } from "react-router-dom";
import { EMenuItemType, IMenu } from "../utils/menu";

interface IProps {
 readonly url: string;
 readonly menu: IMenu;
 readonly hasBlazon: boolean;
}

interface IHeaderMenuItem {
 readonly url: string;
 readonly title: string;
}

interface IHeaderMenu {
 readonly section: string;
 readonly neighbors: IHeaderMenuItem[];
}

export const Header: React.FC<IProps> = (props: IProps) => {
 const [headerMenu, setHeaderMenu] = React.useState<IHeaderMenu>();
 React.useEffect(() => {
  const selectedItem = props.menu.menuItems.find(f => f.url === props.url && f.type !== EMenuItemType.Section);
  if (selectedItem) {
   let section = selectedItem.section;
   const neighbors: IHeaderMenuItem[] = selectedItem.section
    ? props.menu.menuItems.filter(f => f.section === selectedItem.section).map(f => ({ title: f.title, url: f.url }))
    : [];
   setHeaderMenu({ section, neighbors });
  }
 }, [props.url, props.menu]);

 return (
  <div className="head">
   <div className="bc">
    {headerMenu && headerMenu.section && <div className="section">{headerMenu.section}</div>}
    {headerMenu && headerMenu.neighbors.length > 1 && (
     <div className="neighbors">
      <ul>
       {headerMenu.neighbors.map((f, i) => (
        <li key={i} className={f.url === props.url ? "selected" : ""}>
         <Link to={`/${f.url}`}>{f.title}</Link>
        </li>
       ))}
      </ul>
     </div>
    )}
   </div>
   {props.hasBlazon && <div className="blazon"></div>}
  </div>
 );
};
