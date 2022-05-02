import React from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";

interface IProps {}

interface IStubProject {
 readonly img: string;
 readonly name: string;
}

const _stub: IStubProject[] = [
 { name: "Maket", img: "/_stub_cars/svg/Maket.svg" },
 { name: "Maket 2", img: "/_stub_cars/svg/Maket_2.svg" },
 { name: "Maket 3", img: "/_stub_cars/svg/Maket_3.svg" },
];

export const DevPageGallery: React.FC<IProps> = (props: IProps) => {
 const [sel, setSel] = React.useState<boolean>(false);

 return (
  <div className="Page">
   <div className="head">
    <div className="bc">
     <div className="section">Presentations</div>
    </div>
   </div>
   <div className="body">
    <h1>Svg gallery</h1>
    <div className="wideImg">
     <ImageGallery
      items={_stub.map(f => ({ original: f.img }))}
      autoPlay={false}
      showBullets={true}
      showPlayButton={false}
      showNav={true}
      showFullscreenButton={false}
      renderLeftNav={(onClick, disabled) => <button onClick={onClick} disabled={disabled} className={'gallery-button gallery-button-prev'} />}
      renderRightNav={(onClick, disabled) => <button onClick={onClick} disabled={disabled} className={'gallery-button gallery-button-next'} />}
      // renderLeftNav={(onClick, disabled) => <GalleryNav className="gallery-nav-left" onClick={onClick} disabled={disabled} />}
      // renderRightNav={(onClick, disabled) => <GalleryNav className="gallery-nav-right" onClick={onClick} disabled={disabled} />}
     />
    </div>
    <p>
     Founded in 2002, Braintree is one of the most innovative and forward thinking companies in the AI space. We are in the vanguard of
     research and development of intelligent computing solutions.
    </p>
    <p>
     Our solutions tackle the big challenges faced by major corporations, public service organisations, government, and individuals. We
     create the future, today. Across everything we do, our purpose is to make life easier and more manageable.
    </p>
    <p>---</p>
    <p>
     Founded in 2002, Braintree is one of the most innovative and forward thinking companies in the AI space. We are in the vanguard of
     research and development of intelligent computing solutions.
    </p>
    <p>
     Our solutions tackle the big challenges faced by major corporations, public service organisations, government, and individuals. We
     create the future, today. Across everything we do, our purpose is to make life easier and more manageable.
    </p>
    <p>
     Founded in 2002, Braintree is one of the most innovative and forward thinking companies in the AI space. We are in the vanguard of
     research and development of intelligent computing solutions.
    </p>
    <p>
     Our solutions tackle the big challenges faced by major corporations, public service organisations, government, and individuals. We
     create the future, today. Across everything we do, our purpose is to make life easier and more manageable.
    </p>
    <p>
     Founded in 2002, Braintree is one of the most innovative and forward thinking companies in the AI space. We are in the vanguard of
     research and development of intelligent computing solutions.
    </p>
    <p>
     Our solutions tackle the big challenges faced by major corporations, public service organisations, government, and individuals. We
     create the future, today. Across everything we do, our purpose is to make life easier and more manageable.
    </p>
   </div>
  </div>
 );
};

interface IGalleryNavProps {
 onClick: React.MouseEventHandler<HTMLElement>
 disabled: boolean
 className: string
}

const GalleryNav: React.FC<IGalleryNavProps> = (props: IGalleryNavProps) => {
 return (
  <button onClick={props.onClick} className={`gallery-nav ${props.className}`} disabled={props.disabled}>@nav</button>
 )
}