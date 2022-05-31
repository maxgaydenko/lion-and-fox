import React from "react";
import { Link } from "react-router-dom";
import { ISiteStructPage, TSiteStructPagesMap } from "../utils/struct";

interface IProps {
 readonly url: string;
 readonly pages: TSiteStructPagesMap;
 readonly showNeighbors: boolean;
 readonly hasBlazon: boolean;
}

interface IHeaderMenuItem {
 readonly url: string;
 readonly title: string;
}

interface IHeaderMenu {
 // readonly section: string;
 readonly bc: IHeaderMenuItem[];
 readonly neighbors: IHeaderMenuItem[];
}

export const Header: React.FC<IProps> = (props: IProps) => {
 const [headerMenu, setHeaderMenu] = React.useState<IHeaderMenu>();
 React.useEffect(() => {
  const selectedItem = props.pages[props.url];
  if (selectedItem) {
   const neighbors: IHeaderMenuItem[] = (props.showNeighbors && selectedItem.parent && props.pages[selectedItem.parent])? props.pages[selectedItem.parent].children.map(f => ({
    title: props.pages[f].title,
    url: f.replace("@",""),
   })): [];

   const bc: IHeaderMenuItem[] = [];
   let bcItem: ISiteStructPage | null = {...selectedItem};
   do {
    bc.push({title: bcItem!.title, url: bcItem!.url.replace("@","")})
    bcItem = bcItem!.parent!==null? props.pages[bcItem!.parent]: null;
   }
   while(bcItem !== null);
   if(bc.length > 1)
    bc.shift();
   setHeaderMenu({bc:bc.reverse(), neighbors});
  }
 }, [props.url, props.pages]);

 return (
  <div className="head">
   <div className="bc">
    {headerMenu && headerMenu.bc.length > 0 && (
     <div className="section">
      {headerMenu.bc.map((f,i) => <span key={i}>{i > 0 && <span> / </span>}{f.url? <Link to={`/${f.url}`}>{f.title}</Link>: <span>${f.title}</span>}</span>)}
     </div>
    )}
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
