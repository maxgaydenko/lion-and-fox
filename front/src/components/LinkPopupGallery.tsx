import { useQuery } from "@apollo/client";
import { GET_POPUP_GALLERY } from "../gqls/gqls";
import { IPopupGallery, PopupGallery } from "./PopupGallery";

export interface ILinkPopupGalleryProps {
 galleryId: string;
 onClose: () => void;
}

interface IResult {
 readonly popupGallery: {
  readonly title: string;
  readonly gallery: string[] | null;
 };
}

export const LinkPopupGallery: React.FC<ILinkPopupGalleryProps> = ({ galleryId, onClose }: ILinkPopupGalleryProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_POPUP_GALLERY, { variables: { id: galleryId } });

 if (loading) return <div className="AppPulseLoadingIndicator" />;
 if (error) {
  console.log("err", error);
  onClose();
  return null;
 }

 if(data) {
  const popupGallery: IPopupGallery = {
   key: galleryId,
   title: data.popupGallery.title,
   gallery: data.popupGallery.gallery
  }
  return <PopupGallery popupGallery={popupGallery} onClose={onClose} />
 }
 onClose();
 return null;
};
