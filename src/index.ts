import type { Node, Text } from "mdast";
import { visit } from "unist-util-visit";
import parseEmbed from "./parsers/embed.js";
import parseSteam from "./parsers/steam.js";
import parseYouTube from "./parsers/youtube.js";
import parseSpotify from "./parsers/spotify.js";
import createEmbedWidget from "./widgets/embed.js";
import createSteamWidget from "./widgets/steam.js";
import createsYouTubeWidget from "./widgets/youtube.js";
import createsSpotifyWidget from "./widgets/spotify.js";

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
      const spotify = parseSpotify(value);
      if (spotify) {
        node.type = "html" as "text";
        node.value = createsSpotifyWidget(spotify);
      }
      const embed = parseEmbed(value);
      if (embed) {
        node.type = "html" as "text";
        node.value = createEmbedWidget(embed);
      }
    });
  };
  return transformer;
}
