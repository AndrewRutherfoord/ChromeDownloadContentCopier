import {
  updateClipboard,
  getHost,
  getHostConfigData,
  setHostConfigData,
  getHostTextData,
} from "../utils.js";

async function copyContent() {
  // Copy the contents of the text area in the popup to the clipboard.
  updateClipboard(contentTextArea.value);
}

// Handles config form submission.
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
const filetypesCheckboxes = form.querySelectorAll("input[type=checkbox][name=filetypes]");
const activateCheckbox = form.querySelectorAll("input[type=checkbox][name=activate]")[0];
activateCheckbox.addEventListener("change", submitConfigForm);

form.addEventListener("submit", submitConfigForm);

const contentTextArea = document.getElementById("content");

getHost().then((host) => {
  // Load the text data that has been stored by the background script.
  getHostTextData(host).then((data) => {
    console.log(data);
    contentTextArea.value = data;
  });

  // Load config data and render to form.
  getHostConfigData(host).then((data) => {
    activateCheckbox.checked = data.activate;
    console.log(data);
    filetypesCheckboxes.forEach((checkbox) => {
      if (data.filetypes) {
        checkbox.checked = data.filetypes.includes(checkbox.value);
      }
      checkbox.addEventListener("change", submitConfigForm);
    });
  });
});
