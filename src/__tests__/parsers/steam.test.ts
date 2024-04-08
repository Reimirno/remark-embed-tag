import parseSteam from "../../parsers/steam";

describe("steam args parser", () => {
  it("should return null if no tag", () => {
    expect(parseSteam("hello world")).toBeNull();
  });
  it("should return null if no match", () => {
    expect(parseSteam("{% tag %}")).toBeNull();
  });
  it("should return null if no appid", () => {
    expect(parseSteam("{% steam %}")).toBeNull();
  });
  it("should return appid if present", () => {
    expect(parseSteam("{% steam 123 %}")).toEqual(
      expect.objectContaining({ appid: "123" })
    );
  });
  it("should return appid and description if present", () => {
    expect(parseSteam('{% steam 123 "456 789" %}')).toEqual(
      expect.objectContaining({
        appid: "123",
        descriptionOverride: "456 789",
      })
    );
  });
  it("should ignore extra args", () => {
    expect(parseSteam('{% steam 123 "456" 789 %}')).toEqual(
      expect.objectContaining({
        appid: "123",
        descriptionOverride: "456",
      })
    );
  });
});
