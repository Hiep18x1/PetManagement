"use strict";

const tbodyEl = document.getElementById("tbody");
const container = document.getElementById("main");
const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

//Delete table
const deleteTable = function () {
  tbodyEl.innerHTML = "";
};
//render table
function renderTableData(arr) {
  deleteTable();
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <th scope="row">${arr[i].id}</th>
          <td>${arr[i].name}</td>
          <td>${arr[i].age}</td>
          <td>${arr[i].type}</td>
          <td>${arr[i].weight} kg</td>
          <td>${arr[i].length} cm</td>
          <td>${arr[i].breed}</td>
          <td>
              <i class="bi bi-square-fill" style="color: ${arr[i].color}"></i>
          </td>
    
          <td>
          ${
            arr[i].vaccinated === true
              ? `<i class="bi bi-check-circle-fill"></i>`
              : `
            <i class="bi bi-x-circle-fill"></i>
          `
          }
          </td>
          <td>
          ${
            arr[i].Dewormed === true
              ? `<i class="bi bi-check-circle-fill"></i>`
              : `
            <i class="bi bi-x-circle-fill"></i>
          `
          }
          </td>
          <td>
          ${
            arr[i].Sterilized === true
              ? `<i class="bi bi-check-circle-fill"></i>`
              : `
            <i class="bi bi-x-circle-fill"></i>
          `
          }
          </td>
    
          <td>${arr[i].date}</td>
          
          `;

    tbodyEl.appendChild(row);
  }
}
renderTableData(petArr);

//render breed
const renderBreed = function () {
  petArr.forEach((pet) => {
    const option = document.createElement("option");
    option.textContent = pet.breed;
    breedInput.appendChild(option);
  });
};
renderBreed();

findBtn.addEventListener("click", function (e) {
  //vì không lưu vào local storage nên petArr sẽ không bị ảnh hưởng
  let filterPets = petArr;
  if (idInput.value) {
    filterPets = filterPets.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value) {
    filterPets = filterPets.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    filterPets = filterPets.filter((pet) => pet.type === typeInput.value);
  }

  if (breedInput.value !== "Select Breed") {
    filterPets = filterPets.filter((pet) => pet.type === typeInput.value);
  }
  console.log(filterPets);

  filterPets = filterPets.filter(
    (pet) =>
      pet.vaccinated === vaccinatedInput.checked &&
      pet.Dewormed === dewormedInput.checked &&
      pet.Sterilized === sterilizedInput.checked
  );
  console.log(filterPets);
  renderTableData(filterPets);
});
