import { useMutation } from "@apollo/client";
import React from "react";
import { LOGIN } from "../gqls/gqls";

interface IResult {
 readonly authenticate: {
  readonly sessionToken: string
 }
}

// UserAuthenticationWithPasswordSuccess
// UserAuthenticationWithPasswordFailure

interface IProps {}

export const PageLogin: React.FC<IProps> = (props: IProps) => {
 const [loginHandler, {data, error, loading}] = useMutation<IResult>(LOGIN)
 const [login, setLogin] = React.useState<string>("");
 const [passwd, setPasswd] = React.useState<string>("");

 const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  loginHandler({ variables: { login, passwd } })
 }


 console.log('Login data', data);

 return (
  <div className="Page PageLogin">
   <div className="loginFormWrapper">
    <div className="loginFormCard">
     <form onSubmit={onSubmit}>
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
      {error && <div className="err">{error.message}</div>}
      <div className="buttons">
       {loading? <button disabled>Wait...</button>: <button type="submit" disabled={!(login && passwd)}>Log in</button>}
      </div>
     </form>
    </div>
   </div>
  </div>
 );
};
