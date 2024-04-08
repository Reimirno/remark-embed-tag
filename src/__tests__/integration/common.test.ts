import { remark } from "remark";
import remarkTagEmbed from "../../index";

const processor = remark().use(remarkTagEmbed);

const sampleInput = `\
{% youtube aoLhACqJCUg %}`;

test("parseYouTube", async () => {
  const file = await processor.process(sampleInput);
  expect(String(file)).toBe(`\
<iframe src="https://www.youtube.com/embed/aoLhACqJCUg" frameborder="0" allowfullscreen></iframe>`);
});
