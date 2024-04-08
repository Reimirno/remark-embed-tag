import { VIMEO_TAG_NAME, type VimeoProps } from "../schema/vimeo.js";
import { WithIframeProperties } from "../widgets/common.js";
import parseArgs from "./common.js";

export default function parseVimeo(
  inputStr: string
): WithIframeProperties<VimeoProps> | null {
  const result = parseArgs(inputStr, VIMEO_TAG_NAME);
  if (result === null) return null;
  const { args, properties } = result;
  const id = args[0] as string;
  if (!id) return null;
  return { properties, id };
}
