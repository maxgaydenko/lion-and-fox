import ImageGallery from "react-image-gallery";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

export interface IPopupGallery {
 key: string;
 title: string;
 gallery: string[];
}

export interface IPopupGalleryProps {
 popupGallery: IPopupGallery;
 onClose: () => void;
}

export const PopupGallery: React.FC<IPopupGalleryProps> = ({popupGallery,onClose}: IPopupGalleryProps) => {
 return (
  // <TransitionGroup component={null}>
  //  <CSSTransition key={props.key} classNames="PageFade" timeout={400}>
  <div className="PopupGallery">
   <div className="popup-head">
    <div className="title">{popupGallery.title}</div>
    <div className="close">
     <button onClick={onClose} />
    </div>
   </div>
   <div className="popup-body">
    <div className="popup-body-vbox">
     <ImageGallery
      items={popupGallery.gallery.map(f => ({ original: `${process.env.REACT_APP_BACKEND_URL}${f}` }))}
      autoPlay={false}
      showBullets={popupGallery.gallery.length > 1}
      showPlayButton={false}
      showNav={true}
      showFullscreenButton={false}
      renderLeftNav={(onClick, disabled) => (
       <button onClick={onClick} disabled={disabled} className={"gallery-button gallery-button-prev"} />
      )}
      renderRightNav={(onClick, disabled) => (
       <button onClick={onClick} disabled={disabled} className={"gallery-button gallery-button-next"} />
      )}
     />
    </div>
   </div>
  </div>
  //  </CSSTransition>
  // </TransitionGroup>
 );
};
