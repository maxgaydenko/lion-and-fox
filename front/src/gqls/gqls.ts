import { gql } from "@apollo/client";

export const GET_STRUCT = gql`
 fragment AuthFragment on User {
  id
  name
  role
 }
 query GetStruct {
  authenticatedItem {
   ...AuthFragment
  }
  pages(where: { isPublished: { equals: true } }) {
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

// export const LOGIN_DEMO = gql`
//  fragment AuthFragment on UserAuthenticationWithPasswordSuccess {
//   item {
//    id
//    name
//   }
//   sessionToken
//  }
//  mutation LoginDemo($login: String!) {
//   authenticate: authenticateUserWithPassword(email: $login, password: "presentation") {
//    __typename
//    ...AuthFragment
//   }
//  }
// `;

// TODO use it
export const ADD_DEMO_USER = gql`
# mutation AddDemoUser($passwd: String!) {
 mutation AddDemoUser($demo: UserCreateInput!) {
  createUser(
   data: $demo
  ) {
   id
   name
   role
  }
 }
`;

// TODO use it
export const LAST_ACCESS_UPDATE = gql`
 mutation UpdateLastAccessTime($id: ID!, $date: DateTime!) {
  updateUser(where: { id: $id }, data: { lastAccessDate: $date }) {
   lastAccessDate
   expirationDate
  }
 }
`;

export const GET_ALL_PRESENTATIONS = gql`
 query GetAllPresentations {
  showcases(where: { isPublished: { equals: true } }, orderBy: { pos: asc }) {
   id
   title
   img {
    url
   }
   gallery
  }
 }
`;
