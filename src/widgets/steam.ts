import type { SteamProps } from "../schema/steam.js";
import createIframe, { type IframeProps } from "./common.js";

export default function createsSteamWidget({
  appid,
  descriptionOverride,
}: SteamProps): string {
  const src = `https://store.steampowered.com/widget/${appid}/${
    descriptionOverride ? `?t=${descriptionOverride}` : ""
  }`;
  const iframeProps: IframeProps = {
    src,
    width: "100%",
    height: "190",
    title: `Steam Widget for appid ${appid}`,
  };

  return createIframe(iframeProps);
}
