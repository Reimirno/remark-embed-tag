import { YOUTUBE_TAG_NAME, type YouTubeProps } from "../schema/youtube.js";
import { type WithIframeProperties } from "../widgets/common.js";
import parseArgs from "./common.js";

export default function parseYouTube(
  inputStr: string
): WithIframeProperties<YouTubeProps> | null {
  const result = parseArgs(inputStr, YOUTUBE_TAG_NAME);
  if (result === null) return null;
  const { args, properties } = result;
  const youtubeId = args[0] as string;
  if (!youtubeId) return null;
  // by default use "video"
  const type = args[1] === "playlist" ? "playlist" : "video";
  // by default, use cookies. The "false" may come as 2nd or 3rd argument
  const useCookies = !(args[1] === "false" || args[2] === "false");
  return { youtubeId, type, useCookies, properties };
}
