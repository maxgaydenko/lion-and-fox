export interface IAuthUser {
 readonly id: string
 readonly name: string
 readonly role: string
}

export interface IAuthResult {
 readonly authenticate: {
  readonly sessionToken: string;
  readonly __typename: string;
 };
}


export const onAppLogout = () => {
 window.localStorage.removeItem("a");
 setTimeout(() => {
  window.location.href = "/";
 }, 10);
};

export const onAppLogin = (token: string) => {
 window.localStorage["a"] = token;
 setTimeout(() => {
  window.location.href = "/presentations/";
 }, 10);
}

export const appGetToken = (): string => window.localStorage.getItem("a") ?? "";
export const appDemoPasswd = "presentation";
