import React from "react"

interface IProps {}

export const PageLogin: React.FC<IProps> = (props: IProps) => {
 const [login, setLogin] = React.useState<string>("")
 const [passwd, setPasswd] = React.useState<string>("")

 return (
  <div className="Page PageLogin">
   <div className="loginFormCard">
    <form>
    <div className="title">Log in</div>
    <div className="inputs">
     <div className="input-login"><div className="input-wrapper"><input type="text" value={login} onChange={e => setLogin(e.target.value)} autoFocus /></div></div>
     <span> / </span>
     <div className="input-passwd"><div className="input-wrapper"><input type="password" value={passwd} onChange={e=>setPasswd(e.target.value)} /></div></div>
    </div>
    <div className="buttons">
     <button type="submit">Log in</button>
    </div>
    </form>
   </div>
  </div>
 )
}