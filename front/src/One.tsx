import React from "react"
import {gql, useQuery} from '@apollo/client'

const GET_POSTS = gql`
 query GetPosts {
  posts {
   id
   title
   publishDate
  }
  authenticatedItem {
   __typename
  }
  users {
   id
   name
  }
 }
`;

interface IPost {
 id: string
 title: string
}

interface IResult {
 posts: IPost[]
}

export const One: React.FC = () => {
 const {data, loading, error, networkStatus} = useQuery<IResult>(GET_POSTS, {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: "no-cache",
 })

 if(loading || networkStatus === 4) return <p>Loading...</p>
 if(error) return <div>Err: {error.message}</div>

 console.log('data', data);

 return (
  <div>
   <h2>One</h2>
   <ul>
    {data?.posts.map(f => <li key={f.id}>{f.title} - {f.id}</li>)}
   </ul>
   <div style={{textAlign:'left'}}>
   <pre>{JSON.stringify(data, null, 2)}</pre>
   </div>
  </div>
 )
}