import { Traverse } from "neotraverse/modern";
import pLimit from "p-limit";
import { r as removeBase, i as isCoreRemotePath, V as VALID_INPUT_FORMATS, A as AstroError, U as UnknownContentCollectionError, p as prependForwardSlash } from "./astro/assets-service_BIh11WOh.mjs";
import { a as createComponent, i as renderUniqueStylesheet, j as renderScriptElement, k as createHeadAndContent, b as renderComponent, r as renderTemplate, u as unescapeHTML } from "./astro/server_8LY360yf.mjs";
import "kleur/colors";
import * as devalue from "devalue";
const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isCoreRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}
class DataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import("./_astro_data-layer-content_B-2OIBLO.mjs");
      if (data.default instanceof Map) {
        return DataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return DataStore.fromMap(map);
    } catch {
    }
    return new DataStore();
  }
  static async fromMap(data) {
    const store = new DataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();
const __vite_import_meta_env__ = { "ASSETS_PREFIX": void 0, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://bhaskarkotakonda.github.io", "SSR": true };
function createCollectionToGlobResultMap({
  globResult,
  contentDir: contentDir2
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir2}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap: contentCollectionToEntryMap2,
  dataCollectionToEntryMap: dataCollectionToEntryMap2,
  getRenderEntryImport,
  cacheEntriesByCollection: cacheEntriesByCollection2
}) {
  return async function getCollection2(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap2) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap2) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import("./_astro_asset-imports_DSNGcCXS.mjs");
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        const entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap2[collection] : dataCollectionToEntryMap2[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection2.has(collection)) {
      entries = cacheEntriesByCollection2.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection2.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}
const contentDir = "/src/content/";
const contentEntryGlob = /* @__PURE__ */ Object.assign({ "/src/content/blog/ai-anti-marxian-force.mdx": () => import("./ai-anti-marxian-force_CJFvxacD.mjs"), "/src/content/blog/ai-spending-600-billion-conundrum.mdx": () => import("./ai-spending-600-billion-conundrum_OVvYr4m4.mjs"), "/src/content/blog/endgame-ai-corporate-transformation.mdx": () => import("./endgame-ai-corporate-transformation_BtMU9CVj.mjs"), "/src/content/blog/navigating-career-post-ai-labour-world.mdx": () => import("./navigating-career-post-ai-labour-world_C4GGhcAx.mjs"), "/src/content/jds/pm-compute-google.md": () => import("./pm-compute-google_CtA1jvOs.mjs"), "/src/content/jds/pm-databases-analytics-google.md": () => import("./pm-databases-analytics-google_DNj8azeV.mjs"), "/src/content/jds/pm-generative-ai-google.md": () => import("./pm-generative-ai-google_D3zrEFSL.mjs"), "/src/content/jds/pm-gke-ai-google.md": () => import("./pm-gke-ai-google_BIA3EjvW.mjs"), "/src/content/jds/pm-google-cloud.md": () => import("./pm-google-cloud_BoC_0Q2J.mjs"), "/src/content/jds/sr-pm-kernels-amazon.md": () => import("./sr-pm-kernels-amazon_kPXeaumX.mjs"), "/src/content/jds/sr-pm-s3-amazon.md": () => import("./sr-pm-s3-amazon_BetRC2rr.mjs"), "/src/content/jds/tpm-compute-infra-google.md": () => import("./tpm-compute-infra-google_CUeHuWXL.mjs"), "/src/content/jds/tpm-core-infra-meta.md": () => import("./tpm-core-infra-meta_C7vOwGwh.mjs"), "/src/content/jds/tpm-ml-google.md": () => import("./tpm-ml-google_yk4f7ibg.mjs") });
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
  globResult: contentEntryGlob,
  contentDir
});
const dataEntryGlob = /* @__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
  globResult: dataEntryGlob,
  contentDir
});
createCollectionToGlobResultMap({
  globResult: { ...contentEntryGlob, ...dataEntryGlob },
  contentDir
});
let lookupMap = {};
lookupMap = { "blog": { "type": "content", "entries": { "ai-anti-marxian-force": "/src/content/blog/ai-anti-marxian-force.mdx", "endgame-ai-corporate-transformation": "/src/content/blog/endgame-ai-corporate-transformation.mdx", "ai-spending-600-billion-conundrum": "/src/content/blog/ai-spending-600-billion-conundrum.mdx", "navigating-career-post-ai-labour-world": "/src/content/blog/navigating-career-post-ai-labour-world.mdx" } }, "jds": { "type": "content", "entries": { "pm-databases-analytics-google": "/src/content/jds/pm-databases-analytics-google.md", "pm-compute-google": "/src/content/jds/pm-compute-google.md", "pm-gke-ai-google": "/src/content/jds/pm-gke-ai-google.md", "pm-generative-ai-google": "/src/content/jds/pm-generative-ai-google.md", "pm-google-cloud": "/src/content/jds/pm-google-cloud.md", "sr-pm-kernels-amazon": "/src/content/jds/sr-pm-kernels-amazon.md", "sr-pm-s3-amazon": "/src/content/jds/sr-pm-s3-amazon.md", "tpm-compute-infra-google": "/src/content/jds/tpm-compute-infra-google.md", "tpm-core-infra-meta": "/src/content/jds/tpm-core-infra-meta.md", "tpm-ml-google": "/src/content/jds/tpm-ml-google.md" } } };
new Set(Object.keys(lookupMap));
function createGlobLookup(glob) {
  return async (collection, lookupId) => {
    const filePath = lookupMap[collection]?.entries[lookupId];
    if (!filePath) return void 0;
    return glob[collection][filePath];
  };
}
const renderEntryGlob = /* @__PURE__ */ Object.assign({ "/src/content/blog/ai-anti-marxian-force.mdx": () => import("./ai-anti-marxian-force_DkS_EBae.mjs"), "/src/content/blog/ai-spending-600-billion-conundrum.mdx": () => import("./ai-spending-600-billion-conundrum_v2DeA3Xn.mjs"), "/src/content/blog/endgame-ai-corporate-transformation.mdx": () => import("./endgame-ai-corporate-transformation_CsjzbWjB.mjs"), "/src/content/blog/navigating-career-post-ai-labour-world.mdx": () => import("./navigating-career-post-ai-labour-world_BdGqvBPo.mjs"), "/src/content/jds/pm-compute-google.md": () => import("./pm-compute-google_BdjszKpc.mjs"), "/src/content/jds/pm-databases-analytics-google.md": () => import("./pm-databases-analytics-google_D_eR096f.mjs"), "/src/content/jds/pm-generative-ai-google.md": () => import("./pm-generative-ai-google_CC4XJJlw.mjs"), "/src/content/jds/pm-gke-ai-google.md": () => import("./pm-gke-ai-google_DZ4Vci47.mjs"), "/src/content/jds/pm-google-cloud.md": () => import("./pm-google-cloud_CWA-1Axd.mjs"), "/src/content/jds/sr-pm-kernels-amazon.md": () => import("./sr-pm-kernels-amazon_CRmZWG6w.mjs"), "/src/content/jds/sr-pm-s3-amazon.md": () => import("./sr-pm-s3-amazon_Bo0qtG73.mjs"), "/src/content/jds/tpm-compute-infra-google.md": () => import("./tpm-compute-infra-google_BhzG7ndg.mjs"), "/src/content/jds/tpm-core-infra-meta.md": () => import("./tpm-core-infra-meta_CQ4QHvRd.mjs"), "/src/content/jds/tpm-ml-google.md": () => import("./tpm-ml-google_DzX73SHN.mjs") });
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
  globResult: renderEntryGlob,
  contentDir
});
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
const getCollection = createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
  cacheEntriesByCollection
});
export {
  getCollection as g
};
