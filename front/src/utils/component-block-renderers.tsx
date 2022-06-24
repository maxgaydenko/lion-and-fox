// import { DocumentRenderer } from '@keystone-6/document-renderer';
import { InferRenderersForComponentBlocks } from "@keystone-6/fields-document/component-blocks";
import { componentBlocks } from "./page-component-blocks";

export const componentBlockRenderers: InferRenderersForComponentBlocks<typeof componentBlocks> = {
 assetImg: props => {
  if (props.assetImg?.data.img.url) {
   return (
    <div className="pageImg">
     {props.url ? (
      <a href={props.url}>
       <img src={process.env.REACT_APP_BACKEND_URL + props.assetImg?.data.img.url} />
      </a>
     ) : (
      <img src={process.env.REACT_APP_BACKEND_URL + props.assetImg?.data.img.url} />
     )}
    </div>
   );
  }
  return null;
 },
 videoCode: props => {
  if (props.code) {
   return <div className="pageVideo" dangerouslySetInnerHTML={{ __html: props.code }} />;
  }
  return null;
 },
};
