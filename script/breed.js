"use strict";
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tbodyEl = document.getElementById("tbody");
const submitBtn = document.getElementById("submit-btn");

//Validate data
const validateData = function (data) {
  //check breed
  if (data.breed === "") {
    alert("Please select Breed!");
    return false;
  }

  //check type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  return true;
};
//Delete table
const deleteTable = function () {
  tbodyEl.innerHTML = "";
};
deleteTable();

//clear input
const clearInput = function () {
  typeInput.value = "";
  breedInput.value = "";
};

//render table
const renderTableData = function (arr) {
  deleteTable();
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <tr>
        <td>${i}</td>
        <td>${arr[i].breed}</td>
        <td>${arr[i].type}</td>
        <td>
        <button type="button" class="btn btn-danger" id="delete-btn" data-id-number="${i}" >
                  Delete
        </button>
        </td>
    </tr>
    `;
    tbodyEl.appendChild(row);
  }
};
renderTableData(breedArr);

//  Submit
submitBtn.addEventListener("click", function () {
  console.log(breedInput.value);
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  const validated = validateData(data);
  if (validated) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    clearInput();
    renderTableData(breedArr);
  }
});

//Delete Button
//Ở đây ta sẽ sử dụng delegate
const deleteBtn = document.querySelectorAll(".btn-danger");
tbodyEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    const id = e.target.dataset.idNumber;
    breedArr.splice(id, 1);
    saveToStorage("breedArr", breedArr);
    renderTableData(breedArr);
  }
});
