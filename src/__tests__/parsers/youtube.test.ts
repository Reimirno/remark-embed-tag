import parseYouTube from "../../parsers/youtube";

describe("youtube args parser", () => {
  it("should return null if no tag", () => {
    expect(parseYouTube("hello world")).toBeNull();
  });
  it("should return null if no match", () => {
    expect(parseYouTube("{% tag %}")).toBeNull();
  });
  it("should return null if no youtubeId", () => {
    expect(parseYouTube("{% youtube %}")).toBeNull();
  });
  it("should return youtubeId if present", () => {
    expect(parseYouTube("{% youtube 123 %}")).toEqual(
      expect.objectContaining({
        youtubeId: "123",
        type: "video",
        useCookies: true,
      })
    );
  });
  it("should return youtubeId and type if present", () => {
    expect(parseYouTube("{% youtube 123 playlist %}")).toEqual(
      expect.objectContaining({
        youtubeId: "123",
        type: "playlist",
        useCookies: true,
      })
    );
  });
  it("should accept third arg without second arg", () => {
    expect(parseYouTube("{% youtube 123 false %}")).toEqual(
      expect.objectContaining({
        youtubeId: "123",
        type: "video",
        useCookies: false,
      })
    );
  });
  it("should return youtubeId and type and useCookies if present", () => {
    expect(parseYouTube("{% youtube 123 playlist false %}")).toEqual(
      expect.objectContaining({
        youtubeId: "123",
        type: "playlist",
        useCookies: false,
      })
    );
  });
  it("should ignore extra args", () => {
    expect(parseYouTube("{% youtube 123 playlist false 456 %}")).toEqual(
      expect.objectContaining({
        youtubeId: "123",
        type: "playlist",
        useCookies: false,
      })
    );
  });
  it("should ignore args that does not make sense", () => {
    expect(parseYouTube("{% youtube 123 false 456 %}")).toEqual(
      expect.objectContaining({
        youtubeId: "123",
        type: "video",
        useCookies: false,
      })
    );
  });
});
