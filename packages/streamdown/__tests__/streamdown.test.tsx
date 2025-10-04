import { parseIncompleteMarkdown } from "../lib/parse-incomplete-markdown";

describe("Streamdown Utilities", () => {
  describe("parseIncompleteMarkdown", () => {
    it("completes incomplete bold text", () => {
      const result = parseIncompleteMarkdown("**bold");
      expect(result).toBe("**bold**");
    });

    it("completes incomplete italic text", () => {
      const result = parseIncompleteMarkdown("*italic");
      expect(result).toBe("*italic*");
    });

    it("handles complete markdown unchanged", () => {
      const text = "**bold** and *italic*";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("handles empty string", () => {
      const result = parseIncompleteMarkdown("");
      expect(result).toBe("");
    });

    it("handles inline code", () => {
      const result = parseIncompleteMarkdown("`code");
      expect(result).toBe("`code`");
    });

    it("handles triple backticks", () => {
      const result = parseIncompleteMarkdown("```js\ncode");
      expect(result).toBe("```js\ncode");
    });
  });
});
