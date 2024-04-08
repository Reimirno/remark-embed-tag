import { VimeoProps } from "../schema/vimeo.js";
import createIframe, { type WithIframeProperties } from "./common.js";

export default function createsVimeoWidget({
  id,
  properties,
}: WithIframeProperties<VimeoProps>): string {
  const src = `https://player.vimeo.com/video/${id}/`;
  properties.title = properties.title ?? `Vimeo Widget for video ${id}`;

  return createIframe({ src, properties });
}
