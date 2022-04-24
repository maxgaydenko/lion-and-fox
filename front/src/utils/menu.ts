export enum EMenuItemType {
 Page = "Page",
 Gallery = "Gallery",
 Section = "Section",
}

export interface IMenuItem {
 readonly url: string;
 readonly title: string;
 readonly section: string;
 readonly type: EMenuItemType;
}

export interface IMenu {
 readonly items: IMenuItem[];
 readonly galleriesRoutes: string[];
}

export interface IMenuDataItem {
 readonly menuName: string;
 readonly menuSection: string;
 readonly url: string;
 readonly pos: number;
}

interface IMenuHandlingDataItem extends IMenuDataItem {
 readonly level: number;
 readonly type: EMenuItemType;
}

export const combineMenu = (pages: IMenuDataItem[], galleries: IMenuDataItem[]): IMenu => {
 const galleriesRoutes: string[] = [];
 const _pages: IMenuHandlingDataItem[] = pages.map(f => {
  return {
   ...f,
   level: f.url.split("/").length,
   type: EMenuItemType.Page,
  };
 });
 const _galleries: IMenuHandlingDataItem[] = galleries.map(f => {
  galleriesRoutes.push(f.url);
  return {
   ...f,
   level: f.url.split("/").length,
   type: EMenuItemType.Gallery,
  };
 });
 const _allItems: IMenuHandlingDataItem[] = [..._pages, ..._galleries].sort((a, b) => a.pos - b.pos);
 // .sort((a,b) => (a.level===b.level)? a.pos-b.pos: a.level - b.level)
 // .sort((a,b) => (a.url < b.url)? 1: - 1)

 const items: IMenuItem[] = _allItems.map(f => ({ url: f.url, title: f.menuName, section: f.menuSection, type: f.type }));
 // let prevSection = "";
 // const items: IMenuItem[] = _allItems.reduce((p,c) => {
 //  if(c.menuSection && prevSection !== c.menuSection)
 //   p.push({title: c.menuSection, section: c.menuSection, url: `${c.url}`, type: EMenuItemType.Section});
 //  p.push({title: c.menuName, section: c.menuSection, url: `${c.url}`, type: c.type});
 //  prevSection = c.menuSection
 //  return p;
 // }, [] as IMenuItem[]);
 return {
  items,
  galleriesRoutes,
 };
};
