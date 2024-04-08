import parseSpotify from "../../parsers/spotify";

describe("spotify parser", () => {
  it("should return null if no match", () => {
    expect(parseSpotify("hello world")).toBeNull();
  }),
    it("should return null if no args", () => {
      expect(parseSpotify("{% spotify %}")).toBeNull();
    }),
    it("should default to track", () => {
      const result = parseSpotify("{% spotify 123456 %}");
      expect(result).toEqual(
        expect.objectContaining({
          type: "track",
          spotifyId: "123456",
        })
      );
    }),
    it("should parse track", () => {
      const result = parseSpotify("{% spotify 123456 track %}");
      expect(result).toEqual(
        expect.objectContaining({
          type: "track",
          spotifyId: "123456",
        })
      );
    });
  it("should parse artist", () => {
    const result = parseSpotify("{% spotify 123456 artist %}");
    expect(result).toEqual(
      expect.objectContaining({
        type: "artist",
        spotifyId: "123456",
      })
    );
  });
  it("should ignore extra args", () => {
    const result = parseSpotify("{% spotify 123456 artist 789 %}");
    expect(result).toEqual(
      expect.objectContaining({
        type: "artist",
        spotifyId: "123456",
      })
    );
  });
});
