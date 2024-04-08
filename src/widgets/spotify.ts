import type { SpotifyProps } from "../schema/spotify.js";
import createIframe, { type WithIframeProperties } from "./common.js";

export default function createsSpotifyWidget({
  type,
  spotifyId,
  properties,
}: WithIframeProperties<SpotifyProps>): string {
  const src = `https://open.spotify.com/embed/${type}/${spotifyId}`;
  properties.title =
    properties.title ?? `Spotify Widget for ${type} ${spotifyId}`;

  return createIframe({ src, properties });
}
