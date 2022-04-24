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
 readonly menuItems: IMenuItem[];
 readonly galleriesRoutes: string[];
}

interface IMenuDataItemProject {
 readonly url: string
}

export interface IMenuDataItem {
 readonly menuName: string;
 readonly menuSection: string;
 readonly url: string;
 readonly pos: number;
 // readonly projectsCount: number;
 readonly projects: IMenuDataItemProject[]
}

// interface IMenuHandlingDataItem extends IMenuDataItem {
//  readonly level: number;
//  readonly type: EMenuItemType;
// }

export const combineMenu = (pages: IMenuDataItem[], galleries: IMenuDataItem[]): IMenu => {
 const galleriesRoutes: string[] = [];
 // const _pages: IMenuHandlingDataItem[] = pages.map(f => {
 //  return {
 //   ...f,
 //   level: f.url.split("/").length,
 //   type: EMenuItemType.Page,
 //  };
 // });
 // const _galleries: IMenuHandlingDataItem[] = galleries.map(f => {
 //  galleriesRoutes.push(f.url);
 //  return {
 //   ...f,
 //   level: f.url.split("/").length,
 //   type: EMenuItemType.Gallery,
 //  };
 // });
 // const _allItems: IMenuHandlingDataItem[] = [..._pages, ..._galleries].sort((a, b) => a.pos - b.pos);
 // .sort((a,b) => (a.level===b.level)? a.pos-b.pos: a.level - b.level)
 // .sort((a,b) => (a.url < b.url)? 1: - 1)

 // const items: IMenuItem[] = _allItems.map(f => ({ url: f.url, title: f.menuName, section: f.menuSection, type: f.type }));
 const menuItems: IMenuItem[] = pages.sort((a,b) => a.pos-b.pos).map((page,pageIdx) => {
  if(page.projects.length > 0) {
   page.projects.forEach(project => {
    galleriesRoutes.push(`${page.url}/${project.url}`)
   }) 
  }
  return {
   section: page.menuSection,
   title: page.menuName,
   url: page.url,
   type: EMenuItemType.Page
  }
 });

 return {
  menuItems,
  galleriesRoutes,
 };
};
