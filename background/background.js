import { getHost, getHostConfigData, setHostTextData } from "../utils.js";

async function handleText(text) {
  let host = await getHost();
  setHostTextData(host, text);
}

chrome.downloads.onDeterminingFilename.addListener(async function (item, suggest) {
  // Retrieve the current tab's configs
  const config = await getHostConfigData(await getHost());

  // Only block if activated and the file extension is one of the allowed
  if (config.activate && config.filetypes.some((end) => item.filename.endsWith(end))) {
    chrome.downloads.cancel(item.id);
    fetch(item.finalUrl)
      .then((response) => response.text())
      .then(async (text) => {
        handleText(text);
      });
  }
});
