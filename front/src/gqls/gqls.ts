import { gql } from "@apollo/client";

export const GET_STRUCT = gql`
 query GetStruct {
  pages {
   url
   pos
   menuName
   menuSection
   projectsCount(where: { isPublished: { equals: true } })
   projects(where: { isPublished: { equals: true } }) {
    url
   }
  }
 }
`;

export const GET_PAGE_BODY = gql`
 query GetPage($url: String!) {
  page(where: { url: $url }) {
   title
   hasBlazon
   content {
    document
   }
   projects {
    url
    title
    img {
     url
    }
   }
  }
 }
`;

