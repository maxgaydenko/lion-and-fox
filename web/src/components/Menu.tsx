import React from "react";

interface IProps {
}

export const Menu: React.FC<IProps> = (props: IProps) => {
 return (
  <div className="Menu">
   <div className="menu-wrapper">
    <div className="menu-box">
     <ul>
      <li className="section"><a href="#1">future</a></li>
      <li><a href="#2">future model</a></li>
      <li className="section">autonomouse robots</li>
      <li><a href="#3">robots of lion and fox</a></li>
      <li className="section">cars</li>
      <li><a href="#4">about</a></li>
      <li><a href="#5">projects</a></li>
      <li className="section">contact</li>
      <li><a href="mailto:mail@lionandfox.co.uk">mail@lionandfox.co.uk</a></li>
      <li className="section">presentations</li>
      <li><a href="#6">832F-4816-12.05.2022</a></li>
      <li>–</li>
      <li><a href="#7">logout</a></li>

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
 )
}