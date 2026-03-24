async function getMod() {
  return import("./pm-generative-ai-google_BKRv0fxc.mjs");
}
const collectedLinks = [];
const collectedStyles = [];
const collectedScripts = [];
const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };
export {
  defaultMod as default
};
