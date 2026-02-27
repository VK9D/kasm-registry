const fs = require("fs");
const glob = require("glob");
const { hashElement } = require("folder-hash");
const nextConfig = require("../site/next.config.js");

const dir = "./public";
const iconsDir = `${dir}/icons`;

// --- helpers -------------------------------------------------------

function ensureDir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
}

function nonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Make sure icon/list_url/contact_url are NEVER null in the exported registry JSON.
 * Kasm can be picky; browsers won't care, but Kasm will.
 */
function buildTopLevelUrls() {
  // Determine a basePath to infer URLs if env values are missing.
  const basePath = nonEmptyString(nextConfig?.basePath)
    ? nextConfig.basePath
    : "/kasm-registry/1.1";

  // GitHub Pages root for this site. (Matches your domain.)
  const ghPagesRoot = "https://vk9d.github.io";

  // Best-effort inference if env values are missing.
  const inferredListUrl = `${ghPagesRoot}${basePath}/`;
  const inferredIconUrl = `${ghPagesRoot}${basePath}/swlogo.png`;

  const icon = nonEmptyString(nextConfig?.env?.icon)
    ? nextConfig.env.icon
    : inferredIconUrl;

  const listUrl = nonEmptyString(nextConfig?.env?.listUrl)
    ? nextConfig.env.listUrl
    : inferredListUrl;

  // Contact URL can be empty string, but should not be null.
  const contactUrl = nonEmptyString(nextConfig?.env?.contactUrl)
    ? nextConfig.env.contactUrl
    : "";

  const description = nonEmptyString(nextConfig?.env?.description)
    ? nextConfig.env.description
    : "";

  const name = nonEmptyString(nextConfig?.env?.name)
    ? nextConfig.env.name
    : "Unknown store";

  return { name, description, icon, listUrl, contactUrl };
}

/**
 * Pick a sane default channel.
 * - Prefer a stable-looking tag if present (e.g., "1.18.0")
 * - Otherwise prefer "develop" if it's the only thing
 * - Otherwise fall back to first channel (sorted)
 */
function pickDefaultChannel(channelSet) {
  const channels = Array.from(channelSet).filter(nonEmptyString).sort();

  if (channels.length === 0) return null;

  // Prefer "stable-ish": anything that looks like a version number.
  const versionLike = channels.find((c) => /^\d+(\.\d+){1,3}$/.test(c));
  if (versionLike) return versionLike;

  // If you want develop by default, keep this.
  // If you do NOT want it by default, comment the next 2 lines.
  if (channels.includes("develop")) return "develop";

  return channels[0];
}

// --- main ----------------------------------------------------------

ensureDir(dir);
ensureDir(iconsDir);

glob("**/workspace.json", async function (err, files) {
  if (err) {
    console.log("cannot read the folder, something goes wrong with glob", err);
    process.exitCode = 1;
    return;
  }

  const workspacetotal = files.length;
  const workspaces = [];

  const options = {
    algho: "sha1",
    encoding: "hex",
  };

  const channels = new Set();
  const versions = new Set();

  for (const file of files) {
    const folder = file.replace("/workspace.json", "");

    const hash = await hashElement(folder, options);
    const filedata = fs.readFileSync(file, "utf8");
    const parsed = JSON.parse(filedata);

    parsed.sha = hash.hash;
    console.log(`${parsed.friendly_name} added`);

    // Gather channels and versions
    if (Array.isArray(parsed.compatibility)) {
      parsed.compatibility.forEach((element) => {
        if (element && Array.isArray(element.available_tags)) {
          element.available_tags.forEach((tag) => {
            if (nonEmptyString(tag)) channels.add(tag);
          });
        }
        if (element && nonEmptyString(element.version)) {
          versions.add(element.version);
        }
      });
    }

    workspaces.push(parsed);

    // Copy icon file if present
    const imgPath = `${folder}/${parsed.image_src}`;
    const outPath = `${iconsDir}/${parsed.image_src}`;

    if (nonEmptyString(parsed.image_src) && fs.existsSync(imgPath)) {
      const imagedata = fs.readFileSync(imgPath);
      fs.writeFileSync(outPath, imagedata);
    } else {
      console.error(`missing file: ${imgPath}`);
    }
  }

  const { name, description, icon, listUrl, contactUrl } = buildTopLevelUrls();

  const json = {
    name,
    workspacecount: workspacetotal,
    icon: nextConfig.env.icon || "https://vk9d.github.io/kasm-registry/1.1/swlogo.png",
    description: nextConfig.env.description || "",
    list_url: nextConfig.env.listUrl || "https://vk9d.github.io/kasm-registry/",
    contact_url: nextConfig.env.contactUrl || "",
    modified: Date.now(),
    workspaces,
    channels: Array.from(channels).sort(),
    default_channel: pickDefaultChannel(channels),
  };

  fs.writeFileSync(`${dir}/list.json`, JSON.stringify(json));
  fs.writeFileSync(
    `${dir}/versions.json`,
    JSON.stringify({ versions: Array.from(versions).sort() })
  );
});
