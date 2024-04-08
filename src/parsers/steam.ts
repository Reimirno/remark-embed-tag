import { STEAM_TAG_NAME, type SteamProps } from "../schema/steam.js";
import parseArgs from "./common.js";

export default function parseSteam(inputStr: string): SteamProps | null {
  const args = parseArgs(inputStr, STEAM_TAG_NAME);
  if (args === null) return null;
  const appid = args[0] as string;
  if (!appid) return null;
  const descriptionOverride = args[1] as string | undefined;
  return { appid, descriptionOverride } as SteamProps;
}
