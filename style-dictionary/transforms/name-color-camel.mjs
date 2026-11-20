// Camel-cases the token path without its leading "Color" group, so
// Color/Background/Base/Primary becomes backgroundBasePrimary.

export default {
  type: "name",
  transform: (token) =>
    token.path
      .slice(token.path[0] === "Color" ? 1 : 0)
      .flatMap((segment) => segment.split(/[^A-Za-z0-9]+/))
      .filter(Boolean)
      .map((word, i) => {
        const lower = word.toLowerCase();
        return i === 0 ? lower : lower[0].toUpperCase() + lower.slice(1);
      })
      .join(""),
};
