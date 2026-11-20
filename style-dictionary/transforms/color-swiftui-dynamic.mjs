// Turns a colour token's light value and its attached dark value
// ($extensions["com.lhv.dark"], see preprocessors/attach-dark.mjs) into a
// SwiftUI `Color(light:dark:)` expression. The initialiser is emitted by
// formats/swiftui-enum.mjs.

const component = (n) => n.toFixed(3);

const uiColor = ({ colorSpace, components, alpha }, path) => {
  if (colorSpace !== "srgb") {
    throw new Error(`${path.join("/")}: unsupported colour space "${colorSpace}"`);
  }
  const [r, g, b] = components.map(component);
  return `UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: ${component(alpha ?? 1)})`;
};

export default {
  type: "value",
  filter: (token) => token.$type === "color",
  transform: (token) => {
    const light = uiColor(token.$value, token.path);
    const dark = uiColor(token.$extensions["com.lhv.dark"], token.path);
    return `Color(\n        light: ${light},\n        dark: ${dark}\n    )`;
  },
};
