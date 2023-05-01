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