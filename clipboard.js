export function updateClipboard(newClip) {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.clipboard.writeText(newClip).then(
        () => {
          console.log("CLIPBOARD SET");
        },
        () => {
          console.log("CLIPBOARD FAILED");
        }
      );
    }
  });
}