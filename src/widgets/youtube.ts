import type { YouTubeProps } from "../schema/youtube.js";
import createIframe, { type WithIframeProperties } from "./common.js";

export default function createsYouTubeWidget({
  youtubeId,
  type,
  useCookies,
  properties,
}: WithIframeProperties<YouTubeProps>): string {
  const base = useCookies
    ? "https://www.youtube.com"
    : "https://www.youtube-nocookie.com";
  const embed = type === "video" ? "/embed/" : "/embed/videoseries?list=";
  const src = `${base}${embed}${youtubeId}/`;
  properties.title =
    properties.title ?? `YouTube Widget for ${type} ${youtubeId}`;

  return createIframe({ src, properties });
}
