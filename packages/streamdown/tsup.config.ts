import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  entry: ["index.tsx"],
  format: ["esm", "cjs"],
  minify: true,
  outDir: "dist",
  sourcemap: true,
  external: ["react", "react-native", "react-native-marked", "react-native-svg", "marked"],
  esbuildOptions(options) {
    options.platform = "neutral";
  },
});
