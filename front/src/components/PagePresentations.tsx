import { useQuery } from "@apollo/client";
import { env } from "process";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ALL_PRESENTATIONS } from "../gqls/gqls";
import { DocumentRenderer } from "../utils/document-renderer";
import { Header } from "./Header";
import { PageError } from "./PageError";

interface IPresentationFile {
 readonly fileName: string
 readonly fileSize: number
}

interface IPresentation {
 readonly title: string
 readonly pos: number
 readonly uploadedFile: IPresentationFile | null
}

interface IResult {
 readonly presentations: IPresentation[]
}

interface IProps {
 onPageReady: () => void
}

export const PagePresentations: React.FC<IProps> = (props: IProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_ALL_PRESENTATIONS);

 if (loading) return <div>...</div>;
 if (error) return <PageError title={error.name} message={error.message} onPageReady={props.onPageReady} />;

 return data? <LoadedPage presentations={data.presentations} onPageReady={props.onPageReady} />: <PageError title="Page not loaded" onPageReady={props.onPageReady} />
};

interface ILoadedProps extends IProps {
 readonly presentations: IPresentation[]
}

export const LoadedPage: React.FC<ILoadedProps> = (props: ILoadedProps) => {
 React.useEffect(() => {
  props.onPageReady();
 }, [])

 return (
  <div className="Page">
   <div className="head">
    <div className="bc">
     <div className="section">Presentations</div>
    </div>
   </div>
   <div className="body">
    {props.presentations.length > 0 ? (
     <ul className="gallery">
      {props.presentations
       .filter(f => Boolean(f.uploadedFile))
       .sort((a, b) => a.pos - b.pos)
       .map((f, i) => (
        <li key={i}>
         <a href={`${process.env.REACT_APP_BACKEND_URL}${f.uploadedFile?.fileName}`} target="_blank">
          <div className="thumb">
           {/* {f.img && f.img.url && (
           <div className="thumb-img" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + f.img.url})` }}></div>
          )} */}
          </div>
          <div className="name">{f.title}</div>
         </a>
        </li>
       ))}
     </ul>
    ) : (
     <div>No presentations yet</div>
    )}
   </div>
  </div>
 );

}