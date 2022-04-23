import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_PAGE_BODY } from "../gqls/gqls";
import { DocumentRenderer } from "../utils/document-renderer";
import { EMenuItemType, IMenu, IMenuItem } from "../utils/menu";
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
 const [selectedMenuSectionItem, setSelectedMenuSectionItem] = React.useState<IMenuItem>();
 React.useEffect(() => {
  const _selectedMenuSectionItem = props.menu.items.find(f => (f.url===props.url && f.type===EMenuItemType.Section));
  setSelectedMenuSectionItem(_selectedMenuSectionItem);
  props.onPageReady();
 }, [props.menu, props.url])
 return (
  <div className="Page PageCars">
   {/* <div className="head">
    <div className="bc">
     {selectedMenuSectionItem && <Link to={selectedMenuSectionItem.url}>_{selectedMenuSectionItem.title}</Link>}
    </div>
    {props.page.hasBlazon && <div className="blazon"></div>}
   </div> */}
   <Header url={props.url} menu={props.menu} hasBlazon={props.page.hasBlazon} />
   <div className="body">
    <h1>{props.page.title}</h1>
    <DocumentRenderer document={props.page.content.document} />
   </div>
  </div>
 );

}