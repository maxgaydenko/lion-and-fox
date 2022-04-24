import React from "react";
import { Link } from "react-router-dom";

interface IProps {}

interface IStubProject {
 readonly img: string
 readonly name: string
}

const _stub: IStubProject[] = [
 {name: "Jeep Wrangler", img: "/_stub_cars/jeep_wrangler.jpg"},
 {name: "Bmw x6 active hybrid 403 hp - ", img: "/_stub_cars/bmw_x6.jpg"},
 {name: "Mazda cx-5", img: "/_stub_cars/mazda_cx5.jpg"},
 {name: "Lexus nx200t", img: "/_stub_cars/lexus_nx.jpg"},
 {name: "Bmw gt6", img: "/_stub_cars/bmw_6gt.jpg"},
]

export const PageGallery: React.FC<IProps> = (props: IProps) => {
 return (
  <div className="Page">
   <div className="head">
    <div className="bc"><a href="#1">_cars</a></div>
    <div className="blazon"></div>
   </div>
   <div className="body">
    <ul className="gallery">
     {_stub.map((f,i) => (
      <li key={i}>
       <Link to="dev/project">
        <div className="thumb"><div className="thumb-img" style={{backgroundImage: `url(${f.img})`}}></div></div>
        <div className="name">{f.name}</div>
       </Link>
      </li>
     ))}
     <li>
      <div className="thumb"></div>
      <div className="name">Non exists</div>
     </li>
    </ul>
    <h1>Lion and Fox</h1>
    <div className="wideImg">
     <img src={_stub[_stub.length - 1].img} />
    </div>
    <p>Founded in 2002, Braintree is one of the most innovative and forward thinking companies in the AI space. We are in the vanguard of research and development of intelligent computing solutions.</p>
    <p>Our solutions tackle the big challenges faced by major corporations, public service organisations, government, and individuals. We create the future, today. Across everything we do, our purpose is to make life easier and more manageable.</p>
    <p>---</p>
    <p>Founded in 2002, Braintree is one of the most innovative and forward thinking companies in the AI space. We are in the vanguard of research and development of intelligent computing solutions.</p>
    <p>Our solutions tackle the big challenges faced by major corporations, public service organisations, government, and individuals. We create the future, today. Across everything we do, our purpose is to make life easier and more manageable.</p>
    <p>Founded in 2002, Braintree is one of the most innovative and forward thinking companies in the AI space. We are in the vanguard of research and development of intelligent computing solutions.</p>
    <p>Our solutions tackle the big challenges faced by major corporations, public service organisations, government, and individuals. We create the future, today. Across everything we do, our purpose is to make life easier and more manageable.</p>
    <p>Founded in 2002, Braintree is one of the most innovative and forward thinking companies in the AI space. We are in the vanguard of research and development of intelligent computing solutions.</p>
    <p>Our solutions tackle the big challenges faced by major corporations, public service organisations, government, and individuals. We create the future, today. Across everything we do, our purpose is to make life easier and more manageable.</p>
   </div>
  </div>
 )
}