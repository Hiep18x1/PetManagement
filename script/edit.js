"use strict";
const tbodyEl = document.getElementById("tbody");

const form = document.getElementById("container-form");

const submitBtn = document.getElementById("submit-btn");
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
        <td><button type="button" class="btn btn-warning" onclick="editPet(${i})" data-id-number="${i}">Edit</button>
        </td>
        
        `;

    tbodyEl.appendChild(row);
  }
}
renderTableData(petArr);

const editBtn = document.querySelectorAll(".btn-warning");
//Edit
const editPet = function (i) {
  form.classList.remove("hide");

  idInput.value = petArr[i].id;
  nameInput.value = petArr[i].name;
  ageInput.value = petArr[i].age;
  typeInput.value = petArr[i].type;
  renderBreed();

  weightInput.value = petArr[i].weight;
  lengthInput.value = petArr[i].length;
  colorInput.value = petArr[i].color;
  vaccinatedInput.checked = petArr[i].vaccinated;
  dewormedInput.checked = petArr[i].Dewormed;
  sterilizedInput.checked = petArr[i].Sterilized;
  console.log(petArr[i].breed);

  breedInput.value = petArr[i].breed;
  console.log(breedInput.value);
  console.log(petArr[i].breed);
};

//render breed
const renderBreed = function () {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  console.log("change");
  const dogBreeds = breedArr.filter((breed) => breed.type === "Dog");
  const catBreeds = breedArr.filter((breed) => breed.type === "Cat");

  if (typeInput.value === "Dog") {
    dogBreeds.forEach((breed) => {
      const option = document.createElement("option");
      option.innerHTML = `${breed.breed}`;
      breedInput.appendChild(option);
    });
  }
  if (typeInput.value === "Cat") {
    catBreeds.forEach((breed) => {
      const option = document.createElement("option");
      option.innerHTML = `${breed.breed}`;
      breedInput.appendChild(option);
    });
  }
};
//Khi ta thay đổi option ở input type thì breed mới render
typeInput.addEventListener("change", renderBreed);

//Validate data
const validateData = function (data) {
  //check age
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  //check weight
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  //check length
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  //check type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  //check breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }

  return true;
};

//  Submit
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    Dewormed: dewormedInput.checked,
    Sterilized: sterilizedInput.checked,
    date: new Date().toLocaleString().split(",")[0],
  };

  console.log(data);
  const validated = validateData(data);
  console.log(validated);
  if (validated) {
    const index = petArr.findIndex((el) => el.id === data.id);
    console.log(petArr);
    data.date = petArr[index].date;
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    form.classList.add("hide");
    renderTableData(petArr);
  }
  return;
});
