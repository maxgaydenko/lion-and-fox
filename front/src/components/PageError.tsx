import React from "react"

interface IProps {
 title: string
 message?: string
 onPageReady: () => void
}

export const PageError: React.FC<IProps> = (props: IProps) => {
 React.useEffect(() => {
  props.onPageReady();
 }, [])
 return (
  <div className="Page PageError">
   <div className="head">
   </div>
   <div className="body">
    <h1>{props.title}</h1>
    {props.message && <p>{props.message}</p>}
   </div>
  </div>
 )
}