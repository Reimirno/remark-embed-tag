import parseJsFiddle from "../../parsers/jsfiddle";

describe("jsfiddle parser", () => {
  it("should return null if no match", () => {
    expect(parseJsFiddle("hello world")).toBeNull();
  }),
    it("should return null if no args", () => {
      expect(parseJsFiddle("{% jsfiddle %}")).toBeNull();
    }),
    it("should work with only one arg as id", () => {
      const result = parseJsFiddle("{% jsfiddle 123456 %}");
      expect(result).toEqual(
        expect.objectContaining({
          id: "123456",
        })
      );
    });
  it("should treat it as tabs arg if only one arg given and it is not light or dark", () => {
    const result = parseJsFiddle("{% jsfiddle 123456 tabs %}");
    expect(result).toEqual(
      expect.objectContaining({
        id: "123456",
        tabs: "tabs",
      })
    );
  });
  it("should treat it as skin arg if only one arg given and it is light or dark", () => {
    const result = parseJsFiddle("{% jsfiddle 123456 dark %}");
    expect(result).toEqual(
      expect.objectContaining({
        id: "123456",
        skin: "dark",
      })
    );
  });
  it("should handle skin + tabs", () => {
    const result = parseJsFiddle("{% jsfiddle 123456 dark tabs %}");
    expect(result).toEqual(
      expect.objectContaining({
        id: "123456",
        skin: "dark",
        tabs: "tabs",
      })
    );
  });
  it("should handle tabs + skins", () => {
    const result = parseJsFiddle("{% jsfiddle 123456 tabs dark %}");
    expect(result).toEqual(
      expect.objectContaining({
        id: "123456",
        skin: "dark",
        tabs: "tabs",
      })
    );
  });
  it("should handle tabs + nonsense", () => {
    const result = parseJsFiddle("{% jsfiddle 123456 tabs nonsense %}");
    expect(result).toEqual(
      expect.objectContaining({
        id: "123456",
        tabs: "tabs",
      })
    );
  });
  it("should ignore extra args", () => {
    const result = parseJsFiddle("{% jsfiddle 123456 dark tabs 789 %}");
    expect(result).toEqual(
      expect.objectContaining({
        id: "123456",
        skin: "dark",
        tabs: "tabs",
      })
    );
  });
});
