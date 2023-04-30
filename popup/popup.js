import {
  updateClipboard,
  getHost,
  retrieveHostData,
  getHostConfigData,
  setHostConfigData,
  getHostTextData,
} from "../utils.js";

async function copyContent() {
  // let host = await getHost();
  // let content = await retrieveHostData(host);
  updateClipboard(contentTextArea.value);
}

async function submitConfigForm(event) {
  event.preventDefault();

  const selectedCheckboxes = [...filetypesCheckboxes]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  let config = {
    activate: activateCheckbox.checked,
    filetypes: selectedCheckboxes,
  };

  setHostConfigData(await getHost(), config);
}

const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", copyContent);

const form = document.getElementById("config-form");
form.addEventListener("submit", submitConfigForm);
const filetypesCheckboxes = form.querySelectorAll("input[type=checkbox][name=filetypes]");
const activateCheckbox = form.querySelectorAll("input[type=checkbox][name=activate]")[0];

const contentTextArea = document.getElementById("content");
getHost().then((host) => {
  getHostTextData(host).then((data) => {
    console.log(data)
    contentTextArea.value = data;
  });
  getHostConfigData(host).then((data) => {
    activateCheckbox.checked = data.activate;
    console.log(data);
    filetypesCheckboxes.forEach((checkbox) => {
      checkbox.checked = data.filetypes.includes(checkbox.value);
    });
  });
});
