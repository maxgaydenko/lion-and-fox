import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { galleryUtl2Id, isGalleryHtml } from "../utils/gallery";
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

const popupGalleryItem = (url: string, idx: number, versions: { [key: number]: number }): ReactImageGalleryItem => {
 if (isGalleryHtml(url)) {
  return {
   original: `${process.env.REACT_APP_BACKEND_URL}${url}`,
   renderItem: item => {
    // console.log('renderItem', idx, versions);
    const src = (versions[idx] !== undefined)? `${item.original}?rl=${versions[idx]}`: item.original;
    return <iframe className="embeded-iframe" id={galleryUtl2Id(url)} src={src}></iframe>;
   },
  };
 }
 return {
  original: `${process.env.REACT_APP_BACKEND_URL}${url}`,
 };
};

export const PopupGallery: React.FC<IPopupGalleryProps> = ({ popupGallery, onClose }: IPopupGalleryProps) => {
 let galleryItemIdx = 0;
 let galleryItemsVersions: { [key: number]: number } = {};

 return popupGallery.gallery !== null && popupGallery.gallery.length > 0 ? (
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
      items={popupGallery.gallery.map((url, idx) => popupGalleryItem(url, idx, galleryItemsVersions))}
      // items={popupGallery.gallery.map(f => ({ original: `${process.env.REACT_APP_BACKEND_URL}${f}` }))}
      onSlide={currentIdx => {
       // console.log("On slide", galleryItemIdx, currentIdx);
       // if(isGalleryHtml(popupGallery.gallery![galleryItemIdx])) {
       //  const elId = galleryUtl2Id(popupGallery.gallery![galleryItemIdx]);
       //  const el = window.document.getElementById(elId);
       //  if(el && el.tagName === 'IFRAME') {
       //   const iframe = el as HTMLIFrameElement;
       //   iframe.onload!(new Event('load'));
       //   console.log('win', iframe.contentWindow);
       //   iframe.contentWindow?.postMessage("hello", "*");
       //   if(iframe.contentWindow !== null) {
       //    console.log('doc', iframe.contentWindow.document);

       //   }
       //   // const event = new Event('build');
       //   // el.onload(event);
       //  }
       // }
       galleryItemsVersions = {};
       galleryItemsVersions[galleryItemIdx] = new Date().getTime();
       galleryItemIdx = currentIdx;
      }}
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
 ) : (
  <div className="PopupGallery">
   <div className="popup-auth">
    <div className="box">
     <div className="label">Authorization required</div>
     <div className="action">
      <button className="close" onClick={onClose}>
       OK
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
