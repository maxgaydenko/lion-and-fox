import { useQuery } from "@apollo/client";
import React from "react";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { GET_PAGE_BODY } from "../gqls/gqls";
import { renderers } from "../utils/custom-renderers";
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { TSiteStructPagesMap } from "../utils/struct";
import { Header } from "./Header";
import { PageError } from "./PageError";
import { IPopupGallery } from "./PopupGallery";
import { componentBlockRenderers } from "../utils/component-block-renderers";

interface IResult {
 readonly page: IPageResult;
}

interface IPageRelationResult {
 readonly url: string;
 readonly menuName: string;
 readonly img?: {
  readonly url?: string;
 };
}

interface IPageShowcaseResult {
 readonly title: string;
 readonly img?: {
  readonly url?: string;
 };
 readonly gallery: string[] | null;
}

interface IPageResult {
 readonly hasBlazon: boolean;
 readonly showNeighborsInHeader: boolean;
 readonly pageTitle: string;
 readonly gallery: string[] | null;
 readonly content: {
  readonly document: any;
 };
 readonly relations: IPageRelationResult[];
 readonly showcases: IPageShowcaseResult[];
}

interface IProps {
 readonly url: string;
 readonly pages: TSiteStructPagesMap;
 onPageReady: () => void;
 showPopupGallery: (popupGallery: IPopupGallery) => void;
}

export const Page: React.FC<IProps> = (props: IProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_PAGE_BODY, { variables: { url: props.url } });

 if (loading) return <div>...</div>;
 if (error) return <PageError title={error.name} message={error.message} onPageReady={props.onPageReady} />;

 return data ? <LoadedPage page={data.page} {...props} /> : <PageError title="Page not loaded" onPageReady={props.onPageReady} />;
};

interface ILoadedProps extends IProps {
 page: IPageResult;
}

export const LoadedPage: React.FC<ILoadedProps> = (props: ILoadedProps) => {
 React.useEffect(() => {
  props.onPageReady();
 }, []);

 const onSelectPresentation = (item: IPageShowcaseResult, itemIdx: number) => {
  props.showPopupGallery({
   key: `showcase-${itemIdx}`,
   title: item.title,
   gallery: item.gallery ?? [],
  });
 };

 return (
  <div className="Page">
   <Header url={props.url} pages={props.pages} showNeighbors={props.page.showNeighborsInHeader} hasBlazon={props.page.hasBlazon} />
   <div className="body">
    {props.page.pageTitle && <h1>{props.page.pageTitle}</h1>}

    {props.page.gallery && props.page.gallery.length > 0 && (
     <div className="wideImg">
      <ImageGallery
       items={props.page.gallery.map(f => ({ original: `${process.env.REACT_APP_BACKEND_URL}${f}` }))}
       autoPlay={false}
       showBullets={props.page.gallery.length > 1}
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
    )}

    {/* {props.page.projects.length > 0 && (
     <ul className="gallery">
      {props.page.projects.map((f, i) => (
       <li key={i}>
        <Link to={`/${props.url}/${f.url}`}>
         <div className="thumb">
          {f.img && f.img.url && <div className="thumb-img" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL+f.img.url})` }}></div>}
         </div>
         <div className="name">{f.title}</div>
        </Link>
       </li>
      ))}
     </ul>
    )} */}
    {/* {props.page.title && <h1>{props.page.title}</h1>} */}

    <DocumentRenderer document={props.page.content.document} renderers={renderers} componentBlocks={componentBlockRenderers} />

    {props.page.relations.length > 0 && (
     <ul className="gallery">
      {props.page.relations.map((f, i) => (
       <li key={i}>
        <Link to={`/${f.url.replace("@", "")}`}>
         <div className={"thumb" + (f.img && f.img.url ? " thumb-wout-logo" : "")}>
          {f.img && f.img.url && (
           <div className="thumb-img" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + f.img.url})` }}></div>
          )}
         </div>
         <div className="name">{f.menuName}</div>
        </Link>
       </li>
      ))}
     </ul>
    )}

    {props.page.showcases.length > 0 && (
     <ul className="gallery">
      {props.page.showcases.map((f, i) => (
       <li key={i}>
        <div
         className={"thumb" + (f.img && f.img.url ? " thumb-wout-logo" : "") + (f.gallery && f.gallery.length > 0 ? " thumb-hov" : " thumb-unauth")}
         onClick={() => onSelectPresentation(f, i)}>
         {f.img && f.img.url && (
          <div className={"thumb-img"} style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + f.img.url})` }}></div>
         )}
        </div>
        <div className="name">{f.title}</div>
       </li>
      ))}
     </ul>
    )}
   </div>
  </div>
 );
};
