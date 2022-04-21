import { gql, useQuery } from "@apollo/client";
import { IMenuResult } from "../utils/menu";

export const GET_MENU_PAGES = gql`
 query GetMenuPages {
  pages {
   url
   pos
   menuName
  }
 }
`;

export interface IMenuLoaded {
 pages: IMenuResult[]
}

interface IUseMenuLoadResult {
 data?: IMenuLoaded
 loading: boolean
 error: any
}

export const useMenuLoad = (): IUseMenuLoadResult => {
 const {data, loading, error, networkStatus} = useQuery<IMenuLoaded>(GET_MENU_PAGES, {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: "no-cache",
 })

 console.group('useMenuLoad')
 console.log('data', data);
 console.log('loading', loading);
 console.log('error', error);
 console.log('networkStatus', networkStatus);
 console.groupEnd();

 return {
  loading: loading,
  error: error,
  data: data,
 }
};
