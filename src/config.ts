export type Config = {
  youtube?: boolean;
  steam?: boolean;
  spotify?: boolean;
  vimeo?: boolean;
  jsfiddle?: boolean;
  embed?: boolean;
};

export const defaultConfig: Config = {
  youtube: true,
  steam: true,
  spotify: true,
  vimeo: true,
  jsfiddle: true,
  embed: true,
};
