import { gql } from "@apollo/client";

export const GET_STRUCT = gql`
 fragment AuthFragment on User {
  id
  name
 }
 query GetStruct {
  authenticatedItem {
   ...AuthFragment
  }
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

export const GET_PROJECT_BODY = gql`
 query GetProject($projectUrl: String!) {
  project(where: { url: $projectUrl }) {
   hasBlazon
   title
   page {
    url
   }
   gallery
   content {
    document
   }
  }
 }
`;

export const LOGIN = gql`
 fragment AuthFragment on UserAuthenticationWithPasswordSuccess {
  item {
   id
   name
  }
  sessionToken
 }
 mutation LoginQuery($login: String!, $passwd: String!) {
  authenticate: authenticateUserWithPassword(email: $login, password: $passwd) {
   __typename
   ...AuthFragment
  }
 }
`;

export const GET_ALL_PRESENTATIONS = gql`
 query GetAllPresentations {
  presentations {
   title
   pos
   uploadedFile {
    fileName
    fileSize
   }
  }
 }
`;
