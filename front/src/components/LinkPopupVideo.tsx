import { useQuery } from "@apollo/client";
import { GET_POPUP_VIDEO } from "../gqls/gqls";

export interface ILinkPopupVideoProps {
 videoId: string;
 onClose: () => void;
}

interface IPopupVideo {
 readonly title: string;
 readonly code: string;
}

interface IResult {
 readonly popupVideo: IPopupVideo;
}

export const LinkPopupVideo: React.FC<ILinkPopupVideoProps> = ({ videoId, onClose }: ILinkPopupVideoProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_POPUP_VIDEO, { variables: { id: videoId } });

 if (loading) return <div className="AppPulseLoadingIndicator" />;
 if (error) {
  console.log("err", error);
  onClose();
  return null;
 }

 if (data) {
  return <PopupVideo popupVideo={data.popupVideo} onClose={onClose} />
 }
 onClose();
 return null;
};

interface IPopupVideoProps {
 readonly popupVideo: IPopupVideo;
 readonly onClose: () => void;
}

const PopupVideo: React.FC<IPopupVideoProps> = ({ popupVideo, onClose }: IPopupVideoProps) => {
 return (
  <div className="PopupGallery">
   <div className="popup-head">
    <div className="title">{popupVideo.title}</div>
    <div className="close">
     <button onClick={onClose} />
    </div>
   </div>
   <div className="popup-body">
    <div className="popup-body-box">
     <div className="video" dangerouslySetInnerHTML={{__html: popupVideo.code}} />
    </div>
   </div>
  </div>
 );
};
