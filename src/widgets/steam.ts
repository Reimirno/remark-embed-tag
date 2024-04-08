import type { SteamProps } from "../schema/steam.js";
import createIframe, { type WithIframeProperties } from "./common.js";

export default function createsSteamWidget({
  appid,
  descriptionOverride,
  properties,
}: WithIframeProperties<SteamProps>): string {
  const src = `https://store.steampowered.com/widget/${appid}/${
    descriptionOverride ? `?t=${descriptionOverride}` : ""
  }`;
  properties.title = properties.title ?? `Steam Widget for appid ${appid}`;

  return createIframe({ src, properties });
}
