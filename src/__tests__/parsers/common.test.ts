import parseArgs from "../../parsers/common";

describe("common args parser", () => {
  it("should return null if no match", () => {
    expect(parseArgs("hello world", "something")).toBeNull();
  });
  it("should return empty array if no args", () => {
    expect(parseArgs("{% tag %}", "tag")).toEqual([]);
  });
  it("should return all args if present", () => {
    expect(parseArgs("{% tag 123 456 %}", "tag")).toEqual(["123", "456"]);
  });
  it("should return all args if present with quotes", () => {
    expect(parseArgs('{% tag "123 456" 789 %}', "tag")).toEqual([
      "123 456",
      "789",
    ]);
  });
  it("should handle arbitrary whitespace", () => {
    expect(parseArgs("{%tag    123 456%}", "tag")).toEqual(["123", "456"]);
  });
  it("should handle arbitrary whitespace with quotes", () => {
    expect(parseArgs('{%tag    "123 456" 789%}', "tag")).toEqual([
      "123 456",
      "789",
    ]);
  });
});
