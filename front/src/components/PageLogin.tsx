import { useMutation } from "@apollo/client";
import React from "react";
import { LOGIN } from "../gqls/gqls";
import { onAppLogin } from "../utils/auth";

interface IResult {
 readonly authenticate: {
  readonly sessionToken: string;
  readonly __typename: string;
 };
}

// UserAuthenticationWithPasswordSuccess
// UserAuthenticationWithPasswordFailure

interface IPageLoginProps {
 onPageReady: () => void
}

export const PageLogin: React.FC<IPageLoginProps> = ({onPageReady}: IPageLoginProps) => {
 React.useEffect(() => {
  onPageReady();
 }, [])
 const [loginHandler, { data, error, loading }] = useMutation<IResult>(LOGIN);

 console.log("data", data);

 const onFormSubmit = (login: string, passwd: string) => {
  loginHandler({ variables: { login, passwd } });
 };

 if (data && data.authenticate) {
  console.log('Data', data);
  if (data.authenticate.__typename === "UserAuthenticationWithPasswordSuccess") {
   console.log("success auth with data", data);
   onAppLogin(data.authenticate.sessionToken);
   // window.localStorage["a"] = data.authenticate.sessionToken;
   // setTimeout(() => {
   //  window.location.href = "/presentations/";
   // }, 10);
  }
 }

 return (
  <PageLoginWrapper
   onSubmit={(login, passwd) => onFormSubmit(login, passwd)}
   loading={loading}
   error={error ? error.message : ((data && data.authenticate && data.authenticate.__typename !== "UserAuthenticationWithPasswordSuccess")? "Invalid login or password": undefined)}
  />
 );
};

interface IPageLoginWrapperProps {
 loading: boolean;
 error?: string;
 onSubmit: (login: string, passwd: string) => void;
}

const PageLoginWrapper: React.FC<IPageLoginWrapperProps> = ({ onSubmit, loading, error }: IPageLoginWrapperProps) => {
 // const [loginHandler, {data, error, loading}] = useMutation<IResult>(LOGIN)
 const [login, setLogin] = React.useState<string>("");
 const [passwd, setPasswd] = React.useState<string>("");

 const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log('submit', login, passwd);
  onSubmit(login, passwd);
  // loginHandler({ variables: { login, passwd } })
 };

 return (
  <div className="Page PageLogin">
   <div className="loginFormWrapper">
    <div className="loginFormCard">
     <form onSubmit={onFormSubmit}>
      <div className="title">Log in</div>
      <div className="inputs">
       <div className="input-login">
        <div className="input-wrapper">
         <input type="text" disabled={loading} value={login} onChange={e => setLogin(e.target.value)} autoFocus />
        </div>
       </div>
       <span> / </span>
       <div className="input-passwd">
        <div className="input-wrapper">
         <input type="password" disabled={loading} value={passwd} onChange={e => setPasswd(e.target.value)} />
        </div>
       </div>
      </div>
      {error && !loading && <div className="err">{error}</div>}
      <div className="buttons">
       {loading ? (
        <button disabled>Wait...</button>
       ) : (
        <button type="submit" disabled={!(login && passwd)}>
         Log in
        </button>
       )}
      </div>
     </form>
    </div>
   </div>
  </div>
 );
};
