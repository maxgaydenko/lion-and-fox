import { useQuery } from "@apollo/client";
import React from "react";
import ImageGallery from "react-image-gallery";
import { GET_PROJECT_BODY } from "../gqls/gqls";
import { DocumentRenderer } from "../utils/document-renderer";
import { ISiteStruct } from "../utils/struct";
import { Header } from "./Header";
import { PageError } from "./PageError";

interface IResult {
 readonly project: IProjectResult
}

// interface IPageProjectResult {
//  readonly url: string
//  readonly title: string
//  readonly img?: {
//   readonly url?: string
//  }
// }

interface IProjectResult {
 readonly title: string;
 readonly hasBlazon: boolean;
 readonly gallery: string[] | null
 readonly content: {
  readonly document: any
 }
 readonly page: { url: string} | null
 // readonly projects: IPageProjectResult[]
}

interface IProps {
 readonly pageUrl: string;
 readonly projectUrl: string;
 readonly menu: ISiteStruct;
 onPageReady: () => void
}

export const PageProject: React.FC<IProps> = (props: IProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_PROJECT_BODY, { variables: { projectUrl: props.projectUrl } });

 if (loading) return <div>...</div>;
 if (error) return <PageError title={error.name} message={error.message} onPageReady={props.onPageReady} />;

 return data? <LoadedPage project={data.project} {...props} />: <PageError title="Page not loaded" onPageReady={props.onPageReady} />
};

interface ILoadedProps extends IProps {
 project: IProjectResult
}

export const LoadedPage: React.FC<ILoadedProps> = (props: ILoadedProps) => {
 React.useEffect(() => {
  props.onPageReady();
 }, [])
 return (
  <div className="Page">
   {/* <Header url={props.pageUrl} siteStruct={props.menu} hasBlazon={props.project.hasBlazon} /> */}
   <div className="body">
    {props.project.title && <h1>{props.project.title}</h1>}

    {props.project.gallery && props.project.gallery.length > 0 && (<div className="wideImg">
     <ImageGallery
      items={props.project.gallery.map(f => ({ original: `${process.env.REACT_APP_BACKEND_URL}${f}` }))}
      autoPlay={false}
      showBullets={props.project.gallery.length > 1}
      showPlayButton={false}
      infinite={false}
      showNav={true}
      showFullscreenButton={false}
      renderLeftNav={(onClick, disabled) => <button onClick={onClick} disabled={disabled} className={'gallery-button gallery-button-prev'} />}
      renderRightNav={(onClick, disabled) => <button onClick={onClick} disabled={disabled} className={'gallery-button gallery-button-next'} />}
     />
    </div>)}

    <DocumentRenderer document={props.project.content.document} />
   </div>
  </div>
 );

}