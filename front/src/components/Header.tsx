import React from "react";
import { Link } from "react-router-dom";
import { EMenuItemType, IMenu, IMenuItem } from "../utils/menu";

interface IProps {
 readonly url: string;
 readonly menu: IMenu;
 readonly hasBlazon: boolean;
}

interface IHeaderMenuItem {
 readonly url: string
 readonly title: string
}

interface IHeaderMenu {
 readonly section: string
 readonly neighbors: IHeaderMenuItem[]
}

export const Header:React.FC<IProps> = (props: IProps) => {
 const [headerMenu, setHeaderMenu] = React.useState<IHeaderMenu>();
 React.useEffect(() => {
  const selectedItem = props.menu.items.find(f => (f.url === props.url && f.type !== EMenuItemType.Section));
  if(selectedItem) {
   const section = selectedItem.section;
   const neighbors: IHeaderMenuItem[] = (selectedItem.section)? props.menu.items.filter(f => f.section===selectedItem.section).map(f => ({title: f.title, url: f.url})): [];
   setHeaderMenu({section, neighbors});
  }
 }, []);

 return (
  <div className="head">
  <div className="bc">
   {headerMenu && headerMenu.section && <span>{headerMenu.section}</span>}
   {/* {selectedMenuSectionItem && <Link to={selectedMenuSectionItem.url}>_{selectedMenuSectionItem.title}</Link>} */}
  </div>
  {headerMenu && (headerMenu.neighbors.length > 1) && (<div className="neighbors">
   <ul>
    {headerMenu.neighbors.map((f,i) => <li key={i} className={f.url===props.url?"selected":""}><Link to={`/${f.url}`}>{f.title}</Link></li>)}
   </ul>
  </div>)}
  {props.hasBlazon && <div className="blazon"></div>}
 </div>
 )
}