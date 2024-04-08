import type { Node, Text } from "mdast";
import { visit } from "unist-util-visit";
import parseEmbed from "./parsers/embed.js";
import parseSteam from "./parsers/steam.js";
import parseYouTube from "./parsers/youtube.js";
import parseSpotify from "./parsers/spotify.js";
import parseVimeo from "./parsers/vimeo.js";
import parseJsFiddle from "./parsers/jsfiddle.js";
import createEmbedWidget from "./widgets/embed.js";
import createSteamWidget from "./widgets/steam.js";
import createsYouTubeWidget from "./widgets/youtube.js";
import createsSpotifyWidget from "./widgets/spotify.js";
import createsVimeoWidget from "./widgets/vimeo.js";
import createsJsFiddleWidget from "./widgets/jsfiddle.js";
import { Config, defaultConfig } from "./config.js";

export default function remarkTagEmbed(configs: Config = {} as Config) {
  configs = { ...defaultConfig, ...configs };
  const transformer = async (ast: Node) => {
    visit(ast, "text", (node: Text) => {
      const { value } = node;
      if (configs.youtube) {
        const youtube = parseYouTube(value);
        if (youtube) {
          node.type = "html" as "text";
          node.value = createsYouTubeWidget(youtube);
        }
      }
      if (configs.steam) {
        const steam = parseSteam(value);
        if (steam) {
          node.type = "html" as "text";
          node.value = createSteamWidget(steam);
        }
      }
      if (configs.spotify) {
        const spotify = parseSpotify(value);
        if (spotify) {
          node.type = "html" as "text";
          node.value = createsSpotifyWidget(spotify);
        }
      }
      if (configs.vimeo) {
        const vimeo = parseVimeo(value);
        if (vimeo) {
          node.type = "html" as "text";
          node.value = createsVimeoWidget(vimeo);
        }
      }
      if (configs.jsfiddle) {
        const jsfiddle = parseJsFiddle(value);
        if (jsfiddle) {
          node.type = "html" as "text";
          node.value = createsJsFiddleWidget(jsfiddle);
        }
      }
      if (configs.embed) {
        const embed = parseEmbed(value);
        if (embed) {
          node.type = "html" as "text";
          node.value = createEmbedWidget(embed);
        }
      }
    });
  };
  return transformer;
}
