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
    const file = await processor.process(`{% steam 123456 %}`);
    expect(String(file)).toMatch(
      /<iframe src="https:\/\/store.steampowered.com\/widget\/123456\/" .*>/
    );
  });
});
