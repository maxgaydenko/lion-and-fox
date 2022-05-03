import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_PRESENTATIONS } from "../gqls/gqls";
import { PageError } from "./PageError";
import ImageGallery from "react-image-gallery";

interface IPresentationFile {
 readonly fileName: string;
 readonly fileSize: number;
}

interface IPresentationThumb {
 readonly url: string;
}

interface IPresentation {
 readonly title: string;
 readonly img: IPresentationThumb | null;
 readonly gallery: string[] | null;
 //  readonly uploadedFile: IPresentationFile | null
}

interface IResult {
 readonly showcases: IPresentation[];
}

interface IProps {
 onPageReady: () => void;
}

export const PagePresentations: React.FC<IProps> = (props: IProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_ALL_PRESENTATIONS);

 if (loading) return <div>...</div>;
 if (error) return <PageError title={error.name} message={error.message} onPageReady={props.onPageReady} />;

 //  return <PageError title="Page not loaded" onPageReady={props.onPageReady} />
 return data ? (
  <LoadedPage showcases={data.showcases} onPageReady={props.onPageReady} />
 ) : (
  <PageError title="Page not loaded" onPageReady={props.onPageReady} />
 );
};

interface ILoadedProps extends IProps {
 readonly showcases: IPresentation[];
}

export const LoadedPage: React.FC<ILoadedProps> = (props: ILoadedProps) => {
 const [selectedShowcaseIdx, setSelectedShowcaseIdx] = React.useState<number | null>(null);
 React.useEffect(() => {
  props.onPageReady();
 }, []);

 const onSelectShowcase = (showcaseIdx: number) => {
  if (props.showcases[showcaseIdx] && props.showcases[showcaseIdx].gallery && props.showcases[showcaseIdx].gallery!.length > 0)
   setSelectedShowcaseIdx(showcaseIdx);
 };

 const onHideShowcase = () => {
  setSelectedShowcaseIdx(null);
 };

 return (
  <div className="Page">
   {selectedShowcaseIdx !== null &&
    props.showcases[selectedShowcaseIdx] &&
    props.showcases[selectedShowcaseIdx].gallery &&
    props.showcases[selectedShowcaseIdx].gallery!.length > 0 && (
     <PopupPresentation
      title={props.showcases[selectedShowcaseIdx].title}
      gallery={props.showcases[selectedShowcaseIdx].gallery!}
      onClose={onHideShowcase}
     />
    )}
   <div className="head">
    <div className="bc">
     <div className="section">Presentations</div>
    </div>
   </div>
   <div className="body">
    {props.showcases.length > 0 ? (
     <ul className="gallery">
      {props.showcases.map((f, i) => (
       <li key={i}>
        <div className="thumb" onClick={() => onSelectShowcase(i)}>
         {f.img && f.img.url && (
          <div className="thumb-img" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + f.img.url})` }}></div>
         )}
        </div>
        <div className="name">{f.title}</div>
       </li>
      ))}
     </ul>
    ) : (
     <div>No presentations yet</div>
    )}
   </div>
  </div>
 );
};

interface IPopupPresentationProps {
 title: string;
 gallery: string[];
 onClose: () => void;
}

const PopupPresentation: React.FC<IPopupPresentationProps> = (props: IPopupPresentationProps) => {
 return (
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
 );
};
