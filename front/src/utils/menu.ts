import { isConstValueNode } from "graphql"

export enum EMenuRouteComponentType {
 Page = 'Page',
 Gallery = 'Gallery',
}

export interface IMenuItem {
 readonly url: string
 readonly title: string
 readonly routeComponentType: EMenuRouteComponentType
}

export interface IMenu {
 readonly items: IMenuItem[]
 readonly galleriesRoutes: string[]
}

export interface IMenuDataItem {
 readonly menuName: string
 readonly url: string
 readonly pos: number
}

interface IMenuHandlingDataItem extends IMenuDataItem {
 readonly level: number
 readonly routeComponentType: EMenuRouteComponentType
}

export const combineMenu = (pages: IMenuDataItem[], galleries: IMenuDataItem[]): IMenu => {
 const galleriesRoutes: string[] = [];
 const _pages: IMenuHandlingDataItem[] = pages.map(f => {
  return {
   ...f,
   level: f.url.split("/").length,
   routeComponentType: EMenuRouteComponentType.Page
  }
 });
 const _galleries: IMenuHandlingDataItem[] = galleries.map(f => {
  galleriesRoutes.push(f.url)
  return {
   ...f,
   level: f.url.split("/").length,
   routeComponentType: EMenuRouteComponentType.Gallery
  }
 });
 const _allItems: IMenuHandlingDataItem[] = [..._pages, ..._galleries].sort((a,b) => a.pos-b.pos);
 // .sort((a,b) => (a.level===b.level)? a.pos-b.pos: a.level - b.level)
 // .sort((a,b) => (a.url < b.url)? 1: - 1)
 
 const items: IMenuItem[] = _allItems.map(f => ({url: f.url, title: f.menuName, routeComponentType: f.routeComponentType}));
 return {
  items,
  galleriesRoutes,
 };
}