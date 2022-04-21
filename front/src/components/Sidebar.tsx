import React from "react";

interface IProps {
 onMenuClick: () => void
}

export const Sidebar: React.FC<IProps> = (props: IProps) => {
 return (
  <div className="Sidebar">
   <div className="logo"><a href="/"><span>lion and fox</span></a></div>
   <div className="title">lion and fox <span>alive</span>&copy; 2022</div>
   <div className="username">832F-4816-12.05.2022</div>
   <div className="icons">
    <ul>
     <li className="menu-item"><button className="icon icon-menu" onClick={props.onMenuClick} /></li>
     <li className="other-item"><a className="icon icon-instagram" href="https://instagram.com/lionandfoxrobotics" target="_blank" rel="noreferrer"><span>@lionandfoxrobotics</span></a></li>
     <li className="other-item"><a className="icon icon-mail" href="mailto:mail@lionandfox.co.uk"><span>mail@lionandfox.co.uk</span></a></li>
    </ul>
   </div>
  </div>
 )
}