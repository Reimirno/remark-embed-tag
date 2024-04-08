import { type JsFiddleProps } from "../schema/jsfiddle.js";
import createIframe, { type WithIframeProperties } from "./common.js";

export default function createsJsFiddleWidget({
  id,
  tabs,
  skin,
  properties,
}: WithIframeProperties<JsFiddleProps>): string {
  const src = `https://jsfiddle.net/${id}/embedded/${tabs}/${skin}/`;
  properties.title = properties.title ?? `JSFiddle Widget for ${id}`;
  properties.height = properties.height ?? "360";
  return createIframe({ src, properties });
}
