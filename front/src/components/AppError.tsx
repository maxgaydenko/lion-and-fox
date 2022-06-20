interface IProps {
 title: string
 message?: string
}

export const AppError: React.FC<IProps>  = ({title, message}: IProps) => {
 return (
  <div className="AppError">
   <div className="title">{title}</div>
   {message && <div className="message">{message}</div>}
  </div>
 )
}