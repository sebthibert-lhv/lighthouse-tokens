import attachDark from "./style-dictionary/preprocessors/attach-dark.mjs";
import colorCamel from "./style-dictionary/transforms/name-color-camel.mjs";
import swiftuiDynamic from "./style-dictionary/transforms/color-swiftui-dynamic.mjs";
import swiftuiEnum from "./style-dictionary/formats/swiftui-enum.mjs";

export default {
  source: ["tokens/semantic.colors/light.tokens.json"],
  usesDtcg: true,
  preprocessors: ["lighthouse/attach-dark"],
  hooks: {
    preprocessors: { "lighthouse/attach-dark": attachDark },
    transforms: {
      "lighthouse/name/color-camel": colorCamel,
      "lighthouse/color/swiftui-dynamic": swiftuiDynamic,
    },
    formats: { "lighthouse/swiftui-enum": swiftuiEnum },
  },
  platforms: {
    "ios-swift": {
      transforms: ["lighthouse/name/color-camel", "lighthouse/color/swiftui-dynamic"],
      buildPath: "build/ios-swift/",
      files: [
        {
          destination: "LighthouseColor.swift",
          format: "lighthouse/swiftui-enum",
          filter: { $type: "color" },
          options: { className: "LighthouseColor" },
        },
      ],
    },
  },
};
