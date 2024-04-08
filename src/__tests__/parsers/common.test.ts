import parseArgs from "../../parsers/common";
import { VALID_IFRAME_PROPERTY_KEYS } from "../../widgets/common";

describe("common args parser", () => {
  it("should return null if no match", () => {
    expect(parseArgs("hello world", "something")).toBeNull();
  });
  it("should return empty array if no args", () => {
    expect(parseArgs("{% tag %}", "tag")).toEqual({ args: [], properties: {} });
  });
  it("should return all args if present", () => {
    expect(parseArgs("{% tag 123 456 %}", "tag")?.args).toEqual(["123", "456"]);
  });
  it("should return all args if present with quotes", () => {
    expect(parseArgs('{% tag "123 456" 789 %}', "tag")?.args).toEqual([
      "123 456",
      "789",
    ]);
  });
  it("should handle arbitrary whitespace", () => {
    expect(parseArgs("{%tag    123 456%}", "tag")?.args).toEqual([
      "123",
      "456",
    ]);
  });
  it("should handle arbitrary whitespace with quotes", () => {
    expect(parseArgs('{%tag    "123 456" 789%}', "tag")?.args).toEqual([
      "123 456",
      "789",
    ]);
  });
});

describe("common properties parser", () => {
  VALID_IFRAME_PROPERTY_KEYS.forEach((key) => {
    it(`should pick up ${key} if present`, () => {
      expect(parseArgs(`{% tag %}(${key}="value")`, "tag")?.properties).toEqual(
        {
          [key]: "value",
        }
      );
    });
  });
  it("should ignore invalid keys", () => {
    expect(
      parseArgs('{% tag %}(invalidKey="value")', "tag")?.properties
    ).toEqual({});
  });
  it("should ignore invalid keys and pick up valid keys", () => {
    expect(
      parseArgs(
        `{% tag %}(invalidKey="value" ,${VALID_IFRAME_PROPERTY_KEYS[0]}="value")`,
        "tag"
      )?.properties
    ).toEqual({
      [VALID_IFRAME_PROPERTY_KEYS[0]]: "value",
    });
  });
  it("should handle whitespace", () => {
    expect(
      parseArgs(
        `{% tag %}(    ${VALID_IFRAME_PROPERTY_KEYS[0]}  =  "value")`,
        "tag"
      )?.properties
    ).toEqual({
      [VALID_IFRAME_PROPERTY_KEYS[0]]: "value",
    });
  });
  it("should handle quotes", () => {
    expect(
      parseArgs(
        `{% tag %}(    ${VALID_IFRAME_PROPERTY_KEYS[0]}  =  "value with space")`,
        "tag"
      )?.properties
    ).toEqual({
      [VALID_IFRAME_PROPERTY_KEYS[0]]: "value with space",
    });
  });
  it("should handle non-quoted value, as long as it is one word", () => {
    expect(
      parseArgs(`{% tag %}(${VALID_IFRAME_PROPERTY_KEYS[0]}  =  value)`, "tag")
        ?.properties
    ).toEqual({
      [VALID_IFRAME_PROPERTY_KEYS[0]]: "value",
    });
  });
  it("should pick up multiple properties", () => {
    expect(
      parseArgs(
        `{% tag %}(${VALID_IFRAME_PROPERTY_KEYS[0]}="value with space", ${VALID_IFRAME_PROPERTY_KEYS[1]}="value")`,
        "tag"
      )?.properties
    ).toEqual({
      [VALID_IFRAME_PROPERTY_KEYS[0]]: "value with space",
      [VALID_IFRAME_PROPERTY_KEYS[1]]: "value",
    });
  });
  it("should resolve repeated properties", () => {
    expect(
      parseArgs(
        `{% tag %}(${VALID_IFRAME_PROPERTY_KEYS[0]}="value1" , ${VALID_IFRAME_PROPERTY_KEYS[0]}="value2")`,
        "tag"
      )?.properties
    ).toEqual({
      [VALID_IFRAME_PROPERTY_KEYS[0]]: "value2",
    });
  });
  it("should handle trailing or extra commas", () => {
    expect(
      parseArgs(
        `{% tag %}(${VALID_IFRAME_PROPERTY_KEYS[0]}="value1",  , , ${VALID_IFRAME_PROPERTY_KEYS[1]}="value2",,, )`,
        "tag"
      )?.properties
    ).toEqual({
      [VALID_IFRAME_PROPERTY_KEYS[0]]: "value1",
      [VALID_IFRAME_PROPERTY_KEYS[1]]: "value2",
    });
  });
});
