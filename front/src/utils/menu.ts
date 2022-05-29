export enum EMenuItemType {
 Page = "Page",
 Gallery = "Gallery",
 Section = "Section",
}

export enum EMenuItemPosition {
 BeforePresentations = "BeforePresentations",
 AfterPresentations = "AfterPresentations",
}

export interface IMenuItem {
 readonly url: string;
 readonly title: string;
 readonly section: string;
 readonly type: EMenuItemType;
 readonly pos: EMenuItemPosition;
}

export interface IMenuProjectItem {
 readonly pageUrl: string;
 readonly projectUrl: string;
}

export interface IMenu {
 readonly menuItems: IMenuItem[];
 readonly projectItems: IMenuProjectItem[];
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

export const combineMenu = (pages: IMenuDataItem[]): IMenu => {
 const projectItems: IMenuProjectItem[] = [];
 const menuItems: IMenuItem[] = pages.sort((a,b) => a.pos-b.pos).map((page,pageIdx) => {
  if(page.projects.length > 0) {
   page.projects.forEach(project => {
    projectItems.push({pageUrl: page.url, projectUrl: project.url})
   }) 
  }
  return {
   section: page.menuSection,
   title: page.menuName,
   url: page.url,
   type: EMenuItemType.Page,
   pos: page.pos < 1000? EMenuItemPosition.BeforePresentations: EMenuItemPosition.AfterPresentations,
  }
 });

 return {
  menuItems,
  projectItems,
 };
};
