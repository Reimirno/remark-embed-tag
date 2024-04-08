import { YOUTUBE_TAG_NAME, type YouTubeProps } from "../schema/youtube.js";
import parseArgs from "./common.js";

export default function parseYouTube(inputStr: string): YouTubeProps | null {
  const args = parseArgs(inputStr, YOUTUBE_TAG_NAME);
  if (args === null) return null;
  const youtubeId = args[0] as string;
  if (!youtubeId) return null;
  // by default use "video"
  const type = args[1] === "playlist" ? "playlist" : "video";
  // by default, use cookies. The "false" may come as 2nd or 3rd argument
  const useCookies = !(args[1] === "false" || args[2] === "false");
  return { youtubeId, type, useCookies } as YouTubeProps;
}
