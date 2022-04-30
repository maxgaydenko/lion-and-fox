import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_PAGE_BODY } from "../gqls/gqls";
import { DocumentRenderer } from "../utils/document-renderer";
import { IMenu } from "../utils/menu";
import { Header } from "./Header";
import { PageError } from "./PageError";

interface IResult {
 readonly page: IPageResult
}

interface IPageProjectResult {
 readonly url: string
 readonly title: string
 readonly img?: {
  readonly url?: string
 }
}

interface IPageResult {
 // readonly title: string;
 readonly hasBlazon: boolean;
 readonly content: {
  readonly document: any
 }
 readonly projects: IPageProjectResult[]
}

interface IProps {
 readonly url: string;
 readonly menu: IMenu;
 onPageReady: () => void
}

export const Page: React.FC<IProps> = (props: IProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_PAGE_BODY, { variables: { url: props.url } });

 if (loading) return <div>...</div>;
 if (error) return <PageError title={error.name} message={error.message} onPageReady={props.onPageReady} />;

 return data? <LoadedPage page={data.page} {...props} />: <PageError title="Page not loaded" onPageReady={props.onPageReady} />
};

interface ILoadedProps extends IProps {
 page: IPageResult
}

export const LoadedPage: React.FC<ILoadedProps> = (props: ILoadedProps) => {
 React.useEffect(() => {
  props.onPageReady();
 }, [])

 console.log('projects', props.page.projects);
 return (
  <div className="Page">
   <Header url={props.url} menu={props.menu} hasBlazon={props.page.hasBlazon} />
   <div className="body">
    {props.page.projects.length > 0 && (
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
    )}
    {/* {props.page.title && <h1>{props.page.title}</h1>} */}

    <DocumentRenderer document={props.page.content.document} />
   </div>
  </div>
 );

}