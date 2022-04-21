export enum EMenuRouteComponentType {
 Page = 'Page',
 Gallery = 'Gallery',
}

export interface IMenuItem {
 readonly url: string
 readonly name: string
 readonly routeComponentType: EMenuRouteComponentType
 readonly children: IMenuItem[]
}

export interface IMenuStruct {
 readonly menuItems: IMenuItem[]
}

export interface IMenuResult {
 menuName: string
 url: string
 pos: number
}

export const combineMenu = (pages: IMenuResult[]): IMenuStruct => {
 return {
  menuItems: pages.map(f => ({ routeComponentType: EMenuRouteComponentType.Page, url: f.url, name: f.menuName, children: [] })),
 };
}