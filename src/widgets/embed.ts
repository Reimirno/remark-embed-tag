import type { EmbedProps } from "../schema/embed.js";
import createIframe, { type WithIframeProperties } from "./common.js";

export default function createsEmbedWidget({
  src,
  properties,
}: WithIframeProperties<EmbedProps>): string {
  return createIframe({ src, properties });
}
