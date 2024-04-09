import type { Root } from "mdast";
import type { Plugin } from "unified";
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

const remarkTagEmbed: Plugin<[Config], Root> = (configs = {}) => {
  configs = { ...defaultConfig, ...configs };
  return (ast) => {
    visit(ast, "text", (node, index, parent) => {
      if (index === null || index === undefined || !parent) {
        return;
      }
      const { value } = node;
      if (configs.youtube) {
        const youtube = parseYouTube(value);
        if (youtube) {
          parent.children[index] = {
            type: "html",
            value: createsYouTubeWidget(youtube),
          };
        }
      }
      if (configs.steam) {
        const steam = parseSteam(value);
        if (steam) {
          parent.children[index] = {
            type: "html",
            value: createSteamWidget(steam),
          };
        }
      }
      if (configs.spotify) {
        const spotify = parseSpotify(value);
        if (spotify) {
          parent.children[index] = {
            type: "html",
            value: createsSpotifyWidget(spotify),
          };
        }
      }
      if (configs.vimeo) {
        const vimeo = parseVimeo(value);
        if (vimeo) {
          parent.children[index] = {
            type: "html",
            value: createsVimeoWidget(vimeo),
          };
        }
      }
      if (configs.jsfiddle) {
        const jsfiddle = parseJsFiddle(value);
        if (jsfiddle) {
          parent.children[index] = {
            type: "html",
            value: createsJsFiddleWidget(jsfiddle),
          };
        }
      }
      if (configs.embed) {
        const embed = parseEmbed(value);
        if (embed) {
          parent.children[index] = {
            type: "html",
            value: createEmbedWidget(embed),
          };
        }
      }
    });
  };
};

export default remarkTagEmbed;
