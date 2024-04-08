export const VALID_JSFIDDLE_SKINS = ["light", "dark"] as const;

export type ValidJsFiddleSkin = (typeof VALID_JSFIDDLE_SKINS)[number];

export type JsFiddleProps = {
  id: string;
  tabs: string;
  skin: ValidJsFiddleSkin;
};

export const JSFIDDLE_TAG_NAME = "jsfiddle";
