import type { Node, Text } from "mdast";
import { visit } from "unist-util-visit";
import parseSteam from "./parsers/steam.js";
import parseYouTube from "./parsers/youtube.js";
import createSteamWidget from "./widgets/steam.js";
import createsYouTubeWidget from "./widgets/youtube.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function remarkTagEmbed() {
  const transformer = async (ast: Node) => {
    visit(ast, "text", (node: Text) => {
      const { value } = node;
      const steam = parseSteam(value);
      if (steam) {
        node.type = "html" as "text";
        node.value = createSteamWidget(steam);
      }
      const youtube = parseYouTube(value);
      if (youtube) {
        node.type = "html" as "text";
        node.value = createsYouTubeWidget(youtube);
      }
    });
  };
  return transformer;
}
