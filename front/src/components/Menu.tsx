import React from "react";
import { Link } from "react-router-dom";
import { IMenu } from "../utils/menu";

interface IProps {
 menu: IMenu;
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
  const _listItems: IMenuListItem[] = props.menu.items.reduce((p, c) => {
   if (c.section && prevSection !== c.section)
    p.push({ title: c.section, url: `${c.url}`, isSection: true });
   p.push({ title: c.title, url: `${c.url}`, isSection: false });
   prevSection = c.section;
   return p;
  }, [] as IMenuListItem[]);
  setListItems(_listItems);
 }, []);

 return (
  <div className="Menu">
   <div className="menu-wrapper">
    <div className="menu-box">
     <ul>
      {listItems && listItems.map((f, i) => (
       <li key={i} className={f.isSection ? "section" : ""}>
        <Link to={f.url}>{f.title}</Link>
       </li>
      ))}
      {/* <li>-</li>
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
      </li> */}
      <li className="section">contact</li>
      <li>
       <a href="mailto:mail@lionandfox.co.uk">mail@lionandfox.co.uk</a>
      </li>
      {/* <li className="section">presentations</li>
      <li>
       <a href="#6">832F-4816-12.05.2022</a>
      </li>
      <li>–</li>
      <li>
       <a href="#7">logout</a>
      </li> */}

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
