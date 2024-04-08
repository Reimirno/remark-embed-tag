import {
  VALID_IFRAME_PROPERTY_KEYS,
  ValidIframePropertyKey,
} from "../widgets/common.js";

export type Payload = {
  args: string[];
  properties: Record<ValidIframePropertyKey, string>;
};

export default function parseArgs(
  input: string,
  tagName: string
): Payload | null {
  /* 
  look for this pattern: {% tagName arg0 arg1 arg2 ... %}
  if found, then return an array of the arguments
  if not, then return null
  there could be 0 args too, in which case return an empty array, i.e. [], not null
  there can be any number of whitespace between the tag name, and arguments
  whitespaces inside quotation marks should be preserved, but those quotes should be removed

  more advanced patterns: {% tagName arg0 arg1 arg2 ... %}(width="100%", height="100%", title="")
  */
  const escapedTagName = tagName.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = new RegExp(
    `{\\%\\s*${escapedTagName}\\s*([^%]*)\\s*%}(?:\\(([^)]*)\\))?`
  );
  const match = pattern.exec(input);
  if (!match) return null;
  const args = !match[1]
    ? []
    : match[1]
        .trim()
        .match(/(?:[^\s"]+|"[^"]*")+/g)
        ?.filter((arg) => arg !== "")
        .map((arg) => arg.replace(/^"|"$/g, "")) ?? [];
  const properties: Record<ValidIframePropertyKey, string> = {} as Record<
    ValidIframePropertyKey,
    string
  >;
  if (match[2]) {
    const splitted = match[2].split(",");
    if (!splitted) return { args, properties };
    splitted?.forEach((property) => {
      const splitted = property.trim().split("=");
      const key = splitted[0]?.trim();
      const value = splitted[1]?.trim().replace(/^"|"$/g, "");
      if (!key || !value) return;
      if (VALID_IFRAME_PROPERTY_KEYS.includes(key as ValidIframePropertyKey)) {
        properties[key as ValidIframePropertyKey] = value;
      }
    });
  }

  return { args, properties } as Payload;
}
