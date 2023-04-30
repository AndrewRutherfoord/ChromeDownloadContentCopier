import { getHost, getHostConfigData, setHostTextData } from "../utils.js";

async function handleText(text) {
  let host = await getHost();
  console.log(host);
  console.log(text);
  setHostTextData(host, text);
}

chrome.downloads.onDeterminingFilename.addListener(async function (item, suggest) {
  const config = await getHostConfigData(await getHost());
  console.log(config);
  if (config.activate && config.filetypes.some((end) => item.filename.endsWith(end))) {
    // if (config.activate && item.mime === "text/markdown") {
    console.log(suggest);
    chrome.downloads.cancel(item.id);
    fetch(item.finalUrl)
      .then((response) => response.text())
      .then(async (text) => {
        handleText(text);
      });
  }
});
