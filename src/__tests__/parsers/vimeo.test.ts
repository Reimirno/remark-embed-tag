import parseVimeo from "../../parsers/vimeo";

describe("vimeo parser", () => {
  it("should return null if no match", () => {
    expect(parseVimeo("hello world")).toBeNull();
  }),
    it("should return null if no args", () => {
      expect(parseVimeo("{% vimeo %}")).toBeNull();
    }),
    it("should parse id", () => {
      const result = parseVimeo("{% vimeo 123 %}");
      expect(result).toEqual(
        expect.objectContaining({
          id: "123",
        })
      );
    });
  it("should ignore extra args", () => {
    const result = parseVimeo("{% vimeo 123 456 %}");
    expect(result).toEqual(
      expect.objectContaining({
        id: "123",
      })
    );
  });
});
