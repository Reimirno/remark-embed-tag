export const VALID_SPOTIFY_TYPES = [
  "track",
  "playlist",
  "album",
  "artist",
] as const;

export type ValidSpotifyType = (typeof VALID_SPOTIFY_TYPES)[number];

export type SpotifyProps = {
  type: ValidSpotifyType;
  spotifyId: string;
};

export const SPOTIFY_TAG_NAME = "spotify";
