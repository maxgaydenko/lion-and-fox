import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PAGE_BODY } from "../gqls/gqls";
import { DocumentRenderer } from "../utils/document-renderer";
import { IMenu } from "../utils/menu";
import { Header } from "./Header";
import { PageError } from "./PageError";

interface IResult {
 page: IPage
}

interface IPage {
 title: string;
 hasBlazon: boolean;
 content: {
  document: any
 }
}

interface IProps {
 url: string;
 menu: IMenu;
 onPageReady: () => void
}

export const Page: React.FC<IProps> = (props: IProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_PAGE_BODY, { variables: { url: props.url } });

 if (loading) return <div>...</div>;
 if (error) return <PageError title={error.name} message={error.message} onPageReady={props.onPageReady} />;

 return data? <LoadedPage page={data.page} {...props} />: <PageError title="Page not loaded" onPageReady={props.onPageReady} />
};

interface ILoadedProps extends IProps {
 page: IPage
}

export const LoadedPage: React.FC<ILoadedProps> = (props: ILoadedProps) => {
 React.useEffect(() => {
  props.onPageReady();
 }, [])
 return (
  <div className="Page">
   <Header url={props.url} menu={props.menu} hasBlazon={props.page.hasBlazon} />
   <div className="body">
    <h1>{props.page.title}</h1>
    <DocumentRenderer document={props.page.content.document} />
   </div>
  </div>
 );

}