import React from "react";
import { Link } from "react-router-dom";

interface IProps {
 userName?: string
 onMenuClick: () => void
 onMenuHide: () => void
}

export const Sidebar: React.FC<IProps> = (props: IProps) => {
 return (
  <div className="Sidebar">
   <div className="logo"><Link onClick={props.onMenuHide} to="/"><span>lion and fox</span></Link></div>
   {/* <div className="title"><Link to="/">lion</Link> <Link to="/future">and</Link> fox <span>alive</span>&copy; 2022</div> */}
   <div className="title" id="titleBox"><span className="name">lion and fox</span> <span className="alive">alive</span><span className="copyright">&copy; 2022</span></div>
   {props.userName && <div className="username"><Link onClick={props.onMenuHide} to="/presentations/">{props.userName}</Link></div>}
   <div className="icons">
    <ul>
     <li className="menu-item"><button className="icon icon-menu" onClick={props.onMenuClick} /></li>
     <li className="other-item"><a className="icon icon-instagram" href="https://instagram.com/lionandfoxrobotics" target="_blank" rel="noreferrer"><span>@lionandfoxrobotics</span></a></li>
     <li className="other-item"><a className="icon icon-mail" href="mailto:alive@lionandfox.co.uk"><span>alive@lionandfox.co.uk</span></a></li>
    </ul>
   </div>
  </div>
 )
}