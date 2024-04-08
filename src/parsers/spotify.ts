import {
  SPOTIFY_TAG_NAME,
  type SpotifyProps,
  VALID_SPOTIFY_TYPES,
  type ValidSpotifyType,
} from "../schema/spotify.js";
import { type WithIframeProperties } from "../widgets/common.js";
import parseArgs from "./common.js";

export default function parseSpotify(
  inputStr: string
): WithIframeProperties<SpotifyProps> | null {
  const result = parseArgs(inputStr, SPOTIFY_TAG_NAME);
  if (result === null) return null;
  const { args, properties } = result;
  const spotifyId = args[0] as string;
  if (!spotifyId) return null;
  const type =
    args[1] && VALID_SPOTIFY_TYPES.includes(args[1] as ValidSpotifyType)
      ? (args[1] as ValidSpotifyType)
      : ("track" as ValidSpotifyType);
  return { properties, type, spotifyId };
}
