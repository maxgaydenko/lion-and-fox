import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { DocumentRenderer } from "../utils/document-renderer";
import { IMenu, IMenuItem } from "../utils/menu";
import { PageError } from "./PageError";

export const GET_PAGE_BODY = gql`
 query GetPage($url: String!) {
  page(where: { url: $url }) {
   title
   hasBlazon
   content {
    document
   }
  }
 }
`;

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
 const [selectedMenuItem, setSelectedMenuItem] = React.useState<IMenuItem>();
 React.useEffect(() => {
  const _selectedMenuItem = props.menu.items.find(f => f.url===props.url);
  setSelectedMenuItem(_selectedMenuItem);
  props.onPageReady();
 }, [props.menu, props.url])
 return (
  <div className="Page PageCars">
   <div className="head">
    <div className="bc">
     {selectedMenuItem && <Link to={selectedMenuItem.url}>{selectedMenuItem.title}</Link>}
    </div>
    <div className="blazon"></div>
   </div>
   <div className="body">
    <h1>{props.page.title}</h1>
    {/* <pre>{JSON.stringify(props.page.content.document, null, 2)}</pre> */}
    <DocumentRenderer document={props.page.content.document} />
   </div>
  </div>
 );

}