async function getMod() {
  return import("./pm-gke-ai-google_PMx8Nzun.mjs");
}
const collectedLinks = [];
const collectedStyles = [];
const collectedScripts = [];
const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };
export {
  defaultMod as default
};
