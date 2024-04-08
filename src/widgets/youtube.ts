import type { YouTubeProps } from "../schema/youtube.js";
import createIframe, { type IframeProps } from "./common.js";

export default function createsYouTubeWidget({
  youtubeId,
  type,
  useCookies,
}: YouTubeProps): string {
  const base = useCookies
    ? "https://www.youtube.com"
    : "https://www.youtube-nocookie.com";
  const embed = type === "video" ? "/embed/" : "/embed/videoseries?list=";
  const src = `${base}${embed}${youtubeId}/`;

  const iframeProps: IframeProps = {
    src,
    title: `YouTube Widget for ${type} ${youtubeId}`,
  };

  return createIframe(iframeProps);
}
