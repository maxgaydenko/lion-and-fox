import React from "react";

interface IProps {
 onPageReady: () => void
}

export const PageHome: React.FC<IProps> = (props: IProps) => {
 React.useEffect(() => {
  props.onPageReady();
 }, [])

 return (
  <div className="Page PageHome">
  </div>
 );

}