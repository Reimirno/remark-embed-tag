import { remark } from "remark";
import remarkTagEmbed from "../../index";

const processor = remark().use(remarkTagEmbed, {
  youtube: true,
  // steam is true by default, not explicitly set here
  spotify: false,
  vimeo: false,
  jsfiddle: false,
  embed: false,
});

describe("a processor with only youtube explicitly turned on and steam by default on", () => {
  it("should still parse youtube", async () => {
    const file = await processor.process(`{% youtube PJgEu_Ecuf8 %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/www.youtube.com\/embed\/PJgEu_Ecuf8\/" .*>/
    );
  });
  it("should still parse steam", async () => {
    const file = await processor.process(`{% steam 1260810 %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/store.steampowered.com\/widget\/1260810\/" .*>/
    );
  });
  it("should not parse spotify", async () => {
    const file = await processor.process(
      `{% spotify 2NniAhAtkRACaMeYt48xlD %}`
    );
    expect(String(file)).not.toContain("iframe");
  });
  it("should not parse vimeo", async () => {
    const file = await processor.process(`{% vimeo 123456 %}`);
    expect(String(file)).not.toContain("iframe");
  });
  it("should not parse jsfiddle", async () => {
    const file = await processor.process(`{% jsfiddle 123456 dark %}`);
    expect(String(file)).not.toContain("iframe");
  });
  it("should not parse embed", async () => {
    const file = await processor.process(`{% embed https://example.com %}`);
    expect(String(file)).not.toContain("iframe");
  });
  it("should not parse anything else", async () => {
    const file = await processor.process(`{% unknown whatever %}`);
    expect(String(file)).not.toContain("iframe");
  });
});
