import React from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN_QUERY = gql`
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

export const LoginForm: React.FC = () => {
 const [login, setLogin] = React.useState<string>("max@gaydenko.ru");
 const [passwd, setPasswd] = React.useState<string>("123123123");
 const [auth, { data, loading, error }] = useMutation(LOGIN_QUERY);

 const submit = (event: any) => {
  event.preventDefault();
  console.log(`form submit with {${login}}, {${passwd}}`);
  auth({ variables: { login, passwd } });
 };

 const logout = () => {
  window.localStorage.removeItem('a');
  console.log('logout');
  setTimeout(() => {
   console.log('refresh page');
   window.location.href = '/?nc='+(new Date()).getTime()
  }, 100);
 }

 if (loading) return <div>Submitting...</div>;
 if (error) return <div>Submission error! ${error.message}</div>;

 if(data) {
  console.log("data", data);
  if(data.authenticate && data.authenticate.sessionToken) {
   window.localStorage.setItem('a', data.authenticate.sessionToken)
   setTimeout(() => {
    window.location.href = '/?nc='+(new Date()).getTime()
   }, 1000);
   return <div>Redirecting....<br/><i>{data.authenticate.sessionToken}</i></div>
  }
 }

 return (
  <div>
   <form onSubmit={submit}>
    <div>
     <label>Login</label> <input autoFocus value={login} onChange={e => setLogin(e.target.value)} />
    </div>
    <div>
     <label>Passwd</label> <input value={passwd} onChange={e => setPasswd(e.target.value)} />
    </div>
    <div>
     <button type="submit">click</button>
    </div>
   </form>
   <div>or</div>
   <button onClick={logout}>logout</button>
  </div>
 );
};
