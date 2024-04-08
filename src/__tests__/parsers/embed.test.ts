import parseEmbed from "../../parsers/embed";

describe("embed parser", () => {
  it("should return null if no match", () => {
    expect(parseEmbed("hello world")).toBeNull();
  }),
    it("should return null if no args", () => {
      expect(parseEmbed("{% embed %}")).toBeNull();
    }),
    it("should parse src", () => {
      const result = parseEmbed("{% embed https://example.com %}");
      expect(result).toEqual(
        expect.objectContaining({
          src: "https://example.com",
        })
      );
    });
  it("should ignore extra args", () => {
    const result = parseEmbed("{% embed https://example.com 123 %}");
    expect(result).toEqual(
      expect.objectContaining({
        src: "https://example.com",
      })
    );
  });
});
