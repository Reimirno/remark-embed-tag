import { SPOTIFY_TAG_NAME, type SpotifyProps } from "../schema/spotify.js";
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
  const type = args[1] || "track";
  return { properties, type, spotifyId };
}
