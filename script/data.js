"use strict";

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const inputFile = document.getElementById("input-file");

//export
function exportFile() {
  console.log(petArr);
  var blob = new Blob([JSON.stringify(petArr)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "dynamic.txt");
}

exportBtn.addEventListener("click", exportFile);

// Có thay đổi 1 chút ở file HTML khi đổi attribute accept từ json thành txt
inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const contents = reader.result;
    console.log(JSON.parse(contents));
    importBtn.addEventListener("click", console.log(JSON.parse(contents)));
    saveToStorage("importFile", JSON.parse(contents));
  });

  reader.readAsText(file);
});
