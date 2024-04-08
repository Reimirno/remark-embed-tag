import { remark } from "remark";
import remarkTagEmbed from "../../index";
import { defaultConfig } from "../../config";

const processor = remark().use(remarkTagEmbed, defaultConfig);

describe("happy path", () => {
  it("should parse youtube", async () => {
    const file = await processor.process(`{% youtube PJgEu_Ecuf8 %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/www.youtube.com\/embed\/PJgEu_Ecuf8\/" .*>/
    );
  });
  it("should parse steam", async () => {
    const file = await processor.process(`{% steam 1260810 %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/store.steampowered.com\/widget\/1260810\/" .*>/
    );
  });
  it("should parse spotify", async () => {
    const file = await processor.process(
      `{% spotify 2NniAhAtkRACaMeYt48xlD %}`
    );
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/open.spotify.com\/embed\/track\/2NniAhAtkRACaMeYt48xlD\/" .*>/
    );
  });
  it("should parse vimeo", async () => {
    const file = await processor.process(`{% vimeo 123456 %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/player.vimeo.com\/video\/123456\/" .*>/
    );
  });
  it("should parse jsfiddle", async () => {
    const file = await processor.process(`{% jsfiddle 123456 dark %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/jsfiddle.net\/123456\/embedded\/js,resources,html,css,result\/dark\/" .*>/
    );
  });
  it("should parse embed", async () => {
    const file = await processor.process(`{% embed https://example.com %}`);
    expect(String(file)).toMatch(/<iframe src="https:\/\/example.com" .*>/);
  });
});
