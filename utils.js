export async function retrieveData() {
  let data = await chrome.storage.local.get(["copyFileDownloadContents"]);
  return data.copyFileDownloadContents ? data.copyFileDownloadContents : {};
}

export async function setData(data) {
  chrome.storage.local.set({ copyFileDownloadContents: data });
}

export async function retrieveHostData(host) {
  let data = await retrieveData();
  return data[host] ? data[host] : {};
}

export async function setHostData(host, data) {
  let result = await retrieveData();
  result[host] = data;
  setData(result);
}

// Get the host of the active tab (if url https://example.com/test, host is example.com)
export async function getHost() {
  let tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  let urlStr = tabs[0].url;
  let url = new URL(urlStr);
  return url.host;
}

export async function getHostTextData(host) {
  let data = await retrieveHostData(host);
  return data.text ? data.text : null;
}

export async function setHostTextData(host, text) {
  let data = await retrieveHostData(host);

  if (data) {
    data.text = text;
    setHostData(host, data);
  } else {
    // Shouldn't hit this case....
    data = { config: {}, text: text };
    setHostData(host, data);
  }
}

export async function getHostConfigData(host) {
  let data = await retrieveHostData(host);
  return data.config ? data.config : {};
}

export async function setHostConfigData(host, config) {
  let data = await retrieveHostData(host);

  if (data) {
    data.config = config;
    setHostData(host, data);
  } else {
    data = { config: config, text: null };
    setHostData(host, data);
  }
}
