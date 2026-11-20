// Lays out the transformed colours as a SwiftUI enum. Values come ready-made
// from transforms/color-swiftui-dynamic.mjs; this file adds the
// `Color(light:dark:)` initialiser they use.
//
// The enum is `nonisolated` so the colours are usable from any isolation,
// including in packages that default to the main actor.

export default ({ dictionary, options }) => {
  const declarations = dictionary.allTokens.map((token) =>
    [
      `    /// ${token.path.join(" / ")}`,
      `    public static let ${token.name} = ${token.$value}`,
    ].join("\n"),
  );

  return `//
// Do not edit directly, this file was auto-generated from the Lighthouse tokens.
//

import SwiftUI

public extension Color {
${declarations.join("\n\n")}
}

private extension Color {
    nonisolated init(light: UIColor, dark: UIColor) {
        self.init(uiColor: UIColor { traits in
            traits.userInterfaceStyle == .dark ? dark : light
        })
    }
}
`;
};
