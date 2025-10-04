import { parseIncompleteMarkdown } from "../lib/parse-incomplete-markdown";

describe("Dollar sign handling", () => {
  describe("parseIncompleteMarkdown dollar sign tests", () => {
    it("does not auto-complete single dollar signs (currency)", () => {
      const text = "Text with $formula";
      const result = parseIncompleteMarkdown(text);
      // Single dollar signs should NOT be auto-completed
      expect(result).toBe("Text with $formula");
    });

    it("does not auto-complete dollar at start", () => {
      const result = parseIncompleteMarkdown("$incomplete");
      expect(result).toBe("$incomplete");
    });

    it("keeps paired dollar signs unchanged", () => {
      const text = "Text with $x^2 + y^2 = z^2$";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("handles multiple inline dollar sections", () => {
      const text = "$a = 1$ and $b = 2$";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("does not complete odd number of dollar signs", () => {
      const result = parseIncompleteMarkdown("$first$ and $second");
      expect(result).toBe("$first$ and $second");
    });

    it("completes block math ($$) but not single $", () => {
      const result = parseIncompleteMarkdown("$$block$$ and $inline");
      expect(result).toBe("$$block$$ and $inline");
    });

    it("completes incomplete block math", () => {
      const result = parseIncompleteMarkdown("$$E = mc^2");
      expect(result).toBe("$$E = mc^2$$");
    });

    it("does not modify currency values", () => {
      const text = "$20 is a sum";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("handles multiple dollar amounts", () => {
      const text = "The price is $50 and the discount is $10 off";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("handles single dollar at end", () => {
      const text = "The cost is $";
      const result = parseIncompleteMarkdown(text);
      // Should NOT add a trailing dollar
      expect(result).toBe(text);
    });

    it("handles dollar with variables", () => {
      const text = "Use $variable in the code";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("handles mixed currency and block math", () => {
      const text = "Price $99.99 and formula $$x^2$$";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("does not add dollar when single dollar at start", () => {
      const text = "$x + y = z";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("handles dollar with underscores", () => {
      const text = "$variable_name is used";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("handles price ranges", () => {
      const text = "Price range: $10 - $20";
      const result = parseIncompleteMarkdown(text);
      expect(result).toBe(text);
    });

    it("completes incomplete triple dollar signs", () => {
      const result = parseIncompleteMarkdown("$$$");
      expect(result).toBe("$$$$$");
    });
  });
});
