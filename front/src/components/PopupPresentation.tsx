import ImageGallery from "react-image-gallery";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

interface IPopupPresentationProps {
 key: string;
 title: string;
 gallery: string[];
 onClose: () => void;
}

export const PopupPresentation: React.FC<IPopupPresentationProps> = (props: IPopupPresentationProps) => {
 return (
  // <TransitionGroup component={null}>
  //  <CSSTransition key={props.key} classNames="PageFade" timeout={400}>
    <div className="Popup">
     <div className="popup-head">
      <div className="title">{props.title}</div>
      <div className="close">
       <button onClick={props.onClose} />
      </div>
     </div>
     <div className="popup-body">
      <div className="popup-body-vbox">
       <ImageGallery
        items={props.gallery.map(f => ({ original: `${process.env.REACT_APP_BACKEND_URL}${f}` }))}
        autoPlay={false}
        showBullets={props.gallery.length > 1}
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
  //  </CSSTransition>
  // </TransitionGroup>
 );
};
