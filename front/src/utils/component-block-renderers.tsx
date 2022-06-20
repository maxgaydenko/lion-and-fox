// import { DocumentRenderer } from '@keystone-6/document-renderer';
import { InferRenderersForComponentBlocks } from "@keystone-6/fields-document/component-blocks";
import { componentBlocks } from "./page-component-blocks";

export const componentBlockRenderers: InferRenderersForComponentBlocks<typeof componentBlocks> = {
 assetImg: props => {
  if (props.assetImg?.data.img.url) {
   return (
    <div>
     <img src={process.env.REACT_APP_BACKEND_URL + props.assetImg?.data.img.url} />
    </div>
   );
  }
  return null;
 },
 videoCode: props => {
  // if (props.code) return <div dangerouslySetInnerHTML={{ __html: props.code.toString() }} />;
  if(props.code) {
   return <div dangerouslySetInnerHTML={{__html: props.code}} />
   // const div = document.createElement('div');
   // div.innerHTML = props.code.toString();
   // console.log('props', props.code);
   // const html = div.childNodes.length > 0? div.childNodes[0].nodeValue: null;
   // return <div dangerouslySetInnerHTML={{__html: html!==null? html: ""}} />
  }
  return null;
 },
};
