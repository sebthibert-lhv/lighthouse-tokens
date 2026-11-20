// Attaches each colour token's dark-mode value from the Figma dark export, so
// later transforms can build one colour per token with both appearances.
// The dark value is stored in $extensions["com.lhv.dark"].

import { readFileSync } from "node:fs";

const DARK = "tokens/semantic.colors/dark.tokens.json";

const isToken = (node) => node && typeof node === "object" && "$value" in node;

export default (tokens) => {
  const dark = JSON.parse(readFileSync(DARK, "utf8"));

  const walk = (lightNode, darkNode, path) => {
    if (isToken(lightNode)) {
      if (lightNode.$type !== "color") return;
      if (!isToken(darkNode) || darkNode.$type !== "color") {
        throw new Error(`Missing dark colour for ${path.join("/")} in ${DARK}`);
      }
      lightNode.$extensions = { ...lightNode.$extensions, "com.lhv.dark": darkNode.$value };
      return;
    }
    for (const [key, child] of Object.entries(lightNode)) {
      if (key.startsWith("$") || !child || typeof child !== "object") continue;
      walk(child, darkNode?.[key], [...path, key]);
    }
  };

  walk(tokens, dark, []);
  return tokens;
};
