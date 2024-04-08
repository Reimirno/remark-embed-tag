import { remark } from "remark";
import remarkTagEmbed from "../../index";

const processor = remark().use(remarkTagEmbed);

describe("happy path", () => {
  it("should parse youtube", async () => {
    const file = await processor.process(`{% youtube aoLhACqJCUg %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/www.youtube.com\/embed\/aoLhACqJCUg\/" .*>/
    );
  });
  it("should parse steam", async () => {
    const file = await processor.process(`{% steam 1260810 %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/store.steampowered.com\/widget\/1260810\/" .*>/
    );
  });
  it("should parse spotify", async () => {
    const file = await processor.process(`{% spotify 123456 %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/open.spotify.com\/embed\/track\/123456" .*>/
    );
  });
  it("should parse embed", async () => {
    const file = await processor.process(`{% embed https://example.com %}`);
    expect(String(file)).toMatch(/<iframe src="https:\/\/example.com" .*>/);
  });
});
