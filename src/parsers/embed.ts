import { EMBED_TAG_NAME, type EmbedProps } from "../schema/embed.js";
import { type WithIframeProperties } from "../widgets/common.js";
import parseArgs from "./common.js";

export default function parseEmbed(
  inputStr: string
): WithIframeProperties<EmbedProps> | null {
  const result = parseArgs(inputStr, EMBED_TAG_NAME);
  if (result === null) return null;
  const { args, properties } = result;
  const src = args[0] as string;
  if (!src) return null;
  return { properties, src };
}
