export const VALID_YOUTUBE_TYPES = ["playlist", "video"] as const;

export type ValidYouTubeType = (typeof VALID_YOUTUBE_TYPES)[number];

export type YouTubeProps = {
  youtubeId: string;
  type: ValidYouTubeType;
  useCookies: boolean;
};

export const YOUTUBE_TAG_NAME = "youtube";
