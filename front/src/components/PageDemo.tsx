import { useMutation } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { LOGIN } from "../gqls/gqls";
import { appDemoPasswd, IAuthResult, onAppLogin } from "../utils/auth";
import { PageError } from "./PageError";

interface IPageLoginProps {
 onPageReady: () => void;
}

export const PageDemo: React.FC<IPageLoginProps> = ({ onPageReady }: IPageLoginProps) => {
 let { code } = useParams();
 const [loginHandler, { data, error, loading }] = useMutation<IAuthResult>(LOGIN);
 React.useEffect(() => {
  loginHandler({ variables: { login: code, passwd: appDemoPasswd } });
 }, []);

 if (data && data.authenticate) {
  console.log("Data", data);
  if (data.authenticate.__typename === "UserAuthenticationWithPasswordSuccess") {
   onAppLogin(data.authenticate.sessionToken);
  }
 }

 if (loading) return <PageError title="Demo loading" onPageReady={onPageReady} />;

 if (error) return <PageError title={error.name} onPageReady={onPageReady} message={error.message} />

 return <div></div>
};

