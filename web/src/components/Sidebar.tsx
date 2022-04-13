import React from "react";

interface IProps {
 onMenuClick: () => void
}

export const Sidebar: React.FC<IProps> = (props: IProps) => {
 return (
  <div className="Sidebar">
   <div className="logo">logo</div>
   <div className="icons">
    <ul>
     <li className="menu-item"><button className="icon icon-menu" onClick={props.onMenuClick} /></li>
     <li className="other-item"><a className="icon icon-instagram" href="https://instagram.com" target="_blank"></a></li>
     <li className="other-item"><a className="icon icon-mail" href="mailto:mail@gaydenko.ru"></a></li>
    </ul>
   </div>
  </div>
 )
}