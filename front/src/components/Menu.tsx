import React from "react";
import { Link } from "react-router-dom";
import { IMenu } from "../utils/menu";
// import {Link} from "react-router-dom"

interface IProps {
 menu: IMenu
//  pageItems: IMenuResult[];
//  galleryItems: IMenuResult[];
}

export const Menu: React.FC<IProps> = (props: IProps) => {
//  const [menuStruct, setMenuStruct] = React.useState<IMenu>();
//  React.useEffect(() => {
//   console.log("Menu struct");
//   setMenuStruct(combineMenu(props.pageItems, []));
//  }, [props.pageItems]);

 return (
  <div className="Menu">
   <div className="menu-wrapper">
    <div className="menu-box">
     {/* {menuStruct && (
      <ul>
       {menuStruct.__menuItems.map((menuItem, idx) => (
        <li key={idx}>
         <a href={"#" + menuItem.url}>{menuItem.name}</a>
        </li>
       ))}
      </ul>
     )} */}
     <ul>
      {props.menu.items.map((f,i) => <li key={i}><Link to={f.url}>{f.title}</Link></li>)}
      <li>-</li>
      <li className="section">
       <Link to="/">future</Link>
      </li>
      <li>
       <Link to={"page1"}>future model</Link>
      </li>
      <li className="section">autonomouse robots</li>
      <li>
       <Link to="page2">robots of lion and fox</Link>
      </li>
      <li className="section">cars</li>
      <li>
       <Link to="page1/sub1">about</Link>
      </li>
      <li>
       <Link to="page1/sub3">projects</Link>
      </li>
      <li className="section">contact</li>
      <li>
       <a href="mailto:mail@lionandfox.co.uk">mail@lionandfox.co.uk</a>
      </li>
      <li className="section">presentations</li>
      <li>
       <a href="#6">832F-4816-12.05.2022</a>
      </li>
      <li>–</li>
      <li>
       <a href="#7">logout</a>
      </li>

      {/*
      <li className="section"><a href="#1">2-future</a></li>
      <li><a href="#2">2-future model</a></li>
      <li className="section">2-autonomouse robots</li>
      <li><a href="#3">2-robots of lion and fox</a></li>
      <li className="section">2-cars</li>
      <li><a href="#4">2-about</a></li>
      <li><a href="#5">2-projects</a></li>
      <li className="section">2-contact</li>
      <li><a href="mailto:mail@lionandfox.co.uk">2-mail@lionandfox.co.uk</a></li>
      <li className="section">2-presentations</li>
      <li><a href="#6">2-832F-4816-12.05.2022</a></li>
      <li>–</li>
      <li><a href="#7">3-logout</a></li>

      <li className="section"><a href="#1">3-future</a></li>
      <li><a href="#2">3-future model</a></li>
      <li className="section">3-autonomouse robots</li>
      <li><a href="#3">3-robots of lion and fox</a></li>
      <li className="section">3-cars</li>
      <li><a href="#4">3-about</a></li>
      <li><a href="#5">3-projects</a></li>
      <li className="section">3-contact</li>
      <li><a href="mailto:mail@lionandfox.co.uk">3-mail@lionandfox.co.uk</a></li>
      <li className="section">3-presentations</li>
      <li><a href="#6">3-832F-4816-12.05.2022</a></li>
      <li>–</li>
      <li><a href="#7">3-logout</a></li>
 */}
     </ul>
    </div>
   </div>
  </div>
 );
};
