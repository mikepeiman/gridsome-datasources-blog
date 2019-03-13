// Add id="textToCopy" to any element that contains the text you want to copy

function CopyText() {
  let t = document.querySelector("#textToCopy").innerText;
  navigator.clipboard.writeText(t).then(
    function() {
      console.log(`Copying to clipboard was successful! Copied: ${t}`);
    },
    function(err) {
      console.error("Could not copy text: ", err);
    }
  );
}

