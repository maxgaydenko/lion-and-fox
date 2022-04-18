import React from "react";
import { LoginForm } from "./LoginForm";

export const Two: React.FC = () => {
 const [error, setError] = React.useState(null);
 const [isLoaded, setIsLoaded] = React.useState(true);
 // const [items, setItems] = React.useState([]);

 // React.useEffect(() => {
 //  fetch("//keystone:3055/api/users")
 //   .then(res => res.json())
 //   .then(
 //    result => {
 //     console.log('@result', result);
 //     setIsLoaded(true);
 //     // setItems(result);
 //    },
 //    error => {
 //     setIsLoaded(true);
 //     setError(error);
 //    }
 //   );
 // }, []);

 if (error) {
  return <div>err: {error}</div>;
 } else if (!isLoaded) {
  return <div>loading...</div>;
 } else {
  return (
   <div>
    <h1>Two</h1>
    <div><LoginForm /></div>
   </div>
  );
 }
};
