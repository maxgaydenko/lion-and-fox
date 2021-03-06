import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { ADD_DEMO_USER, GET_ALL_PRESENTATIONS } from "../gqls/gqls";
import { appDemoPasswd, IAuthUser } from "../utils/auth";
import { PageError } from "./PageError";
import { PopupPresentation } from "./PopupPresentation";
import copy from "copy-to-clipboard";
import { IPopupGallery } from "./PopupGallery";

interface IPresentationFile {
 readonly fileName: string;
 readonly fileSize: number;
}

interface IPresentationThumb {
 readonly url: string;
}

interface IPresentation {
 readonly id: string;
 readonly title: string;
 readonly img: IPresentationThumb | null;
 readonly gallery: string[] | null;
 //  readonly uploadedFile: IPresentationFile | null
}

interface IResult {
 readonly showcases: IPresentation[];
}

interface IProps {
 user: IAuthUser | null;
 onPageReady: () => void;
 showPopupGallery: (popupGallery: IPopupGallery) => void;
}

interface IAddDemoResult {
 readonly createUser: {
  readonly id: string;
  readonly name: string;
  readonly role: string;
 };
}

export const PagePresentations: React.FC<IProps> = (props: IProps) => {
 const { data, loading, error } = useQuery<IResult>(GET_ALL_PRESENTATIONS);

 if (loading) return <div>...</div>;
 if (error)
  return (
   <PageError
    title={error.name}
    message={error.message.indexOf("expired access date") >= 0 ? "Expired access date" : error.message}
    onPageReady={props.onPageReady}
   />
  );

 //  return <PageError title="Page not loaded" onPageReady={props.onPageReady} />
 return data ? (
  <LoadedPage showcases={data.showcases} user={props.user} onPageReady={props.onPageReady} showPopupGallery={props.showPopupGallery} />
 ) : (
  <PageError title="Page not loaded" onPageReady={props.onPageReady} />
 );
};

interface ILoadedProps extends IProps {
 readonly showcases: IPresentation[];
}

export const LoadedPage: React.FC<ILoadedProps> = (props: ILoadedProps) => {
 //  const [selectedShowcaseIdx, setSelectedShowcaseIdx] = React.useState<number | null>(null);
 const [checkedShowcases, setCheckedShowcases] = React.useState<string[] | "copyMessage">([]);
 const [addDemoUser, { loading }] = useMutation<IAddDemoResult>(ADD_DEMO_USER);
 React.useEffect(() => {
  props.onPageReady();
 }, []);

 const isAdmin = Boolean(props.user !== null && props.user.role === "admin");

 //  const onSelectShowcase = (showcaseIdx: number) => {
 //   if (props.showcases[showcaseIdx] && props.showcases[showcaseIdx].gallery && props.showcases[showcaseIdx].gallery!.length > 0)
 //    setSelectedShowcaseIdx(showcaseIdx);
 //  };

 //  const onHideShowcase = () => {
 //   setSelectedShowcaseIdx(null);
 //  };

 const onSelectPresentation = (item: IPresentation, itemIdx: number) => {
  props.showPopupGallery({
   key: `showcase-${itemIdx}`,
   title: item.title,
   gallery: item.gallery ?? [],
  });
 };

 const onToggleChecked = (id: string) => {
  if (checkedShowcases !== "copyMessage")
   setCheckedShowcases(checkedShowcases.indexOf(id) >= 0 ? checkedShowcases.filter(f => f !== id) : [...checkedShowcases, id]);
 };

 const onCreateDemo = async () => {
  if (checkedShowcases !== "copyMessage" && checkedShowcases.length > 0) {
   try {
    const demo = {
     password: appDemoPasswd,
     showcases: {
      connect: checkedShowcases.map(id => ({ id: id })),
     },
    };
    const res = await addDemoUser({ variables: { demo } });
    const code = res.data?.createUser.name;
    const url = `${window.location.protocol}//${window.location.host}/demo/${code}`;
    // TODO copy url here
    const done = copy(url);
    console.log("Copy this url: ", url, done);
    setCheckedShowcases("copyMessage");
   } catch (err) {
    console.log("err", err);
   }
  }
 };

 return (
  <div className={"Page" + (checkedShowcases === "copyMessage" ? " copyMessageShown" : "")}>
   {isAdmin && (
    <div className="messageBlock">
     <button className="close" onClick={() => setCheckedShowcases([])}>
      Link copied to clipboard
     </button>
    </div>
   )}
   <div className="head">
    <div className="bc">
     <div className="section">Presentations</div>
    </div>
    {isAdmin && (
     <div className="ac">
      <button onClick={onCreateDemo} disabled={loading || checkedShowcases.length === 0}>
       copy link
      </button>
     </div>
    )}
   </div>
   <div className="body">
    {props.showcases.length > 0 ? (
     <ul className="gallery">
      {props.showcases.map((f, i) => (
       <li key={i}>
        <div
         className={"thumb" + (f.img && f.img.url ? " thumb-wout-logo" : "") + (f.gallery && f.gallery.length > 0 ? " thumb-hov" : " thumb-unauth")}
         onClick={() => onSelectPresentation(f, i)}>
         {f.img && f.img.url && (
          <div className={"thumb-img"} style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL + f.img.url})` }}></div>
         )}
        </div>
        {isAdmin ? (
         <label className="checkbox">
          <input
           type="checkbox"
           disabled={loading || checkedShowcases === "copyMessage"}
           checked={checkedShowcases !== "copyMessage" && checkedShowcases.indexOf(f.id) >= 0}
           onChange={() => onToggleChecked(f.id)}
           value={f.id}
          />{" "}
          <span>{f.title}</span>
         </label>
        ) : (
         <div className="name">{f.title}</div>
        )}
       </li>
      ))}
     </ul>
    ) : (
     <div>No presentations yet</div>
    )}
   </div>
  </div>
 );
};
