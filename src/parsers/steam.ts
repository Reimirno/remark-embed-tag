import { STEAM_TAG_NAME, type SteamProps } from "../schema/steam.js";
import { type WithIframeProperties } from "../widgets/common.js";
import parseArgs from "./common.js";

export default function parseSteam(
  inputStr: string
): WithIframeProperties<SteamProps> | null {
  const result = parseArgs(inputStr, STEAM_TAG_NAME);
  if (result === null) return null;
  const { args, properties } = result;
  const appid = args[0] as string;
  if (!appid) return null;
  const descriptionOverride = args[1] as string | undefined;
  return { appid, descriptionOverride, properties };
}
