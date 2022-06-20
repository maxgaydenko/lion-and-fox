import ImageGallery from "react-image-gallery";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

export interface IPopupGallery {
 key: string;
 title: string;
 gallery: string[] | null;
}

export interface IPopupGalleryProps {
 popupGallery: IPopupGallery;
 onClose: () => void;
}

export const PopupGallery: React.FC<IPopupGalleryProps> = ({popupGallery,onClose}: IPopupGalleryProps) => {
 return (popupGallery.gallery!==null && popupGallery.gallery.length > 0)? (
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
      infinite={false}
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
 ): (
  <div className="PopupGallery">
   <div className="popup-auth">
    <div className="box">
     <div className="label">Authorization required</div>
     <div className="action"><button className="close" onClick={onClose}>OK</button></div>
    </div>
   </div>
  </div>
 );
};
