import type { Node, Text } from "mdast";
import { visit } from "unist-util-visit";
import { parseSteam } from "./parsers/steam.js";
import createSteamWidget from "./widgets/steam.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function remarkTagEmbed(_options: Record<string, never>) {
  const transformer = async (ast: Node) => {
    visit(ast, "text", (node: Text) => {
      const { value } = node;
      const steam = parseSteam(value);
      if (steam) {
        node.type = "html" as "text";
        node.value = createSteamWidget(steam);
      }
    });
  };
  return transformer;
}
