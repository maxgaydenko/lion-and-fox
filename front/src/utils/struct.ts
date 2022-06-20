export enum EMenuItemPosition {
 BeforePresentations = "BeforePresentations",
 AfterPresentations = "AfterPresentations",
}

export interface ISiteMenuItem {
 readonly url: string;
 readonly pos: EMenuItemPosition;
}

export interface ISiteStructPage {
 readonly url: string;
 readonly title: string;
 readonly parent: string | null;
 readonly children: string[];
}

export type TSiteStructPagesMap = { [key: string]: ISiteStructPage };

export interface ISiteStruct {
 readonly pages: TSiteStructPagesMap;
 readonly menu: ISiteMenuItem[];
 readonly urls: string[];
}

interface IStructPageDataItemParent {
 readonly url: string;
}

export interface IStructPageDataItem {
 readonly menuName: string;
 readonly url: string;
 readonly pos: number;
 readonly parent: IStructPageDataItemParent | null;
 readonly showInMenu: boolean;
}

// interface IMenuHandlingDataItem extends IMenuDataItem {
//  readonly level: number;
//  readonly type: EMenuItemType;
// }

export const combineSiteStruct = (dataItems: IStructPageDataItem[]): ISiteStruct => {
 const menu: ISiteMenuItem[] = [];
 const _pageChildren: { [key: string]: string[] } = dataItems.reduce((p, c) => {
  p[c.url] = [];
  return p;
 }, {} as { [key: string]: string[] });
 dataItems.sort(f => f.pos).forEach(c => {
  if (c.showInMenu)
   menu.push({ url: c.url, pos: c.pos < 1000 ? EMenuItemPosition.BeforePresentations : EMenuItemPosition.AfterPresentations });
  if (c.parent !== null && _pageChildren[c.parent.url] !== undefined) _pageChildren[c.parent.url].push(c.url);
 });
 const urls: string[] = [];
 const pages: TSiteStructPagesMap = dataItems.reduce((p, c) => {
  if (c.url[0] !== "@") urls.push(c.url);
  p[c.url] = {
   url: c.url,
   title: c.menuName,
   parent: c.parent !== null && _pageChildren[c.parent.url] !== undefined ? c.parent.url : null,
   children: _pageChildren[c.url] !== undefined ? _pageChildren[c.url] : [],
  };
  return p;
 }, {} as TSiteStructPagesMap);

 return {
  menu,
  pages,
  urls,
 };
};
