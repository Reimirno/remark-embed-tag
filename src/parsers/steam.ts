import type { SteamType } from "../schema/steam.js";
import parseArgs from "./common.js";

export function parseSteam(inputStr: string): SteamType | null {
  const args = parseArgs(inputStr, "steam");
  if (args === null) return null;
  const appid = args[0] as string;
  const descriptionOverride = args[1] as string | undefined;
  return { appid, descriptionOverride } as SteamType;
}
