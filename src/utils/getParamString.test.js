import getParamString from "./getParamString";

describe("getParamString function tested", () => {
  const dataset = [
    [{ a: "1", b: "2", c: "3", url: "url" }, "url?&a=1&b=2&c=3"],
    [{ x: "9", y: "8", z: "7", url: "http" }, "http?&x=9&y=8&z=7"],
  ];
  test.each(dataset)(
    "Given %p in random case, returns %p in start case",
    (inputText, expectedText) => {
      const formattedText = getParamString(inputText);
      expect(formattedText).toEqual(expectedText);
    }
  );
});
