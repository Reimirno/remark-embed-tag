import {
  JSFIDDLE_TAG_NAME,
  type JsFiddleProps,
  type ValidJsFiddleSkin,
  VALID_JSFIDDLE_SKINS,
} from "../schema/jsfiddle.js";
import { WithIframeProperties } from "../widgets/common.js";
import parseArgs from "./common.js";

export default function parseJsFiddle(
  inputStr: string
): WithIframeProperties<JsFiddleProps> | null {
  const result = parseArgs(inputStr, JSFIDDLE_TAG_NAME);
  if (result === null) return null;
  const { args, properties } = result;
  const id = args[0] as string;
  if (!id) return null;
  const isArg1ASkinArg =
    args[1] && VALID_JSFIDDLE_SKINS.includes(args[1] as ValidJsFiddleSkin);
  const isArg2ASkinArg =
    args[2] && VALID_JSFIDDLE_SKINS.includes(args[2] as ValidJsFiddleSkin);
  const skin = (
    isArg1ASkinArg ? args[1] : isArg2ASkinArg ? args[2] : "light"
  ) as ValidJsFiddleSkin;
  const tabs =
    (isArg1ASkinArg ? args[2] : args[1]) || "js,resources,html,css,result";
  return { properties, id, tabs, skin };
}
